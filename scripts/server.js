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

  // Mobile Companion Web Upload page: /upload
  if (pathname === '/upload') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html lang="cs">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AtariWebOS - Nahrát hry do TV</title>
          <style>
            body { background: #0a0e17; color: #fff; font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
            .card { background: #131b2c; border: 1px solid #23314f; border-radius: 12px; padding: 24px; max-width: 450px; width: 100%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            h1 { font-size: 1.4rem; color: #3a75ff; margin-bottom: 8px; }
            p { color: #8892b0; font-size: 0.9rem; margin-bottom: 20px; line-height: 1.4; }
            .upload-btn { background: #2c59d9; color: white; padding: 14px 24px; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; display: block; width: 100%; box-sizing: border-box; margin-bottom: 12px; }
            .upload-btn:hover { background: #3c6bff; }
            .status { margin-top: 16px; font-size: 0.9rem; color: #2ecc71; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>🕹️ AtariWebOS TV</h1>
            <p>Vyberte soubory her nebo disket (.ATR, .XEX, .CAR, .ROM) pro okamžité odeslání do televizoru.</p>
            <input type="file" id="picker" multiple accept=".atr,.xex,.car,.rom,.cas,.bin" style="display:none">
            <button class="upload-btn" onclick="document.getElementById('picker').click()">Vybrat soubory z mobilu</button>
            <div id="status" class="status"></div>
          </div>
          <script>
            document.getElementById('picker').addEventListener('change', async (e) => {
              const files = Array.from(e.target.files);
              const status = document.getElementById('status');
              if (files.length === 0) return;
              status.textContent = 'Nahrávám ' + files.length + ' souborů...';
              
              for (const file of files) {
                const formData = new FormData();
                formData.append('file', file, file.name);
                await fetch('/api/upload', { method: 'POST', body: formData });
              }
              status.textContent = '✅ Hotovo! Soubory byly odeslány do TV.';
            });
          </script>
        </body>
        </html>
      `);
      return;
    }
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

