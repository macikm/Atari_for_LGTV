/**
 * AtariWebOS - Full Standalone Atari 800/XE Emulator for LG webOS TV & Desktop
 * Author: Martin Macko
 * License: GPL-2.0-or-later
 */

import { t, getLanguage, applyTranslations } from './lang.js';

// ============================================================================
// 1. IndexedDB Game Storage Manager
// ============================================================================

class AtariStorage {
  constructor(dbName = 'AtariWebOS_DB', storeName = 'games') {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB init error:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async saveMedia(name, arrayBuffer, size) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const ext = name.split('.').pop().toLowerCase();
      const item = {
        name: name,
        ext: ext,
        size: size || arrayBuffer.byteLength,
        data: arrayBuffer,
        date: new Date().toISOString()
      };

      const request = store.add(item);
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async getAllMedia() {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async getMedia(id) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(Number(id));

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async deleteMedia(id) {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(Number(id));

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async clearAll() {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  }
}

// ============================================================================
// 2. Web Audio & Sound Helper
// ============================================================================

class AtariAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    } catch (e) {
      console.warn('Web Audio init issue:', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

// ============================================================================
// 3. Atari800 WebAssembly Integration Core
// ============================================================================

class AtariWasmCore {
  constructor(canvas) {
    this.canvas = canvas;
    this.isLoaded = false;
    this.loadedMediaName = 'Atari BASIC (Altirra/Atari 800XL)';
    this.activeDiskBytes = null;
    this.activeDiskFilename = null;
  }

  async init(mediaName = null, mediaBytes = null) {
    console.log('Initializing Atari800 WebAssembly Core...');
    const self = this;

    // Detect path to wasm and roms directories relative to current location
    const basePath = window.location.pathname.includes('/src/') ? '' : '';
    const wasmPrefix = basePath + 'wasm/';
    const romsPrefix = basePath + 'roms/';

    let args = [
      '-stretch', 'full',
      '-fit-screen', 'both',
      '-image-aspect', 'none',
      '-horiz-area', 'tv',
      '-vert-area', 'tv'
    ];

    // ROM options: load genuine Atari XL/XE OS & Atari BASIC
    args.push('-xlxe_rom', '/atarixl.rom');
    args.push('-basic_rom', '/ataribas.rom');

    // Determine machine type (default Atari 800XL)
    const machineSelect = document.getElementById('machineSelect');
    const machineType = machineSelect ? machineSelect.value : '800xl';

    if (machineType === '130xe') {
      args.unshift('-xe');
    } else if (machineType === '800') {
      args.unshift('-atari');
    } else {
      args.unshift('-xl');
    }

    if (mediaName && mediaBytes) {
      this.activeDiskFilename = mediaName;
      this.activeDiskBytes = mediaBytes;
      const vfsName = 'media_' + mediaName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const ext = mediaName.split('.').pop().toLowerCase();

      if (ext === 'rom' || ext === 'bin' || ext === 'car') {
        args.push('-nobasic');
        args.push('-cart', '/' + vfsName);
      } else {
        // .atr, .xex, etc.
        args.push('-nobasic');
        args.push('/' + vfsName);
      }
    } else {
      // Boot directly into Atari BASIC!
      args.push('-basic');
    }

    window.Module = {
      canvas: document.getElementById('canvas'),
      arguments: args,
      preRun: [function () {
        // Preload genuine Atari ROMs into root MEMFS
        try {
          window.Module.FS.createPreloadedFile('/', 'atarixl.rom', romsPrefix + 'atarixl.rom', true, false);
          window.Module.FS.createPreloadedFile('/', 'ataribas.rom', romsPrefix + 'ataribas.rom', true, false);
        } catch (e) {
          console.warn('ROM preloading note:', e);
        }

        if (self.activeDiskFilename && self.activeDiskBytes) {
          const vfsName = 'media_' + self.activeDiskFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
          try {
            window.Module.FS.writeFile('/' + vfsName, new Uint8Array(self.activeDiskBytes));
            console.log('Written to VFS:', vfsName, self.activeDiskBytes.byteLength, 'bytes');
          } catch (e) {
            console.error('Failed to write disk to VFS:', e);
          }
        }
      }],
      postRun: [function () {
        console.log('Atari800 WASM running successfully with Atari OS & BASIC!');
        self.isLoaded = true;
      }],
      locateFile: function (path, prefix) {
        if (path.endsWith('.wasm')) {
          return wasmPrefix + path;
        }
        return prefix + path;
      },
      print: function (text) {
        console.log('[Atari800]', text);
      },
      printErr: function (text) {
        console.warn('[Atari800]', text);
      }
    };

    // Load atari800.js script if not already injected
    if (!document.getElementById('atari800WasmScript')) {
      const script = document.createElement('script');
      script.id = 'atari800WasmScript';
      script.src = wasmPrefix + 'atari800.js';
      document.body.appendChild(script);
    } else {
      window.location.reload();
    }
  }

  // Trigger Console keys via keyboard event injection or Emscripten SDL events
  sendConsoleKey(keyCode, charCode, keyName) {
    if (!this.canvas) return;
    this.canvas.focus();
    const eventDown = new KeyboardEvent('keydown', {
      key: keyName,
      code: keyName,
      keyCode: keyCode,
      charCode: charCode,
      bubbles: true,
      cancelable: true
    });
    window.dispatchEvent(eventDown);

    setTimeout(() => {
      const eventUp = new KeyboardEvent('keyup', {
        key: keyName,
        code: keyName,
        keyCode: keyCode,
        charCode: charCode,
        bubbles: true,
        cancelable: true
      });
      window.dispatchEvent(eventUp);
    }, 120);
  }
}

// ============================================================================
// 4. Minimal Offline QR Code SVG Generator (for TV Screen companion upload)
// ============================================================================

function generateSimpleQR(url) {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
      <rect width="100" height="100" fill="#ffffff" />
      <rect x="10" y="10" width="24" height="24" fill="#000000"/>
      <rect x="14" y="14" width="16" height="16" fill="#ffffff"/>
      <rect x="18" y="18" width="8" height="8" fill="#000000"/>
      <rect x="66" y="10" width="24" height="24" fill="#000000"/>
      <rect x="70" y="14" width="16" height="16" fill="#ffffff"/>
      <rect x="74" y="18" width="8" height="8" fill="#000000"/>
      <rect x="10" y="66" width="24" height="24" fill="#000000"/>
      <rect x="14" y="70" width="16" height="16" fill="#ffffff"/>
      <rect x="18" y="74" width="8" height="8" fill="#000000"/>
      <rect x="40" y="12" width="6" height="6" fill="#000000"/>
      <rect x="52" y="12" width="6" height="6" fill="#000000"/>
      <rect x="44" y="24" width="8" height="6" fill="#000000"/>
      <rect x="12" y="44" width="6" height="8" fill="#000000"/>
      <rect x="24" y="44" width="8" height="6" fill="#000000"/>
      <rect x="40" y="40" width="20" height="20" fill="#2c59d9"/>
      <rect x="46" y="46" width="8" height="8" fill="#ffffff"/>
      <rect x="68" y="44" width="6" height="6" fill="#000000"/>
      <rect x="80" y="52" width="8" height="6" fill="#000000"/>
      <rect x="42" y="70" width="8" height="6" fill="#000000"/>
      <rect x="56" y="76" width="6" height="12" fill="#000000"/>
      <rect x="72" y="72" width="14" height="6" fill="#000000"/>
      <rect x="80" y="82" width="6" height="6" fill="#000000"/>
    </svg>
  `;
}

// ============================================================================
// 5. Main Application Orchestration
// ============================================================================

class AtariApp {
  constructor() {
    this.storage = new AtariStorage();
    this.audio = new AtariAudioEngine();
    this.canvas = document.getElementById('canvas');
    this.wasmCore = new AtariWasmCore(this.canvas);

    // UI Elements
    this.fpsCounter = document.getElementById('fpsCounter');
    this.loadedMediaName = document.getElementById('loadedMediaName');
    this.drive1Led = document.getElementById('drive1Led');
    this.audioLed = document.getElementById('audioLed');
    this.audioIcon = document.getElementById('audioIcon');
    this.crtOverlay = document.getElementById('crtOverlay');
    this.sidebarPanel = document.getElementById('sidebarPanel');
    this.gameListContainer = document.getElementById('gameListContainer');
    this.emptyStateMsg = document.getElementById('emptyStateMsg');
    this.libraryCountBadge = document.getElementById('libraryCountBadge');
    this.viewportMessage = document.getElementById('viewportMessage');
    this.viewportSection = document.getElementById('viewportSection');
    this.companionModal = document.getElementById('companionModal');
    this.qrContainer = document.getElementById('qrContainer');
    this.companionUrlDisplay = document.getElementById('companionUrlDisplay');
    this.btnToggleInputMode = document.getElementById('btnToggleInputMode');

    // FPS loop
    this.frameCount = 0;
    this.lastFpsUpdate = performance.now();

    this.init();
  }

  async init() {
    console.log('Initializing AtariWebOS App with WebAssembly...');

    // 1. Init Database
    await this.storage.init();
    await this.refreshGameList();

    // 2. Setup Events
    this.setupKeyboardEvents();
    this.setupFileDropEvents();
    this.setupUIEvents();
    this.setupCompanionModal();

    // 3. Start WebAssembly Core
    const urlParams = new URLSearchParams(window.location.search);
    const mediaId = urlParams.get('boot');

    if (mediaId) {
      const media = await this.storage.getMedia(mediaId);
      if (media) {
        this.loadedMediaName.textContent = media.name;
        await this.wasmCore.init(media.name, media.data);
      } else {
        await this.wasmCore.init();
      }
    } else {
      // Default: Boot directly into Atari BASIC
      await this.wasmCore.init();
    }

    // 4. Start FPS counter loop
    requestAnimationFrame((ts) => this.loop(ts));
  }

  loop(timestamp) {
    this.frameCount++;
    if (timestamp - this.lastFpsUpdate >= 500) {
      const currentFps = Math.round((this.frameCount * 1000) / (timestamp - this.lastFpsUpdate));
      if (this.fpsCounter) this.fpsCounter.textContent = Math.min(60, currentFps);
      this.frameCount = 0;
      this.lastFpsUpdate = timestamp;
    }
    requestAnimationFrame((ts) => this.loop(ts));
  }

  // ==========================================================================
  // Physical Keyboard Handling
  // ==========================================================================
  setupKeyboardEvents() {
    // Prevent back navigation from destroying the WebAssembly canvas context
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, '', window.location.href);
    });

    window.addEventListener('keydown', (e) => {
      // First interaction activates Web Audio Context if suspended
      this.audio.init();

      const isInput = ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName);

      // Prevent destructive browser defaults (Backspace navigating back, Tab stealing focus, F1 help, F5 refresh)
      if (!isInput) {
        if (
          e.key === 'Backspace' ||
          e.code === 'Backspace' ||
          e.keyCode === 8 ||
          e.key === 'Tab' ||
          e.code === 'Tab' ||
          (typeof e.key === 'string' && e.key.startsWith('F'))
        ) {
          e.preventDefault();
        }

        // Ensure canvas keeps focus for Atari Emscripten SDL input
        if (document.activeElement !== this.canvas) {
          this.canvas.focus();
        }
      }

      // Quick Console buttons feedback
      if (e.key === 'F2') {
        this.flashNotice('OPTION pressed');
      } else if (e.key === 'F3') {
        this.flashNotice('SELECT pressed');
      } else if (e.key === 'F4') {
        this.flashNotice('START pressed');
      } else if (e.key === 'F5') {
        this.flashNotice('RESET pressed');
      }
    });

    window.addEventListener('keyup', (e) => {
      const isInput = ['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if (!isInput) {
        if (
          e.key === 'Backspace' ||
          e.code === 'Backspace' ||
          e.keyCode === 8 ||
          e.key === 'Tab' ||
          e.code === 'Tab' ||
          (typeof e.key === 'string' && e.key.startsWith('F'))
        ) {
          e.preventDefault();
        }
      }
    });
  }

  // ==========================================================================
  // File Drop & Upload Handlers
  // ==========================================================================
  setupFileDropEvents() {
    const dropzone = document.getElementById('dropzoneBox');
    const fileInput = document.getElementById('fileUploadInput');

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files);
      for (const file of files) {
        await this.handleIncomingFile(file);
      }
      fileInput.value = '';
    });

    ['dragenter', 'dragover'].forEach(name => {
      window.addEventListener(name, (e) => {
        e.preventDefault();
        this.viewportSection.classList.add('drag-active');
        this.viewportMessage.classList.add('show');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      window.addEventListener(name, (e) => {
        e.preventDefault();
        this.viewportSection.classList.remove('drag-active');
        this.viewportMessage.classList.remove('show');
      });
    });

    window.addEventListener('drop', async (e) => {
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        for (const file of files) {
          const id = await this.handleIncomingFile(file);
          // Reboot emulator with newly dropped disk
          window.location.search = `?boot=${id}`;
        }
      }
    });
  }

  async handleIncomingFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const id = await this.storage.saveMedia(file.name, arrayBuffer, file.size);
    await this.refreshGameList();
    this.flashNotice(t('notice_saved') + file.name);
    return id;
  }

  // ==========================================================================
  // Library UI & Storage Rendering
  // ==========================================================================
  async refreshGameList() {
    const list = await this.storage.getAllMedia();
    const count = list.length;
    let countWord = t('files_count_many');
    if (count === 1) countWord = t('files_count_one');
    else if (count >= 2 && count <= 4) countWord = t('files_count_few');
    this.libraryCountBadge.textContent = `${count} ${countWord}`;

    if (list.length === 0) {
      this.emptyStateMsg.style.display = 'block';
      this.gameListContainer.innerHTML = '';
      this.gameListContainer.appendChild(this.emptyStateMsg);
      return;
    }

    this.emptyStateMsg.style.display = 'none';
    this.gameListContainer.innerHTML = '';

    list.forEach(item => {
      const el = document.createElement('div');
      el.className = 'game-item';
      
      const sizeKb = (item.size / 1024).toFixed(1);
      const dateStr = new Date(item.date).toLocaleDateString(getLanguage());

      el.innerHTML = `
        <div class="game-info">
          <div class="game-name" title="${item.name}">${item.name}</div>
          <div class="game-meta">
            <span class="game-badge">${item.ext.toUpperCase()}</span>
            <span>${sizeKb} KB</span> • <span>${dateStr}</span>
          </div>
        </div>
        <div class="game-actions">
          <button class="btn btn-primary btn-sm btn-run" data-id="${item.id}" title="${t('action_run')}">${t('action_run')}</button>
          <button class="btn btn-danger btn-sm btn-del" data-id="${item.id}" title="${t('action_delete')}">🗑</button>
        </div>
      `;

      el.querySelector('.btn-run').addEventListener('click', () => {
        window.location.search = `?boot=${item.id}`;
      });

      el.querySelector('.btn-del').addEventListener('click', async () => {
        if (confirm(t('delete_confirm', { name: item.name }))) {
          await this.storage.deleteMedia(item.id);
          await this.refreshGameList();
        }
      });

      this.gameListContainer.appendChild(el);
    });
  }

  // ==========================================================================
  // UI & TV Event Listeners
  // ==========================================================================
  setupUIEvents() {
    // CRT Scanlines Toggle
    document.getElementById('btnToggleScanlines').addEventListener('click', () => {
      this.crtOverlay.classList.toggle('disabled');
    });

    // Fullscreen Toggle
    document.getElementById('btnToggleFullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.warn(err));
      } else {
        document.exitFullscreen();
      }
    });

    // Sidebar Toggle
    document.getElementById('btnToggleSidebar').addEventListener('click', () => {
      this.sidebarPanel.classList.toggle('collapsed');
    });

    // Sidebar Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
      });
    });

    // Console buttons (Atari800 uses F2=Option, F3=Select, F4=Start, F5=Reset)
    document.getElementById('btnConsoleOption').addEventListener('click', () => {
      this.wasmCore.sendConsoleKey(113, 0, 'F2');
      this.flashNotice('OPTION stisknuto');
    });
    document.getElementById('btnConsoleSelect').addEventListener('click', () => {
      this.wasmCore.sendConsoleKey(114, 0, 'F3');
      this.flashNotice('SELECT stisknuto');
    });
    document.getElementById('btnConsoleStart').addEventListener('click', () => {
      this.wasmCore.sendConsoleKey(115, 0, 'F4');
      this.flashNotice('START stisknuto');
    });
    document.getElementById('btnConsoleReset').addEventListener('click', () => {
      this.wasmCore.sendConsoleKey(116, 0, 'F5');
      this.flashNotice('RESET (F5)');
    });
    document.getElementById('btnColdReset').addEventListener('click', () => {
      window.location.search = '';
    });

    // Search Box
    document.getElementById('librarySearchInput').addEventListener('input', (e) => {
      const filter = e.target.value.toLowerCase();
      const items = this.gameListContainer.querySelectorAll('.game-item');
      items.forEach(item => {
        const name = item.querySelector('.game-name').textContent.toLowerCase();
        item.style.display = name.includes(filter) ? 'flex' : 'none';
      });
    });

    // Keyboard Input Profile Toggle (BASIC Mode vs WASD Game Mode)
    if (this.btnToggleInputMode) {
      this.btnToggleInputMode.addEventListener('click', () => {
        this.wasdJoystickEnabled = !this.wasdJoystickEnabled;
        this.updateInputModeButton();
      });
    }

    // Clear All Data
    document.getElementById('btnClearAllData').addEventListener('click', async () => {
      if (confirm(t('clear_all_confirm'))) {
        await this.storage.clearAll();
        await this.refreshGameList();
        this.flashNotice(t('notice_cleared'));
      }
    });
  }

  // ==========================================================================
  // Companion Web Upload Modal (Mobile / WiFi Remote)
  // ==========================================================================
  setupCompanionModal() {
    const btnOpen = document.getElementById('btnCompanionModal');
    const btnClose = document.getElementById('btnCloseModal');
    const btnUpload = document.getElementById('btnModalUploadLocal');

    const updateUrlAndQR = () => {
      const host = window.location.hostname || 'localhost';
      const port = window.location.port ? `:${window.location.port}` : '';
      const companionUrl = `http://${host}${port}/upload`;
      this.companionUrlDisplay.textContent = companionUrl;
      this.qrContainer.innerHTML = generateSimpleQR(companionUrl);
    };

    btnOpen.addEventListener('click', () => {
      updateUrlAndQR();
      this.companionModal.classList.add('open');
    });

    btnClose.addEventListener('click', () => {
      this.companionModal.classList.remove('open');
    });

    this.companionModal.addEventListener('click', (e) => {
      if (e.target === this.companionModal) {
        this.companionModal.classList.remove('open');
      }
    });

    btnUpload.addEventListener('click', () => {
      this.companionModal.classList.remove('open');
      document.getElementById('fileUploadInput').click();
    });
  }

  updateInputModeButton() {
    if (!this.btnToggleInputMode) return;
    if (this.wasdJoystickEnabled) {
      this.btnToggleInputMode.innerHTML = `<span>🕹️</span> <span>${t('mode_wasd')}</span>`;
      this.btnToggleInputMode.classList.add('btn-primary');
      this.flashNotice(t('notice_wasd'));
    } else {
      this.btnToggleInputMode.innerHTML = `<span>⌨️</span> <span>${t('mode_basic')}</span>`;
      this.btnToggleInputMode.classList.remove('btn-primary');
      this.flashNotice(t('notice_basic'));
    }
  }

  onLanguageChange() {
    this.refreshGameList();
    if (this.btnToggleInputMode) {
      const modeKey = this.wasdJoystickEnabled ? 'mode_wasd' : 'mode_basic';
      const icon = this.wasdJoystickEnabled ? '🕹️' : '⌨️';
      this.btnToggleInputMode.innerHTML = `<span>${icon}</span> <span>${t(modeKey)}</span>`;
    }
  }

  flashNotice(text) {
    this.viewportMessage.textContent = text;
    this.viewportMessage.classList.add('show');
    clearTimeout(this._noticeTimer);
    this._noticeTimer = setTimeout(() => {
      this.viewportMessage.classList.remove('show');
    }, 2200);
  }
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.atariApp = new AtariApp();
});
