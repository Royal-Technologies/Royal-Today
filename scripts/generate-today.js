/**
 * Royal Today — Daily Generation & Publishing Engine
 * 
 * Generates:
 * - 1080x1080 PNG image: cards/today.png & cards/RT-YYYYMMDD.png
 * - Metadata & Caption: cards/today.json
 * 
 * Brand: Royal Today — আজকের দিন, আজকের তথ্য
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');

const rootDir = path.resolve(__dirname, '..');
const CalendarCalc = require(path.join(rootDir, 'assets/js/calendar-calc.js'));
const RoyalTodayCard = require(path.join(rootDir, 'templates/royal-today-card.js'));

// ── 1. Register Embedded Fonts ──
const fontDir = path.join(rootDir, 'assets/fonts');
const fonts = [
  { file: 'HindSiliguri-Regular.ttf', family: 'Hind Siliguri' },
  { file: 'HindSiliguri-Bold.ttf', family: 'Hind Siliguri' },
  { file: 'Amiri-Regular.ttf', family: 'Amiri' },
  { file: 'Amiri-Bold.ttf', family: 'Amiri' }
];

fonts.forEach(f => {
  const fPath = path.join(fontDir, f.file);
  if (fs.existsSync(fPath)) {
    try {
      GlobalFonts.registerFromPath(fPath, f.family);
    } catch (e) {
      console.warn(`[Font] Could not load ${f.file}:`, e.message);
    }
  }
});

// ── 2. Parse CLI Arguments ──
const args = process.argv.slice(2);
function getArg(name, defaultValue = null) {
  const prefix = `--${name}=`;
  const match = args.find(a => a.startsWith(prefix));
  return match ? match.slice(prefix.length) : defaultValue;
}
const isPreview = args.includes('--preview');
const customDateStr = getArg('date', null);
const customTheme = getArg('theme', null);
const customDistrict = getArg('district', 'dhaka');
const hijriOffset = parseInt(getArg('hijri-offset', '0'), 10) || 0;

// ── 3. Date Resolution (Asia/Dhaka) ──
let targetDate = new Date();
if (customDateStr) {
  targetDate = new Date(`${customDateStr}T06:00:00+06:00`);
} else {
  // Current time in Dhaka
  const dhakaFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const todayStr = dhakaFormatter.format(new Date());
  targetDate = new Date(`${todayStr}T06:00:00+06:00`);
}

// ── 4. Theme Selection (Auto Rotation or Forced) ──
const themeKeys = Object.keys(RoyalTodayCard.THEMES);
let selectedTheme = customTheme;
if (!selectedTheme || !RoyalTodayCard.THEMES[selectedTheme]) {
  // Day of year or day of week rotation
  const dayIndex = targetDate.getDay();
  selectedTheme = themeKeys[dayIndex % themeKeys.length];
}

// ── 5. Calculate Daily Bundle ──
const dailyData = CalendarCalc.getCompleteDailyData(targetDate, {
  district: customDistrict,
  hijriOffset: hijriOffset
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🌟 ROYAL TODAY — আজকের দিন, আজকের তথ্য');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📅 তারিখ (খ্রীষ্টাব্দ): ${dailyData.gregorian.formattedText}`);
console.log(`🌾 বঙ্গাব্দ:        ${dailyData.bangla.formattedText}`);
console.log(`🌙 হিজরী:          ${dailyData.hijri.formattedText}`);
console.log(`☀️  সূর্য ও জ্যোতির্বিজ্ঞান: ${dailyData.sun.formattedLine}`);
console.log(`🍂 ঋতু:            ${dailyData.bangla.seasonLine}`);
console.log(`🎨 থিম:            ${RoyalTodayCard.THEMES[selectedTheme].name}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// ── 6. Canvas 1080x1080 Rendering ──
const canvas = createCanvas(1080, 1080);
const ctx = canvas.getContext('2d');

RoyalTodayCard.render(ctx, dailyData, { theme: selectedTheme });

// ── 7. Output Files ──
const cardsDir = path.join(rootDir, 'cards');
if (!fs.existsSync(cardsDir)) {
  fs.mkdirSync(cardsDir, { recursive: true });
}

// Format Date Key: YYYYMMDD
const yStr = String(targetDate.getFullYear());
const mStr = String(targetDate.getMonth() + 1).padStart(2, '0');
const dStr = String(targetDate.getDate()).padStart(2, '0');
const dateKey = `${yStr}${mStr}${dStr}`;
const archiveFilename = `RT-${dateKey}.png`;

const todayPngPath = path.join(cardsDir, 'today.png');
const archivePngPath = path.join(cardsDir, archiveFilename);
const todayJsonPath = path.join(cardsDir, 'today.json');

// Write PNG Buffers
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(todayPngPath, buffer);
fs.writeFileSync(archivePngPath, buffer);

// JSON Metadata & Social Caption
const jsonPayload = {
  cardId: `RT-${dateKey}`,
  date: dailyData.isoDate,
  gregorian: dailyData.gregorian,
  bangla: dailyData.bangla,
  hijri: dailyData.hijri,
  sun: dailyData.sun,
  theme: selectedTheme,
  themeName: RoyalTodayCard.THEMES[selectedTheme].name,
  caption: dailyData.caption,
  imageUrl: 'https://royal-technologies.github.io/Royal-Today/cards/today.png',
  archiveUrl: `https://royal-technologies.github.io/Royal-Today/cards/${archiveFilename}`,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(todayJsonPath, JSON.stringify(jsonPayload, null, 2), 'utf8');

console.log(`✅ [Success] Generated 1080x1080 PNG: ${todayPngPath}`);
console.log(`✅ [Success] Generated Archive PNG:  ${archivePngPath}`);
console.log(`✅ [Success] Generated Metadata:     ${todayJsonPath}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
