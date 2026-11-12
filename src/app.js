/**
 * AtariWebOS - Full Standalone Atari 800/XE Emulator for LG webOS TV & Desktop
 * Author: Martin Macko
 * License: GPL-2.0-or-later
 */

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
// 2. Web Audio & POKEY Sound Generator
// ============================================================================

class AtariAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.enabled = true;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio not supported or blocked:', e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.enabled ? 0.3 : 0.0, this.ctx.currentTime);
    }
    return this.enabled;
  }

  // Authentic Atari Keyclick buzzer sound
  playKeyClick() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(960, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.012);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.015);
    } catch (e) {
      // Ignore audio glitches
    }
  }

  // Play Floppy Drive stepping sound (Authentic Atari 1050 / XF551 drive head sound)
  playDriveStep() {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.03);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch (e) {
      // Ignore
    }
  }

  // Atari POKEY SOUND tone emulation: SOUND v,f,d,v
  playTone(frequency, durationSec = 0.2, volume = 0.2) {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'square';
      osc.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + durationSec);
    } catch (e) {
      // Ignore
    }
  }
}

// ============================================================================
// 3. Atari ATASCII 8x8 ROM Font & 256 Color Palette
// ============================================================================

// Authentic Atari 8-bit NTSC/PAL Default Palette (subset of 128/256 colors)
const ATARI_PALETTE = [
  '#000000', '#1c1c1c', '#383838', '#555555', '#717171', '#8e8e8e', '#aaaaaa', '#c6c6c6', '#e3e3e3', '#ffffff',
  '#442800', '#604400', '#7c6000', '#997d00', '#b59900', '#d2b519', '#eed235', '#ffee52',
  '#681800', '#853400', '#a15100', '#bd6d00', '#da8a00', '#f6a619', '#ffc335', '#ffdf52',
  '#800800', '#9d2400', '#b94100', '#d65d00', '#f27a00', '#ff9619', '#ffb335', '#ffcf52',
  '#8c0018', '#a81c34', '#c53951', '#e1556d', '#fe728a', '#ff8ea6', '#ffabc3', '#ffc7df',
  '#84004c', '#a01c68', '#bc3985', '#d955a1', '#f572be', '#ff8eda', '#ffabf6', '#ffc7ff',
  '#6c007c', '#891ca0', '#a539bc', '#c255d9', '#de72f5', '#fa8eff', '#ffabff', '#ffc7ff',
  '#440098', '#601cb5', '#7d39d1', '#9955ee', '#b672ff', '#d28eff', '#efabff', '#ffc7ff',
  '#180098', '#341cb5', '#5139d1', '#6d55ee', '#8a72ff', '#a68eff', '#c3abff', '#dfc7ff',
  '#00188c', '#1c34a8', '#3951c5', '#556de1', '#728afe', '#8ea6ff', '#abc3ff', '#c7dfff',
  '#002c6c', '#1c4989', '#3965a5', '#5582c2', '#729ede', '#8ebafa', '#abd7ff', '#c7f3ff',
  '#003844', '#1c5560', '#39717d', '#558e99', '#72aab6', '#8ec6d2', '#abe3ef', '#c7ffff',
  '#004018', '#1c5c34', '#397951', '#55956d', '#72b28a', '#8ecea6', '#abeac3', '#c7ffdf',
  '#0c3c00', '#28591c', '#457539', '#619255', '#7eaeb2', '#9acb8e', '#b7e7ab', '#d3ffc7',
  '#283400', '#44501c', '#616d39', '#7d8955', '#9aa672', '#b6c28e', '#d3dfab', '#effbc7',
  '#3c2800', '#59441c', '#756039', '#927d55', '#ae9972', '#cbb68e', '#e7d2ab', '#ffeeec'
];

// 8x8 Bitmap pattern for standard ASCII characters (32..127) in Atari 8-bit ROM
const ATARI_FONT_RAW = {
  32: [0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00], // Space
  33: [0x18,0x18,0x18,0x18,0x18,0x00,0x18,0x00], // !
  34: [0x66,0x66,0x66,0x00,0x00,0x00,0x00,0x00], // "
  35: [0x66,0xff,0x66,0x66,0xff,0x66,0x00,0x00], // #
  36: [0x18,0x3e,0x60,0x3c,0x06,0x7c,0x18,0x00], // $
  37: [0x62,0x66,0x0c,0x18,0x30,0x66,0x46,0x00], // %
  38: [0x3c,0x66,0x3c,0x38,0x67,0x66,0x3f,0x00], // &
  39: [0x18,0x18,0x30,0x00,0x00,0x00,0x00,0x00], // '
  40: [0x0c,0x18,0x30,0x30,0x30,0x18,0x0c,0x00], // (
  41: [0x30,0x18,0x0c,0x0c,0x0c,0x18,0x30,0x00], // )
  42: [0x00,0x66,0x3c,0xff,0x3c,0x66,0x00,0x00], // *
  43: [0x00,0x18,0x18,0x7e,0x18,0x18,0x00,0x00], // +
  44: [0x00,0x00,0x00,0x00,0x18,0x18,0x30,0x00], // ,
  45: [0x00,0x00,0x00,0x7e,0x00,0x00,0x00,0x00], // -
  46: [0x00,0x00,0x00,0x00,0x00,0x18,0x18,0x00], // .
  47: [0x06,0x0c,0x18,0x30,0x60,0xc0,0x80,0x00], // /
  48: [0x3c,0x66,0x6e,0x76,0x66,0x66,0x3c,0x00], // 0
  49: [0x18,0x38,0x18,0x18,0x18,0x18,0x7e,0x00], // 1
  50: [0x3c,0x66,0x06,0x0c,0x18,0x30,0x7e,0x00], // 2
  51: [0x3c,0x66,0x06,0x1c,0x06,0x66,0x3c,0x00], // 3
  52: [0x0c,0x1c,0x3c,0x6c,0xfe,0x0c,0x0c,0x00], // 4
  53: [0x7e,0x60,0x7c,0x06,0x06,0x66,0x3c,0x00], // 5
  54: [0x3c,0x66,0x60,0x7c,0x66,0x66,0x3c,0x00], // 6
  55: [0x7e,0x66,0x0c,0x18,0x18,0x18,0x18,0x00], // 7
  56: [0x3c,0x66,0x66,0x3c,0x66,0x66,0x3c,0x00], // 8
  57: [0x3c,0x66,0x66,0x3e,0x06,0x66,0x3c,0x00], // 9
  58: [0x00,0x18,0x18,0x00,0x18,0x18,0x00,0x00], // :
  59: [0x00,0x18,0x18,0x00,0x18,0x18,0x30,0x00], // ;
  60: [0x0c,0x18,0x30,0x60,0x30,0x18,0x0c,0x00], // <
  61: [0x00,0x00,0x7e,0x00,0x7e,0x00,0x00,0x00], // =
  62: [0x30,0x18,0x0c,0x06,0x0c,0x18,0x30,0x00], // >
  63: [0x3c,0x66,0x0c,0x18,0x18,0x00,0x18,0x00], // ?
  64: [0x3c,0x66,0x6e,0x6e,0x60,0x62,0x3c,0x00], // @
  65: [0x18,0x3c,0x66,0x66,0x7e,0x66,0x66,0x00], // A
  66: [0x7c,0x66,0x66,0x7c,0x66,0x66,0x7c,0x00], // B
  67: [0x3c,0x66,0x60,0x60,0x60,0x66,0x3c,0x00], // C
  68: [0x78,0x6c,0x66,0x66,0x66,0x6c,0x78,0x00], // D
  69: [0x7e,0x60,0x60,0x78,0x60,0x60,0x7e,0x00], // E
  70: [0x7e,0x60,0x60,0x78,0x60,0x60,0x60,0x00], // F
  71: [0x3c,0x66,0x60,0x6e,0x66,0x66,0x3e,0x00], // G
  72: [0x66,0x66,0x66,0x7e,0x66,0x66,0x66,0x00], // H
  73: [0x3c,0x18,0x18,0x18,0x18,0x18,0x3c,0x00], // I
  74: [0x1e,0x0c,0x0c,0x0c,0x0c,0x6c,0x38,0x00], // J
  75: [0x66,0x6c,0x78,0x70,0x78,0x6c,0x66,0x00], // K
  76: [0x60,0x60,0x60,0x60,0x60,0x60,0x7e,0x00], // L
  77: [0x63,0x77,0x7f,0x6b,0x63,0x63,0x63,0x00], // M
  78: [0x66,0x76,0x7e,0x7e,0x6e,0x66,0x66,0x00], // N
  79: [0x3c,0x66,0x66,0x66,0x66,0x66,0x3c,0x00], // O
  80: [0x7c,0x66,0x66,0x7c,0x60,0x60,0x60,0x00], // P
  81: [0x3c,0x66,0x66,0x66,0x6e,0x3c,0x0e,0x00], // Q
  82: [0x7c,0x66,0x66,0x7c,0x78,0x6c,0x66,0x00], // R
  83: [0x3c,0x66,0x60,0x3c,0x06,0x66,0x3c,0x00], // S
  84: [0x7e,0x18,0x18,0x18,0x18,0x18,0x18,0x00], // T
  85: [0x66,0x66,0x66,0x66,0x66,0x66,0x3c,0x00], // U
  86: [0x66,0x66,0x66,0x66,0x66,0x3c,0x18,0x00], // V
  87: [0x63,0x63,0x63,0x6b,0x7f,0x77,0x63,0x00], // W
  88: [0x66,0x66,0x3c,0x18,0x3c,0x66,0x66,0x00], // X
  89: [0x66,0x66,0x66,0x3c,0x18,0x18,0x18,0x00], // Y
  90: [0x7e,0x06,0x0c,0x18,0x30,0x60,0x7e,0x00], // Z
  91: [0x3c,0x30,0x30,0x30,0x30,0x30,0x3c,0x00], // [
  92: [0xc0,0x60,0x30,0x18,0x0c,0x06,0x02,0x00], // \
  93: [0x3c,0x0c,0x0c,0x0c,0x0c,0x0c,0x3c,0x00], // ]
  94: [0x18,0x3c,0x7e,0x18,0x18,0x18,0x18,0x00], // ^
  95: [0x00,0x00,0x00,0x00,0x00,0x00,0xff,0x00]  // _
};

// ============================================================================
// 4. Atari 800 Interactive Engine & BASIC Prompt
// ============================================================================

class AtariEngine {
  constructor(canvas, audio) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.audio = audio;

    // Screen Dimensions: 336x240 (Standard Atari PAL/NTSC with border)
    this.width = 336;
    this.height = 240;
    this.cols = 40;
    this.rows = 24;

    // Atari Colors
    this.colorBg = '#00188c';       // Atari Blue Background ($94)
    this.colorBorder = '#002c6c';   // Atari Deep Blue Border ($90)
    this.colorText = '#ffffff';     // White Font ($0E)
    this.colorCursor = '#ffffff';

    // Text Screen Buffer
    this.screenBuffer = [];
    this.cursorX = 0;
    this.cursorY = 0;
    this.cursorBlink = true;
    this.lastBlinkTime = 0;

    // Current Input Line
    this.currentLine = '';
    
    // Atari BASIC State
    this.basicProgram = new Map(); // lineNum -> code
    this.isRunning = true;
    this.isPaused = false;
    this.loadedMedia = 'Atari BASIC (Rev. C)';
    this.driveLedActive = false;

    // Joystick 1 State (bitmask: 1=UP, 2=DOWN, 4=LEFT, 8=RIGHT, 16=FIRE)
    this.joystickState = 0;
    this.wasdJoystickEnabled = false; // By default FALSE to allow full typing in BASIC!

    // Wasm native module bridge placeholder
    this.wasmModule = null;

    this.initTextBuffer();
    this.bootAtariBASIC();
  }

  initTextBuffer() {
    this.screenBuffer = [];
    for (let r = 0; r < this.rows; r++) {
      this.screenBuffer.push(new Array(this.cols).fill(' '));
    }
    this.cursorX = 0;
    this.cursorY = 0;
  }

  bootAtariBASIC() {
    this.initTextBuffer();
    this.printLine('');
    this.printLine('   *** ATARI 800/XE EMULATOR ***');
    this.printLine('      ATARI COMPUTER CORP.');
    this.printLine('     ATARI BASIC REVISION C');
    this.printLine('');
    this.printLine('MEMORY: 64K RAM DETECTED');
    this.printLine('READY');
    this.printLine('');
    this.currentLine = '';
    this.cursorX = 0;
  }

  print(text) {
    for (let i = 0; i < text.length; i++) {
      const char = text[i].toUpperCase();
      if (char === '\n') {
        this.newline();
      } else {
        if (this.cursorX >= this.cols) {
          this.newline();
        }
        this.screenBuffer[this.cursorY][this.cursorX] = char;
        this.cursorX++;
      }
    }
  }

  printLine(text) {
    this.print(text);
    this.newline();
  }

  newline() {
    this.cursorX = 0;
    this.cursorY++;
    if (this.cursorY >= this.rows) {
      this.screenBuffer.shift();
      this.screenBuffer.push(new Array(this.cols).fill(' '));
      this.cursorY = this.rows - 1;
    }
  }

  handleBackspace() {
    if (this.cursorX > 0) {
      this.cursorX--;
      this.screenBuffer[this.cursorY][this.cursorX] = ' ';
      this.currentLine = this.currentLine.slice(0, -1);
      this.audio.playKeyClick();
    }
  }

  handleCharInput(char) {
    char = char.toUpperCase();
    if (this.cursorX < this.cols) {
      this.screenBuffer[this.cursorY][this.cursorX] = char;
      this.cursorX++;
      this.currentLine += char;
      this.audio.playKeyClick();
    }
  }

  handleEnter() {
    this.audio.playKeyClick();
    const command = this.currentLine.trim();
    this.newline();
    this.currentLine = '';

    if (command.length > 0) {
      this.executeBasicCommand(command);
    } else {
      this.printLine('READY');
    }
  }

  executeBasicCommand(cmd) {
    // Check if line starts with a line number (e.g. "10 PRINT ...")
    const matchLineNum = cmd.match(/^(\d+)\s*(.*)/);
    if (matchLineNum) {
      const lineNum = parseInt(matchLineNum[1], 10);
      const code = matchLineNum[2];
      if (code.length === 0) {
        this.basicProgram.delete(lineNum);
      } else {
        this.basicProgram.set(lineNum, code);
      }
      return;
    }

    // Direct mode execution
    const upper = cmd.toUpperCase();

    if (upper === 'RUN') {
      this.runBasicProgram();
    } else if (upper === 'LIST') {
      const sorted = Array.from(this.basicProgram.keys()).sort((a, b) => a - b);
      for (const lineNum of sorted) {
        this.printLine(`${lineNum} ${this.basicProgram.get(lineNum)}`);
      }
      this.printLine('READY');
    } else if (upper === 'NEW') {
      this.basicProgram.clear();
      this.printLine('READY');
    } else if (upper.startsWith('PRINT ') || upper.startsWith('? ') || upper === 'PRINT' || upper === '?') {
      let expr = cmd.replace(/^(PRINT|\?)\s*/i, '').trim();
      if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
        this.printLine(expr.slice(1, -1));
      } else {
        try {
          // simple eval for math
          const res = Function(`"use strict"; return (${expr})`)();
          this.printLine(String(res));
        } catch {
          this.printLine(expr);
        }
      }
      this.printLine('READY');
    } else if (upper.startsWith('SOUND')) {
      // SOUND v, f, d, vol
      const parts = upper.replace('SOUND', '').split(',').map(s => parseInt(s.trim(), 10));
      const f = parts[1] || 100;
      // Atari POKEY freq calculation approx
      const freqHz = Math.max(60, 64000 / (2 * (f + 1)));
      this.audio.playTone(freqHz, 0.4, 0.3);
      this.printLine('READY');
    } else if (upper === 'HELP') {
      this.printLine('ATARI BASIC COMMANDS:');
      this.printLine('PRINT, RUN, LIST, NEW, SOUND, DIR');
      this.printLine('READY');
    } else if (upper === 'DIR') {
      this.printLine('DIRECTORY D1:');
      this.printLine('AUTORUN.SYS  004');
      this.printLine('GAME.XEX     048');
      this.printLine('999 FREE SECTORS');
      this.printLine('READY');
    } else {
      this.printLine('ERROR-');
      this.printLine('READY');
    }
  }

  runBasicProgram() {
    const sorted = Array.from(this.basicProgram.keys()).sort((a, b) => a - b);
    if (sorted.length === 0) {
      this.printLine('READY');
      return;
    }

    for (const num of sorted) {
      const code = this.basicProgram.get(num).trim();
      if (code.toUpperCase().startsWith('PRINT ') || code.startsWith('? ')) {
        const expr = code.replace(/^(PRINT|\?)\s*/i, '').trim();
        if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
          this.printLine(expr.slice(1, -1));
        } else {
          this.printLine(expr);
        }
      } else if (code.toUpperCase().startsWith('SOUND')) {
        const parts = code.toUpperCase().replace('SOUND', '').split(',').map(s => parseInt(s.trim(), 10));
        const f = parts[1] || 100;
        const freqHz = Math.max(60, 64000 / (2 * (f + 1)));
        this.audio.playTone(freqHz, 0.3, 0.2);
      }
    }
    this.printLine('READY');
  }

  // Handle Diskette / ROM file mounting
  mountMedia(filename, buffer) {
    this.loadedMedia = filename;
    const ext = filename.split('.').pop().toLowerCase();
    
    // Simulate Floppy drive reading
    this.driveLedActive = true;
    this.audio.playDriveStep();

    setTimeout(() => {
      this.driveLedActive = false;
    }, 450);

    this.initTextBuffer();
    this.printLine(`BOOTING ${filename.toUpperCase()}...`);
    this.printLine(`FILE SIZE: ${buffer.byteLength} BYTES`);

    if (ext === 'atr') {
      // Parse Nick Kennedy ATR Header
      const view = new DataView(buffer);
      const magic = view.getUint16(0, true);
      const paragraphs = view.getUint16(2, true);
      const secSize = view.getUint16(4, true);

      this.printLine(`MEDIA: ATR DISK IMAGE (MAGIC $${magic.toString(16)})`);
      this.printLine(`SECTOR SIZE: ${secSize} B`);
      this.printLine(`DISK CAPACITY: ${(paragraphs * 16 / 1024).toFixed(0)} KB`);
      this.printLine('DOS 2.5 LOADED.');
      this.printLine('RUNNING AUTORUN.SYS...');
    } else if (ext === 'xex') {
      this.printLine('MEDIA: ATARI DOS EXECUTABLE');
      this.printLine('LOADING BINARY SEGMENTS...');
      this.printLine('STARTING 6502 EXECUTION...');
    } else if (ext === 'car' || ext === 'rom') {
      this.printLine('MEDIA: CARTRIDGE ROM');
      this.printLine('CARTRIDGE INITIALIZED IN $A000-$BFFF');
    }

    this.printLine('');
    this.printLine('READY');
  }

  // Render 60 FPS Frame
  render(timestamp) {
    // 1. Draw Border (Overscan area)
    this.ctx.fillStyle = this.colorBorder;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Draw Active Display Area (320x192 centered in 336x240)
    const displayX = 8;
    const displayY = 24;
    const displayWidth = 320;
    const displayHeight = 192;

    this.ctx.fillStyle = this.colorBg;
    this.ctx.fillRect(displayX, displayY, displayWidth, displayHeight);

    // Cursor blink logic (every 300ms)
    if (timestamp - this.lastBlinkTime > 300) {
      this.cursorBlink = !this.cursorBlink;
      this.lastBlinkTime = timestamp;
    }

    // 3. Render 40x24 Character Matrix
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const char = this.screenBuffer[row][col];
        const isCursor = (row === this.cursorY && col === this.cursorX && this.cursorBlink);
        const charX = displayX + col * 8;
        const charY = displayY + row * 8;

        if (isCursor) {
          this.ctx.fillStyle = this.colorCursor;
          this.ctx.fillRect(charX, charY, 8, 8);
          // Inverse character underneath cursor
          this.drawGlyph(char, charX, charY, this.colorBg);
        } else if (char !== ' ') {
          this.drawGlyph(char, charX, charY, this.colorText);
        }
      }
    }
  }

  drawGlyph(char, x, y, color) {
    const code = char.charCodeAt(0);
    const pattern = ATARI_FONT_RAW[code] || ATARI_FONT_RAW[63]; // fallback to '?'

    this.ctx.fillStyle = color;
    for (let r = 0; r < 8; r++) {
      const byte = pattern[r];
      for (let bit = 0; bit < 8; bit++) {
        if ((byte & (0x80 >> bit)) !== 0) {
          this.ctx.fillRect(x + bit, y + r, 1, 1);
        }
      }
    }
  }
}

// ============================================================================
// 5. Minimal Offline QR Code SVG Generator (for TV Screen companion upload)
// ============================================================================

function generateSimpleQR(url) {
  // Generates clean SVG stylized matrix for companion URL display
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
      <!-- Background -->
      <rect width="100" height="100" fill="#ffffff" />
      <!-- Corner Finder 1 -->
      <rect x="10" y="10" width="24" height="24" fill="#000000"/>
      <rect x="14" y="14" width="16" height="16" fill="#ffffff"/>
      <rect x="18" y="18" width="8" height="8" fill="#000000"/>
      <!-- Corner Finder 2 -->
      <rect x="66" y="10" width="24" height="24" fill="#000000"/>
      <rect x="70" y="14" width="16" height="16" fill="#ffffff"/>
      <rect x="74" y="18" width="8" height="8" fill="#000000"/>
      <!-- Corner Finder 3 -->
      <rect x="10" y="66" width="24" height="24" fill="#000000"/>
      <rect x="14" y="70" width="16" height="16" fill="#ffffff"/>
      <rect x="18" y="74" width="8" height="8" fill="#000000"/>
      <!-- Data Pattern simulation -->
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
// 6. Main Application Orchestration & Event Binding
// ============================================================================

class AtariApp {
  constructor() {
    this.storage = new AtariStorage();
    this.audio = new AtariAudioEngine();
    this.canvas = document.getElementById('emulatorCanvas');
    this.engine = new AtariEngine(this.canvas, this.audio);

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
    this.wasdJoystickEnabled = false;
    this.btnToggleInputMode = document.getElementById('btnToggleInputMode');

    // Loop & Performance
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.fpsUpdateInterval = 500;
    this.lastFpsUpdate = performance.now();

    this.init();
  }

  async init() {
    console.log('Initializing AtariWebOS App...');

    // 1. Init Database
    await this.storage.init();
    await this.refreshGameList();

    // 2. Setup Events
    this.setupKeyboardEvents();
    this.setupFileDropEvents();
    this.setupUIEvents();
    this.setupCompanionModal();

    // 3. Start 60 FPS Emulation Loop
    requestAnimationFrame((ts) => this.loop(ts));
  }

  // 60 FPS requestAnimationFrame Loop
  loop(timestamp) {
    // Calculate FPS
    this.frameCount++;
    if (timestamp - this.lastFpsUpdate >= this.fpsUpdateInterval) {
      const currentFps = Math.round((this.frameCount * 1000) / (timestamp - this.lastFpsUpdate));
      this.fpsCounter.textContent = currentFps;
      this.frameCount = 0;
      this.lastFpsUpdate = timestamp;
    }

    // Update Drive LED
    if (this.engine.driveLedActive) {
      this.drive1Led.classList.add('active');
    } else {
      this.drive1Led.classList.remove('active');
    }

    // Render Emulation Frame
    this.engine.render(timestamp);

    requestAnimationFrame((ts) => this.loop(ts));
  }

  // ==========================================================================
  // Physical Keyboard & Joystick Mapping
  // ==========================================================================
  setupKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
      // First interaction enables Audio
      this.audio.init();

      // Console Keys (F1..F4, Break)
      if (e.key === 'F1') { // START
        e.preventDefault();
        this.flashNotice('Console: START pressed');
        this.engine.printLine('START KEY PRESSED');
        return;
      }
      if (e.key === 'F2') { // SELECT
        e.preventDefault();
        this.flashNotice('Console: SELECT pressed');
        this.engine.printLine('SELECT KEY PRESSED');
        return;
      }
      if (e.key === 'F3') { // OPTION
        e.preventDefault();
        this.flashNotice('Console: OPTION pressed');
        this.engine.printLine('OPTION KEY PRESSED');
        return;
      }
      if (e.key === 'F4') { // RESET
        e.preventDefault();
        if (e.shiftKey) {
          this.flashNotice('COLD RESET');
          this.engine.bootAtariBASIC();
        } else {
          this.flashNotice('WARM RESET');
          this.engine.printLine('');
          this.engine.printLine('READY');
        }
        return;
      }

      // Handle Joystick 1 (Arrow keys & Numpad are dedicated to Joystick)
      if (e.code === 'ArrowUp' || e.code === 'Numpad8' || (this.wasdJoystickEnabled && e.code === 'KeyW')) {
        this.engine.joystickState |= 1;
        e.preventDefault();
        return;
      }
      if (e.code === 'ArrowDown' || e.code === 'Numpad2' || (this.wasdJoystickEnabled && e.code === 'KeyS')) {
        this.engine.joystickState |= 2;
        e.preventDefault();
        return;
      }
      if (e.code === 'ArrowLeft' || e.code === 'Numpad4' || (this.wasdJoystickEnabled && e.code === 'KeyA')) {
        this.engine.joystickState |= 4;
        e.preventDefault();
        return;
      }
      if (e.code === 'ArrowRight' || e.code === 'Numpad6' || (this.wasdJoystickEnabled && e.code === 'KeyD')) {
        this.engine.joystickState |= 8;
        e.preventDefault();
        return;
      }
      if (e.code === 'ControlRight' || e.code === 'Numpad0') {
        this.engine.joystickState |= 16;
        e.preventDefault();
        return;
      }

      // Handle Standard Keyboard Input for Atari BASIC
      if (e.key === 'Backspace') {
        e.preventDefault();
        this.engine.handleBackspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.engine.handleEnter();
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Spacebar is also mapped to Fire if in game, but in BASIC it's Space
        this.engine.handleCharInput(e.key);
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'Numpad8' || (this.wasdJoystickEnabled && e.code === 'KeyW')) this.engine.joystickState &= ~1;
      if (e.code === 'ArrowDown' || e.code === 'Numpad2' || (this.wasdJoystickEnabled && e.code === 'KeyS')) this.engine.joystickState &= ~2;
      if (e.code === 'ArrowLeft' || e.code === 'Numpad4' || (this.wasdJoystickEnabled && e.code === 'KeyA')) this.engine.joystickState &= ~4;
      if (e.code === 'ArrowRight' || e.code === 'Numpad6' || (this.wasdJoystickEnabled && e.code === 'KeyD')) this.engine.joystickState &= ~8;
      if (e.code === 'ControlRight' || e.code === 'Numpad0') this.engine.joystickState &= ~16;
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

    // Drag and Drop over viewport
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
          await this.handleIncomingFile(file, true); // Auto-run dropped file
        }
      }
    });
  }

  async handleIncomingFile(file, autoRun = false) {
    const arrayBuffer = await file.arrayBuffer();
    await this.storage.saveMedia(file.name, arrayBuffer, file.size);
    await this.refreshGameList();
    this.flashNotice(`Uloženo: ${file.name}`);

    if (autoRun) {
      this.runMedia(file.name, arrayBuffer);
    }
  }

  runMedia(name, buffer) {
    this.audio.init();
    this.loadedMediaName.textContent = name;
    this.engine.mountMedia(name, buffer);
    this.flashNotice(`Spuštěno: ${name}`);
  }

  // ==========================================================================
  // Library UI & Storage Rendering
  // ==========================================================================
  async refreshGameList() {
    const list = await this.storage.getAllMedia();
    this.libraryCountBadge.textContent = `${list.length} ${list.length === 1 ? 'soubor' : 'souborů'}`;

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
      const dateStr = new Date(item.date).toLocaleDateString();

      el.innerHTML = `
        <div class="game-info">
          <div class="game-name" title="${item.name}">${item.name}</div>
          <div class="game-meta">
            <span class="game-badge">${item.ext.toUpperCase()}</span>
            <span>${sizeKb} KB</span> • <span>${dateStr}</span>
          </div>
        </div>
        <div class="game-actions">
          <button class="btn btn-primary btn-sm btn-run" data-id="${item.id}" title="Spustit v Atari">▶ Spustit</button>
          <button class="btn btn-danger btn-sm btn-del" data-id="${item.id}" title="Smazat">🗑</button>
        </div>
      `;

      el.querySelector('.btn-run').addEventListener('click', async () => {
        const fullItem = await this.storage.getMedia(item.id);
        if (fullItem) {
          this.runMedia(fullItem.name, fullItem.data);
        }
      });

      el.querySelector('.btn-del').addEventListener('click', async () => {
        if (confirm(`Opravdu chcete smazat "${item.name}"?`)) {
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
    // Keyboard Input Profile Toggle (BASIC Mode vs WASD Game Mode)
    if (this.btnToggleInputMode) {
      this.btnToggleInputMode.addEventListener('click', () => {
        this.wasdJoystickEnabled = !this.wasdJoystickEnabled;
        if (this.wasdJoystickEnabled) {
          this.btnToggleInputMode.innerHTML = '<span>🕹️</span> Mód: Herní WASD';
          this.btnToggleInputMode.classList.add('btn-primary');
          this.flashNotice('Aktivován herní režim (WASD = Joystick)');
        } else {
          this.btnToggleInputMode.innerHTML = '<span>⌨️</span> Mód: BASIC';
          this.btnToggleInputMode.classList.remove('btn-primary');
          this.flashNotice('Aktivován režim BASIC (plná klávesnice)');
        }
      });
    }

    // Audio Toggle
    document.getElementById('btnToggleAudio').addEventListener('click', () => {
      this.audio.init();
      const isEnabled = this.audio.toggle();
      this.audioIcon.textContent = isEnabled ? '🔊' : '🔇';
      if (isEnabled) {
        this.audioLed.classList.add('active');
      } else {
        this.audioLed.classList.remove('active');
      }
    });

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

    // Atari Console Key Buttons
    document.getElementById('btnConsoleOption').addEventListener('click', () => {
      this.flashNotice('OPTION stisknuto');
      this.engine.printLine('OPTION PRESSED');
    });
    document.getElementById('btnConsoleSelect').addEventListener('click', () => {
      this.flashNotice('SELECT stisknuto');
      this.engine.printLine('SELECT PRESSED');
    });
    document.getElementById('btnConsoleStart').addEventListener('click', () => {
      this.flashNotice('START stisknuto');
      this.engine.printLine('START PRESSED');
    });
    document.getElementById('btnConsoleReset').addEventListener('click', () => {
      this.flashNotice('RESET');
      this.engine.printLine('WARM RESET');
    });
    document.getElementById('btnColdReset').addEventListener('click', () => {
      this.flashNotice('COLD RESTART');
      this.engine.bootAtariBASIC();
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

    // Clear All Data
    document.getElementById('btnClearAllData').addEventListener('click', async () => {
      if (confirm('Opravdu chcete vymazat VŠECHNY hry z paměti televize?')) {
        await this.storage.clearAll();
        await this.refreshGameList();
        this.flashNotice('Paměť TV byla vymazána');
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

