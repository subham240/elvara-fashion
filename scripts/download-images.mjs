import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const imagesToDownload = [
  // Hero
  { dir: 'public/images/hero', name: 'spring-campaign.jpg', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85' },
  { dir: 'public/images/hero', name: 'editorial-reveal.jpg', url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1600&q=85' },
  
  // Editorial
  { dir: 'public/images/editorial', name: 'less-but-better.jpg', url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85' },
  { dir: 'public/images/editorial', name: 'philosophy.jpg', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85' },
  { dir: 'public/images/editorial', name: 'craftsmanship.jpg', url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=85' },

  // Categories
  { dir: 'public/images/categories', name: 'women.jpg', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/categories', name: 'men.jpg', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/categories', name: 'shirts.jpg', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/categories', name: 'dresses.jpg', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/categories', name: 'trousers.jpg', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/categories', name: 'accessories.jpg', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85' },

  // Women Products
  { dir: 'public/images/women', name: 'essential-linen-blouse.jpg', url: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'relaxed-cotton-shirt.jpg', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'tailored-wide-leg-trousers.jpg', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'classic-midi-dress.jpg', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'minimal-knit-top.jpg', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'structured-blazer.jpg', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'everyday-straight-fit-jeans.jpg', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'pleated-midi-skirt.jpg', url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'cashmere-trench-coat.jpg', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'ribbed-knit-cardigan.jpg', url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'silk-slip-dress.jpg', url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'high-rise-wool-trousers.jpg', url: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'oversized-poplin-shirt.jpg', url: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'wrap-linen-dress.jpg', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'sculpted-wool-blazer.jpg', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/women', name: 'minimalist-leather-tote.jpg', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85' },

  // Men Products
  { dir: 'public/images/men', name: 'essential-oxford-shirt.jpg', url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'relaxed-cotton-tee.jpg', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'tailored-wide-leg-trousers.jpg', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'minimalist-knit-polo.jpg', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'structured-overshirt.jpg', url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'everyday-straight-fit-denim.jpg', url: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'relaxed-blazer.jpg', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'premium-knit-sweater.jpg', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'classic-wool-overcoat.jpg', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'minimal-heavyweight-tee.jpg', url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'italian-cotton-chinos.jpg', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'cashmere-crewneck.jpg', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'corduroy-overshirt.jpg', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'raw-denim-jean.jpg', url: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'tailored-suit-jacket.jpg', url: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/men', name: 'minimalist-crossbody-pouch.jpg', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85' },

  // Accessories
  { dir: 'public/images/accessories', name: 'minimal-leather-belt.jpg', url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/accessories', name: 'structured-everyday-bag.jpg', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/accessories', name: 'classic-wallet.jpg', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/accessories', name: 'minimalist-scarf.jpg', url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/accessories', name: 'leather-loafers.jpg', url: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=85' },
  { dir: 'public/images/accessories', name: 'architectural-tote.jpg', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85' }
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Follow redirect
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
  console.log('Ensuring directories exist...');
  const dirs = new Set(imagesToDownload.map(item => item.dir));
  for (const dir of dirs) {
    fs.mkdirSync(dir, { recursive: true });
  }

  console.log(`Starting download of ${imagesToDownload.length} fashion images...`);
  let downloadedCount = 0;

  for (const item of imagesToDownload) {
    const dest = path.join(item.dir, item.name);
    try {
      console.log(`Downloading: ${item.name}...`);
      await downloadFile(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ Saved ${item.name} (${Math.round(stats.size / 1024)} KB)`);
      downloadedCount++;
    } catch (err) {
      console.error(`✗ Error downloading ${item.name}: ${err.message}`);
    }
  }

  console.log(`Finished downloading ${downloadedCount}/${imagesToDownload.length} assets.`);
}

main();
