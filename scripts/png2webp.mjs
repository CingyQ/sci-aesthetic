/**
 * PNG → WebP 批量转换脚本
 * 保留原始 PNG 文件，生成同名 .webp 文件
 * 用法：node scripts/png2webp.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const SRC_DIR = 'public/assets/m2';
const QUALITY = 80; // WebP 质量，80 已经很清晰

async function convert() {
  const files = await readdir(SRC_DIR);
  const pngs = files.filter(f => extname(f).toLowerCase() === '.png');

  console.log(`找到 ${pngs.length} 张 PNG，开始转换...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const png of pngs) {
    const inputPath = join(SRC_DIR, png);
    const outputPath = join(SRC_DIR, basename(png, '.png') + '.webp');

    const beforeSize = (await stat(inputPath)).size;
    await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
    const afterSize = (await stat(outputPath)).size;

    const ratio = ((1 - afterSize / beforeSize) * 100).toFixed(1);
    totalBefore += beforeSize;
    totalAfter += afterSize;

    console.log(`${png} → ${(beforeSize / 1e6).toFixed(1)}MB → ${(afterSize / 1e6).toFixed(1)}MB (${ratio}% 压缩)`);
  }

  console.log(`\n总计: ${(totalBefore / 1e6).toFixed(1)}MB → ${(totalAfter / 1e6).toFixed(1)}MB (节省 ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
}

convert().catch(console.error);
