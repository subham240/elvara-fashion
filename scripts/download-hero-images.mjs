import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const heroImages = [
  {
    name: 'hero-slide-1.jpg',
    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'hero-slide-2.jpg',
    url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'hero-slide-3.jpg',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=85'
  },
  {
    name: 'hero-slide-4.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85'
  }
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const dir = 'public/images/hero';
  fs.mkdirSync(dir, { recursive: true });

  console.log('Downloading 4 brand-new, exclusive hero carousel images...');
  for (const item of heroImages) {
    const dest = path.join(dir, item.name);
    try {
      await downloadFile(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ Saved ${item.name} (${Math.round(stats.size / 1024)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.name}: ${err.message}`);
    }
  }
}

main();
