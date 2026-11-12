/**
 * Build script for AtariWebOS LG TV Package
 * Prepares the /dist folder for 'ares-package'
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const WEBOS_DIR = path.join(ROOT_DIR, 'webos');

console.log('Building AtariWebOS for LG WebOS TV...');

// Clean and create dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// Copy appinfo.json
fs.copyFileSync(path.join(WEBOS_DIR, 'appinfo.json'), path.join(DIST_DIR, 'appinfo.json'));

// Copy icons
['icon.png', 'largeIcon.png'].forEach(file => {
  const p = path.join(WEBOS_DIR, file);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(DIST_DIR, file));
  }
});

// Copy core files from /src
['index.html', 'app.js', 'style.css'].forEach(file => {
  const p = path.join(SRC_DIR, file);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(DIST_DIR, file));
  }
});

// Copy roms directory
const ROMS_SRC = path.join(SRC_DIR, 'roms');
const ROMS_DIST = path.join(DIST_DIR, 'roms');
if (fs.existsSync(ROMS_SRC)) {
  fs.mkdirSync(ROMS_DIST, { recursive: true });
  fs.readdirSync(ROMS_SRC).forEach(file => {
    fs.copyFileSync(path.join(ROMS_SRC, file), path.join(ROMS_DIST, file));
  });
}

// Copy wasm directory
const WASM_SRC = path.join(SRC_DIR, 'wasm');
const WASM_DIST = path.join(DIST_DIR, 'wasm');
if (fs.existsSync(WASM_SRC)) {
  fs.mkdirSync(WASM_DIST, { recursive: true });
  fs.readdirSync(WASM_SRC).forEach(file => {
    fs.copyFileSync(path.join(WASM_SRC, file), path.join(WASM_DIST, file));
  });
}

console.log('✅ Build completed successfully in /dist directory.');
console.log('To package IPK: ares-package dist -o .');

