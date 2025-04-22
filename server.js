const express = require('express');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

const app = express();

// Обслуживание статических файлов
app.use(express.static(path.join(__dirname, 'dist/city-quest')));

// Перенаправление всех запросов на index.html для SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/city-quest', 'index.html'));
});

async function prerenderRoutes() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const routes = fs.readFileSync('routes.txt', 'utf-8').split('\n').map(route => route.trim()).filter(Boolean);

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    const outputPath = path.join(__dirname, 'dist/city-quest', route === '/' ? 'index.html' : `${route}/index.html`);

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await page.goto(url, { waitUntil: 'networkidle0' });
    const html = await page.content();
    fs.writeFileSync(outputPath, html);
    console.log(`Prerendered: ${route}`);
  }

  await browser.close();
}

(async () => {
  try {
    console.log('Starting prerendering...');
    await prerenderRoutes();
    console.log('Prerendering complete');
    process.exit(0);
  } catch (error) {
    console.error('Prerendering failed:', error);
    process.exit(1);
  }
})();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
