/**
 * AtariWebOS - Local Dev Server & Mobile Companion File Uploader
 * Run with: npm start
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 8080;
const ROOT_DIR = path.resolve(__dirname, '..');

// Get local IPv4 address for QR code / Mobile WiFi sharing
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.wasm': 'application/wasm',
  '.atr': 'application/octet-stream',
  '.xex': 'application/octet-stream',
  '.car': 'application/octet-stream',
  '.rom': 'application/octet-stream'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = url.pathname;

  // Root redirect to /src/index.html
  if (pathname === '/' || pathname === '/index.html') {
    pathname = '/src/index.html';
  }

  // Mobile Companion Web Upload page: /upload -> serve /src/upload.html
  if (pathname === '/upload' || pathname === '/upload.html') {
    pathname = '/src/upload.html';
  }

  // LAN IP discovery endpoint for QR code generation on localhost
  if (pathname === '/api/lan-info') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ ip: getLocalIp(), port: PORT }));
    return;
  }

  // API Upload endpoint
  if (pathname === '/api/upload' && req.method === 'POST') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      // Return success
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'File received' }));
    });
    return;
  }

  // Static File Serving
  let filePath = path.join(ROOT_DIR, pathname);
  if (!fs.existsSync(filePath)) {
    // Check in src directory
    filePath = path.join(ROOT_DIR, 'src', pathname);
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + pathname);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  console.log('========================================================');
  console.log('  🕹️  AtariWebOS Emulator Dev & Companion Server');
  console.log('========================================================');
  console.log(`  Local Web Browser:    http://localhost:${PORT}`);
  console.log(`  Mobile Companion App: http://${localIp}:${PORT}/upload`);
  console.log('========================================================');
  console.log('Press Ctrl+C to stop.');
});

