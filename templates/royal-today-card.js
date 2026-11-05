/**
 * Royal Today — 1080x1080 Multi-Theme & Multi-Layout Card Engine
 * 
 * Architecture:
 * - 10 Royal Color Themes (কালার ১০টি)
 * - 10 Architectural Vector Frames + 10 Scenic/Canvas Backgrounds = 20 Layouts (মোট ২০টি)
 * - 10 Themes × 20 Layouts = 200 Unique Royal Variations!
 * 
 * Brand: Royal Today — আজকের দিন, আজকের তথ্য
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RoyalTodayCard = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const W = 1080;
  const H = 1080;

  // ═════════════════════════════════════════════════════════════════
  // 1. TEN ROYAL COLOR THEMES (১০টি কালার থিম)
  // ═════════════════════════════════════════════════════════════════
  const THEMES = {
    'royal-emerald': {
      key: 'royal-emerald',
      name: 'পান্না সবুজ (Royal Emerald)',
      bgGrad: ['#011710', '#05291E', '#093E2F'],
      cardBg: 'rgba(4, 33, 24, 0.72)',
      primaryGold: '#E5C383',
      secondaryGold: '#BF9546',
      accentGold: '#F9ECCE',
      textColor: '#FAF6EE',
      subTextColor: '#D8BF89',
      highlightColor: '#F9ECCE',
      borderColor: 'rgba(229, 195, 131, 0.45)',
      subtleLine: 'rgba(229, 195, 131, 0.18)',
      badgeBg: 'rgba(229, 195, 131, 0.15)',
      badgeBorder: 'rgba(229, 195, 131, 0.35)',
      sunColor: '#FFA726',
      isDark: true
    },
    'midnight-navy': {
      key: 'midnight-navy',
      name: 'গভীর নীলকান্ত (Midnight Navy)',
      bgGrad: ['#030C1A', '#081A36', '#0E2850'],
      cardBg: 'rgba(7, 24, 48, 0.75)',
      primaryGold: '#EAC875',
      secondaryGold: '#C59E3F',
      accentGold: '#FDF2D4',
      textColor: '#F1F5F9',
      subTextColor: '#D4B365',
      highlightColor: '#FDF2D4',
      borderColor: 'rgba(234, 200, 117, 0.45)',
      subtleLine: 'rgba(234, 200, 117, 0.18)',
      badgeBg: 'rgba(234, 200, 117, 0.15)',
      badgeBorder: 'rgba(234, 200, 117, 0.35)',
      sunColor: '#FBBF24',
      isDark: true
    },
    'imperial-black': {
      key: 'imperial-black',
      name: 'কাবার গিলাফ ও সোনা (Imperial Onyx)',
      bgGrad: ['#07080A', '#0F1116', '#171A21'],
      cardBg: 'rgba(12, 14, 19, 0.8)',
      primaryGold: '#F5D77F',
      secondaryGold: '#C99E32',
      accentGold: '#FFF4D6',
      textColor: '#FAF9F6',
      subTextColor: '#D9B45C',
      highlightColor: '#FFF4D6',
      borderColor: 'rgba(245, 215, 127, 0.5)',
      subtleLine: 'rgba(245, 215, 127, 0.18)',
      badgeBg: 'rgba(245, 215, 127, 0.15)',
      badgeBorder: 'rgba(245, 215, 127, 0.38)',
      sunColor: '#F59E0B',
      isDark: true
    },
    'warm-parchment': {
      key: 'warm-parchment',
      name: 'মদিনা পাণ্ডুলিপি (Illuminated Parchment)',
      bgGrad: ['#F6EFE0', '#EFE4CD', '#E5D5B8'],
      cardBg: 'rgba(255, 253, 247, 0.88)',
      primaryGold: '#946E26',
      secondaryGold: '#6A4A0E',
      accentGold: '#B8892E',
      textColor: '#2B1E14',
      subTextColor: '#6B4D18',
      highlightColor: '#1A120B',
      borderColor: 'rgba(148, 110, 38, 0.4)',
      subtleLine: 'rgba(148, 110, 38, 0.2)',
      badgeBg: 'rgba(148, 110, 38, 0.1)',
      badgeBorder: 'rgba(148, 110, 38, 0.32)',
      sunColor: '#D97706',
      isDark: false
    },
    'royal-maroon': {
      key: 'royal-maroon',
      name: 'দামেস্ক মেরুন (Damascus Crimson)',
      bgGrad: ['#1A040B', '#2D0A16', '#441223'],
      cardBg: 'rgba(34, 6, 15, 0.75)',
      primaryGold: '#F2CB75',
      secondaryGold: '#D49D34',
      accentGold: '#FCEECC',
      textColor: '#FDF5EC',
      subTextColor: '#DEB059',
      highlightColor: '#FCEECC',
      borderColor: 'rgba(242, 203, 117, 0.45)',
      subtleLine: 'rgba(242, 203, 117, 0.18)',
      badgeBg: 'rgba(242, 203, 117, 0.15)',
      badgeBorder: 'rgba(242, 203, 117, 0.35)',
      sunColor: '#FF7043',
      isDark: true
    },
    'ottoman-turquoise': {
      key: 'ottoman-turquoise',
      name: 'অটোমান ফিরোজা (Ottoman Turquoise)',
      bgGrad: ['#021B21', '#062F38', '#0A4652'],
      cardBg: 'rgba(4, 38, 46, 0.75)',
      primaryGold: '#62E5D5',
      secondaryGold: '#E5C370',
      accentGold: '#FBF3D4',
      textColor: '#EFFFFD',
      subTextColor: '#52D4C4',
      highlightColor: '#FBF3D4',
      borderColor: 'rgba(98, 229, 213, 0.42)',
      subtleLine: 'rgba(98, 229, 213, 0.18)',
      badgeBg: 'rgba(98, 229, 213, 0.15)',
      badgeBorder: 'rgba(98, 229, 213, 0.35)',
      sunColor: '#26A69A',
      isDark: true
    },
    'desert-amber': {
      key: 'desert-amber',
      name: 'মরু জাফরান ও অ্যাম্বার (Hijaz Amber)',
      bgGrad: ['#1F0E04', '#361808', '#4F260E'],
      cardBg: 'rgba(39, 17, 5, 0.75)',
      primaryGold: '#F7BA45',
      secondaryGold: '#DC8D24',
      accentGold: '#FCE7B8',
      textColor: '#FAF4EC',
      subTextColor: '#DE9837',
      highlightColor: '#FCE7B8',
      borderColor: 'rgba(247, 186, 69, 0.45)',
      subtleLine: 'rgba(247, 186, 69, 0.18)',
      badgeBg: 'rgba(247, 186, 69, 0.15)',
      badgeBorder: 'rgba(247, 186, 69, 0.35)',
      sunColor: '#FFA000',
      isDark: true
    },
    'amethyst-violet': {
      key: 'amethyst-violet',
      name: 'রাজকীয় বেগুনি (Royal Amethyst)',
      bgGrad: ['#12071E', '#200D35', '#32164F'],
      cardBg: 'rgba(26, 11, 42, 0.75)',
      primaryGold: '#EFD48E',
      secondaryGold: '#CFA64F',
      accentGold: '#F9EED4',
      textColor: '#F8F3FC',
      subTextColor: '#D8B568',
      highlightColor: '#F9EED4',
      borderColor: 'rgba(239, 212, 142, 0.45)',
      subtleLine: 'rgba(239, 212, 142, 0.18)',
      badgeBg: 'rgba(239, 212, 142, 0.15)',
      badgeBorder: 'rgba(239, 212, 142, 0.35)',
      sunColor: '#AB47BC',
      isDark: true
    },
    'andalusian-olive': {
      key: 'andalusian-olive',
      name: 'আন্দালুসীয় অলিভ (Moorish Olive)',
      bgGrad: ['#071A12', '#0D2B1F', '#164230'],
      cardBg: 'rgba(9, 34, 24, 0.75)',
      primaryGold: '#E7C67E',
      secondaryGold: '#BA943E',
      accentGold: '#F8EED5',
      textColor: '#FAF7F0',
      subTextColor: '#D2AD5E',
      highlightColor: '#F8EED5',
      borderColor: 'rgba(231, 198, 126, 0.45)',
      subtleLine: 'rgba(231, 198, 126, 0.18)',
      badgeBg: 'rgba(231, 198, 126, 0.15)',
      badgeBorder: 'rgba(231, 198, 126, 0.35)',
      sunColor: '#66BB6A',
      isDark: true
    },
    'classic-ivory': {
      key: 'classic-ivory',
      name: 'শুভ্র মুক্তা আইভরি (Classic Pearl Ivory)',
      bgGrad: ['#161B22', '#21262D', '#30363D'],
      cardBg: 'rgba(252, 250, 245, 0.9)',
      primaryGold: '#967228',
      secondaryGold: '#705315',
      accentGold: '#BD9645',
      textColor: '#172420',
      subTextColor: '#705315',
      highlightColor: '#0C1B16',
      borderColor: 'rgba(150, 114, 40, 0.42)',
      subtleLine: 'rgba(150, 114, 40, 0.2)',
      badgeBg: 'rgba(150, 114, 40, 0.1)',
      badgeBorder: 'rgba(150, 114, 40, 0.32)',
      sunColor: '#D97706',
      isDark: false
    }
  };

  const THEME_KEYS = Object.keys(THEMES);

  // ═════════════════════════════════════════════════════════════════
  // 2. TWENTY DISTINCT LAYOUT ARCHITECTURES (মোট ২০টি লেআউট)
  // ═════════════════════════════════════════════════════════════════
  const LAYOUTS = {
    // ── ۱۰ Architectural Vector Frames ──
    'mihrab-arch': {
      key: 'mihrab-arch',
      name: '১. মেহরাব আর্চ (Mihrab Sanctuary Arch)',
      desc: 'মসজিদের মেহরাব ও খিলান অনুপ্রাণিত স্থাপত্য ফ্রেম'
    },
    'royal-minimal': {
      key: 'royal-minimal',
      name: '২. রাজকীয় মিনিমালিজম (Royal Modern Luxury)',
      desc: 'আধুনিক সূক্ষ্ম গোল্ডেন লাইন ও মিনিমাল আর্কিটেকচার'
    },
    'geometric-mandala': {
      key: 'geometric-mandala',
      name: '৩. ইসলামিক রজেট ও মান্ডালা (Sacred Rosette)',
      desc: 'কেন্দ্রীয় ১৬-কোণা ইসলামিক জ্যামিতিক রজেট ও নক্ষত্র'
    },
    'illuminated-manuscript': {
      key: 'illuminated-manuscript',
      name: '৪. মদিনা পাণ্ডুলিপি ফ্রেম (Illuminated Manuscript)',
      desc: 'প্রাচীন পাণ্ডুলিপি ও স্বর্ণালী কারতুশ সীমানা'
    },
    'iznik-tiles': {
      key: 'iznik-tiles',
      name: '৫. অটোমান ইজনিক টাইলস (Ottoman Iznik Border)',
      desc: 'অটোমান প্রাসাদ ও মসজিদের জ্যামিতিক টাইলস সীমানা'
    },
    'architectural-pillars': {
      key: 'architectural-pillars',
      name: '৬. রাজকীয় স্তম্ভ ও তোরণ (Royal Twin Pillars)',
      desc: 'দুই পাশের মহিমান্বিত স্বর্ণস্তম্ভ ও উপরের রাজতোরণ'
    },
    'celestial-crescent': {
      key: 'celestial-crescent',
      name: '৭. হিলাল ও সেলিস্টিয়াল গ্যালাক্সি (Celestial Crescent)',
      desc: 'উজ্জ্বল স্বর্ণালী অর্ধচন্দ্র ও তারকাময় স্বর্গীয় আবহ'
    },
    'alhambra-palace': {
      key: 'alhambra-palace',
      name: '৮. আন্দালুসীয় আলহামব্রা (Alhambra Arabesque)',
      desc: 'আলহামব্রা প্রাসাদের বহু-খাঁজযুক্ত খিলান ও লতাপাতা'
    },
    'octagram-medallion': {
      key: 'octagram-medallion',
      name: '৯. আটকোণা মেডেলিয়ন (Rub el Hizb Seal)',
      desc: 'আটকোণা চ্যাম্ফার্ড বর্ডার ও পবিত্র রুব-এল-হিজব সিল'
    },
    'kiswah-gold-ribbon': {
      key: 'kiswah-gold-ribbon',
      name: '১০. কাবার গিলাফ স্বর্ণসূত্র ফিতা (Kiswah Silk Ribbon)',
      desc: 'কাবার গিলাফের অনুকরণে প্রশস্ত স্বর্ণলতা ফিতা ফ্রেম'
    },

    // ── ۱۰ Scenic & Canvas Art Backgrounds ──
    'scenic-mountain-twilight': {
      key: 'scenic-mountain-twilight',
      name: '১১. গোধূলি বেলার পাহাড় (Mountain Twilight)',
      desc: 'গোলাপী ও বেগুনি গোধূলি আকাশের নিচে দূর পাহাড়ের স্তরীভূত ছায়া'
    },
    'scenic-kaaba-parchment': {
      key: 'scenic-kaaba-parchment',
      name: '১২. ভিন্টেজ কাবা পাণ্ডুলিপি (Kaaba Vintage Sketch)',
      desc: 'প্রাচীন পাণ্ডুলিপির ওপর পবিত্র কাবা শরীফ ও মিনারের শৈল্পিক স্কেচ'
    },
    'scenic-rehal-quran': {
      key: 'scenic-rehal-quran',
      name: '১৩. কাঠের রেহাল ও কোরআন (Rehal & Quran Studio)',
      desc: 'কাঠের রেহালে উন্মুক্ত পবিত্র কোরআন ও আধুনিক মিনিমালিস্ট ফ্রেম'
    },
    'scenic-desert-stars': {
      key: 'scenic-desert-stars',
      name: '১৪. তারকাময় মরুভূমি (Desert Dunes & Stars)',
      desc: 'গভীর রাতের তারকাময় আকাশ ও আলোকিত মরু বালিয়াড়ি'
    },
    'scenic-golden-clouds': {
      key: 'scenic-golden-clouds',
      name: '১৫. সোনালী সূর্যাস্ত মেঘমালা (Golden Sunset Clouds)',
      desc: 'গোধূলির সোনালী সূর্যরশ্মি ও মোহময় মেঘমালার আবহ'
    },
    'scenic-mosque-dusk': {
      key: 'scenic-mosque-dusk',
      name: '১৬. গোধূলি মসজিদ গম্বুজ (Mosque Dome at Dusk)',
      desc: 'গভীর নীল গোধূলি আকাশে মহিমান্বিত মসজিদ গম্বুজ ও মিনারের অবয়ব'
    },
    'scenic-medina-sanctuary': {
      key: 'scenic-medina-sanctuary',
      name: '১৭. মদিনার শ্যামলিম প্রাঙ্গণ (Medina Emerald Sanctuary)',
      desc: 'মদিনার শ্যামলিম আবহ, সোনালী নূর ও পবিত্র জ্যামিতিক আভা'
    },
    'scenic-alabaster-gold': {
      key: 'scenic-alabaster-gold',
      name: '১৮. শুভ্র আইভরি ও সোনা (Alabaster Minimal Gold)',
      desc: 'শুভ্র শ্বেতশুভ্র ব্যাকগ্রাউন্ড ও সূক্ষ্ম ২৪ ক্যারেট স্বর্ণালী কারুকাজ'
    },
    'scenic-crimson-horizon': {
      key: 'scenic-crimson-horizon',
      name: '১৯. রক্তিম দামেস্ক দিগন্ত (Crimson Dusk Horizon)',
      desc: 'গোধূলির রক্তিম দিগন্ত ও দূর খেজুরবাগানের ছায়াময় দৃশ্য'
    },
    'scenic-kiswah-night': {
      key: 'scenic-kiswah-night',
      name: '২০. কাবার কালো রেশম (Kiswah Midnight Silk)',
      desc: 'কাবার গিলাফের খাঁটি কালো রেশম ও সোনালী হরফের এমব্রয়ডারি'
    }
  };

  const LAYOUT_KEYS = Object.keys(LAYOUTS);

  // ═════════════════════════════════════════════════════════════════
  // 3. VECTOR GEOMETRY PRIMITIVES (ZERO-GLYPH GUARANTEE)
  // ═════════════════════════════════════════════════════════════════

  /** Draw 8-pointed Islamic Star */
  function drawIslamicStar(ctx, cx, cy, outerR, innerR, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    const points = 16;
    for (let i = 0; i < points; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / 8 - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /** Draw Sunrise Vector Icon */
  function drawSunIcon(ctx, cx, cy, r, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.2;

    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx - r * 1.6, cy + 2);
    ctx.lineTo(cx + r * 1.6, cy + 2);
    ctx.stroke();

    const numRays = 5;
    for (let i = 0; i < numRays; i++) {
      const angle = Math.PI + ((i + 1) * Math.PI) / (numRays + 1);
      const x1 = cx + (r + 3) * Math.cos(angle);
      const y1 = cy + (r + 3) * Math.sin(angle);
      const x2 = cx + (r + 8) * Math.cos(angle);
      const y2 = cy + (r + 8) * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  /** Draw Crescent Moon */
  function drawCrescentMoon(ctx, cx, cy, r, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0.4 * Math.PI, 1.6 * Math.PI, false);
    ctx.bezierCurveTo(
      cx - r * 0.2, cy - r * 0.7,
      cx - r * 0.2, cy + r * 0.7,
      cx + r * Math.cos(0.4 * Math.PI), cy + r * Math.sin(0.4 * Math.PI)
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /** Draw Rounded Rectangle */
  function drawRoundRect(ctx, x, y, w, h, radius, fill, stroke) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
    ctx.restore();
  }

  /** Draw Corner Brackets */
  function drawCornerBrackets(ctx, x, y, w, h, len, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    // Top-Left
    ctx.beginPath(); ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y); ctx.stroke();
    // Top-Right
    ctx.beginPath(); ctx.moveTo(x + w - len, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + len); ctx.stroke();
    // Bottom-Left
    ctx.beginPath(); ctx.moveTo(x, y + h - len); ctx.lineTo(x, y + h); ctx.lineTo(x + len, y + h); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(x + w - len, y + h); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w, y + h - len); ctx.stroke();
    ctx.restore();
  }

  // ═════════════════════════════════════════════════════════════════
  // 4. SCENIC BACKGROUNDS RENDERER (১০টি সিনিক ক্যানভাস)
  // ═════════════════════════════════════════════════════════════════
  function renderScenicBackground(ctx, layoutKey, cardX, cardY, cardW, cardH) {
    ctx.save();
    drawRoundRect(ctx, cardX, cardY, cardW, cardH, 20);
    ctx.clip();

    switch (layoutKey) {
      // 11. Mountain Twilight
      case 'scenic-mountain-twilight': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#E76F51');
        sky.addColorStop(0.25, '#C7517E');
        sky.addColorStop(0.55, '#56357A');
        sky.addColorStop(0.85, '#1B1A47');
        sky.addColorStop(1, '#0C0C24');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Mountain Ridges
        ctx.fillStyle = 'rgba(40, 24, 75, 0.6)';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH - 140);
        ctx.bezierCurveTo(cardX + 200, cardY + cardH - 260, cardX + 450, cardY + cardH - 160, cardX + 650, cardY + cardH - 240);
        ctx.bezierCurveTo(cardX + 800, cardY + cardH - 290, cardX + 900, cardY + cardH - 180, cardX + cardW, cardY + cardH - 210);
        ctx.lineTo(cardX + cardW, cardY + cardH); ctx.lineTo(cardX, cardY + cardH);
        ctx.fill();

        ctx.fillStyle = '#0B0818';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH - 40);
        ctx.bezierCurveTo(cardX + 300, cardY + cardH - 90, cardX + 600, cardY + cardH - 50, cardX + cardW, cardY + cardH - 85);
        ctx.lineTo(cardX + cardW, cardY + cardH);
        ctx.fill();
        break;
      }

      // 12. Kaaba Vintage Parchment
      case 'scenic-kaaba-parchment': {
        const bg = ctx.createRadialGradient(W / 2, H / 2, 120, W / 2, H / 2, 540);
        bg.addColorStop(0, '#FAF5EC');
        bg.addColorStop(0.6, '#F2E8D7');
        bg.addColorStop(1, '#E2D1B8');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Kaaba Sketch at top
        const kX = W / 2;
        const kY = cardY + 70;
        ctx.save();
        ctx.strokeStyle = 'rgba(109, 76, 39, 0.45)';
        ctx.fillStyle = 'rgba(109, 76, 39, 0.1)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(kX, kY + 28); ctx.lineTo(kX - 30, kY + 12); ctx.lineTo(kX - 30, kY - 20); ctx.lineTo(kX, kY - 6); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(kX, kY + 28); ctx.lineTo(kX + 30, kY + 12); ctx.lineTo(kX + 30, kY - 20); ctx.lineTo(kX, kY - 6); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(kX, kY - 6); ctx.lineTo(kX - 30, kY - 20); ctx.lineTo(kX, kY - 34); ctx.lineTo(kX + 30, kY - 20); ctx.closePath();
        ctx.fill(); ctx.stroke();
        ctx.restore();
        break;
      }

      // 13. Rehal & Quran Studio
      case 'scenic-rehal-quran': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#383236');
        bg.addColorStop(0.5, '#252023');
        bg.addColorStop(1, '#151214');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Rehal Cross at top
        const rX = W / 2;
        const rY = cardY + 70;
        ctx.save();
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(rX - 35, rY + 25); ctx.lineTo(rX + 35, rY);
        ctx.moveTo(rX + 35, rY + 25); ctx.lineTo(rX - 35, rY);
        ctx.stroke();
        ctx.restore();
        break;
      }

      // 14. Desert Dunes & Starfield
      case 'scenic-desert-stars': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#060A18');
        sky.addColorStop(0.4, '#0F1838');
        sky.addColorStop(0.7, '#1E234D');
        sky.addColorStop(1, '#0C0A14');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Starfield dots
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        const stars = [
          [120, 90, 1.6], [240, 130, 1.2], [380, 75, 2.0], [520, 120, 1.4], [700, 90, 1.8], [850, 110, 1.5],
          [180, 200, 1.3], [310, 260, 1.7], [490, 220, 1.2], [660, 250, 2.2], [820, 210, 1.3]
        ];
        stars.forEach(([sx, sy, sr]) => {
          ctx.beginPath();
          ctx.arc(cardX + sx * (cardW / 1000), cardY + sy * (cardH / 1000), sr, 0, Math.PI * 2);
          ctx.fill();
        });
        drawCrescentMoon(ctx, cardX + cardW - 120, cardY + 95, 20, '#F5D77F');
        ctx.restore();

        // Sand Dunes
        ctx.fillStyle = 'rgba(38, 24, 16, 0.9)';
        ctx.beginPath();
        ctx.moveTo(cardX, cardY + cardH - 120);
        ctx.bezierCurveTo(cardX + 240, cardY + cardH - 190, cardX + 500, cardY + cardH - 130, cardX + 720, cardY + cardH - 180);
        ctx.bezierCurveTo(cardX + 860, cardY + cardH - 210, cardX + 930, cardY + cardH - 150, cardX + cardW, cardY + cardH - 160);
        ctx.lineTo(cardX + cardW, cardY + cardH); ctx.lineTo(cardX, cardY + cardH);
        ctx.fill();
        break;
      }

      // 15. Golden Sunset Clouds
      case 'scenic-golden-clouds': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#F59E0B');
        bg.addColorStop(0.35, '#EA580C');
        bg.addColorStop(0.65, '#991B1B');
        bg.addColorStop(0.9, '#450A0A');
        bg.addColorStop(1, '#1C0608');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Sunburst Glow
        const sun = ctx.createRadialGradient(W / 2, cardY + cardH - 160, 20, W / 2, cardY + cardH - 160, 360);
        sun.addColorStop(0, 'rgba(254, 243, 199, 0.55)');
        sun.addColorStop(0.4, 'rgba(245, 158, 11, 0.35)');
        sun.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = sun;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 16. Mosque Dome at Dusk
      case 'scenic-mosque-dusk': {
        const sky = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        sky.addColorStop(0, '#0A1128');
        sky.addColorStop(0.4, '#1C2541');
        sky.addColorStop(0.7, '#3A506B');
        sky.addColorStop(1, '#0B132B');
        ctx.fillStyle = sky;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Mosque Dome Silhouette at bottom
        const mX = W / 2;
        const mY = cardY + cardH;
        ctx.save();
        ctx.fillStyle = '#060B18';
        ctx.beginPath();
        ctx.arc(mX, mY - 40, 110, Math.PI, 0);
        ctx.lineTo(mX + 110, mY); ctx.lineTo(mX - 110, mY);
        ctx.fill();

        ctx.strokeStyle = '#F5D77F';
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(mX, mY - 150); ctx.lineTo(mX, mY - 180); ctx.stroke();
        drawCrescentMoon(ctx, mX, mY - 186, 8, '#F5D77F');
        ctx.restore();
        break;
      }

      // 17. Medina Emerald Sanctuary
      case 'scenic-medina-sanctuary': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#011F16');
        bg.addColorStop(0.5, '#053E2C');
        bg.addColorStop(1, '#021811');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        const halo = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 450);
        halo.addColorStop(0, 'rgba(46, 213, 115, 0.12)');
        halo.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
        halo.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
        ctx.fillStyle = halo;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 18. Alabaster Minimal Gold
      case 'scenic-alabaster-gold': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#FFFFFF');
        bg.addColorStop(0.5, '#F8FAFC');
        bg.addColorStop(1, '#F1F5F9');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 19. Crimson Dusk Horizon
      case 'scenic-crimson-horizon': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#38060E');
        bg.addColorStop(0.4, '#7F1D1D');
        bg.addColorStop(0.7, '#991B1B');
        bg.addColorStop(0.9, '#450A0A');
        bg.addColorStop(1, '#1A0407');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);
        break;
      }

      // 20. Kiswah Midnight Silk
      case 'scenic-kiswah-night': {
        const bg = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
        bg.addColorStop(0, '#07080A');
        bg.addColorStop(0.5, '#12141A');
        bg.addColorStop(1, '#08090C');
        ctx.fillStyle = bg;
        ctx.fillRect(cardX, cardY, cardW, cardH);

        // Gold-Thread band at top
        const bandY = cardY + 60;
        const bandH = 34;
        ctx.fillStyle = 'rgba(212, 175, 55, 0.16)';
        ctx.fillRect(cardX + 24, bandY, cardW - 48, bandH);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 1.8;
        ctx.strokeRect(cardX + 24, bandY, cardW - 48, bandH);
        break;
      }
    }

    // Subtle dark reading vignette for scenic backgrounds to ensure high contrast
    if (layoutKey !== 'scenic-kaaba-parchment' && layoutKey !== 'scenic-alabaster-gold') {
      const vig = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 500);
      vig.addColorStop(0, 'rgba(0, 0, 0, 0.25)');
      vig.addColorStop(1, 'rgba(0, 0, 0, 0.65)');
      ctx.fillStyle = vig;
      ctx.fillRect(cardX, cardY, cardW, cardH);
    }

    ctx.restore();
  }

  // ═════════════════════════════════════════════════════════════════
  // 5. ARCHITECTURAL FRAMES RENDERER (১০টি ফ্রেম)
  // ═════════════════════════════════════════════════════════════════
  function renderArchitecturalFrame(ctx, layoutKey, cardX, cardY, cardW, cardH, theme) {
    ctx.save();

    switch (layoutKey) {
      // 1. Mihrab Sanctuary Arch
      case 'mihrab-arch': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        const archL = cardX + 85;
        const archR = cardX + cardW - 85;
        const archBase = cardY + 280;
        const archApex = cardY + 45;
        ctx.beginPath();
        ctx.moveTo(archL, archBase);
        ctx.lineTo(archL, cardY + 140);
        ctx.bezierCurveTo(archL - 10, archApex + 20, W / 2 - 60, archApex - 12, W / 2, archApex - 12);
        ctx.bezierCurveTo(W / 2 + 60, archApex - 12, archR + 10, archApex + 20, archR, cardY + 140);
        ctx.lineTo(archR, archBase);
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 36, theme.primaryGold);
        break;
      }

      // 2. Royal Modern Luxury
      case 'royal-minimal': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1.8;
        ctx.strokeRect(cardX + 20, cardY + 20, cardW - 40, cardH - 40);

        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1;
        ctx.strokeRect(cardX + 28, cardY + 28, cardW - 56, cardH - 56);

        const corners = [
          [cardX + 24, cardY + 24],
          [cardX + cardW - 24, cardY + 24],
          [cardX + 24, cardY + cardH - 24],
          [cardX + cardW - 24, cardY + cardH - 24]
        ];
        corners.forEach(([cx, cy]) => {
          ctx.fillStyle = theme.primaryGold;
          ctx.fillRect(cx - 3, cy - 3, 6, 6);
        });
        break;
      }

      // 3. Sacred Rosette & Mandala
      case 'geometric-mandala': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 38, theme.primaryGold);
        break;
      }

      // 4. Illuminated Manuscript
      case 'illuminated-manuscript': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2.5;
        drawRoundRect(ctx, cardX + 14, cardY + 14, cardW - 28, cardH - 28, 14);
        ctx.stroke();

        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1;
        drawRoundRect(ctx, cardX + 22, cardY + 22, cardW - 44, cardH - 44, 10);
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 42, theme.primaryGold);
        break;
      }

      // 5. Ottoman Iznik Border
      case 'iznik-tiles': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1.5;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        const step = 60;
        for (let x = cardX + 60; x <= cardX + cardW - 60; x += step) {
          drawIslamicStar(ctx, x, cardY + 24, 3, 1.5, theme.primaryGold);
          drawIslamicStar(ctx, x, cardY + cardH - 24, 3, 1.5, theme.primaryGold);
        }
        for (let y = cardY + 60; y <= cardY + cardH - 60; y += step) {
          drawIslamicStar(ctx, cardX + 24, y, 3, 1.5, theme.primaryGold);
          drawIslamicStar(ctx, cardX + cardW - 24, y, 3, 1.5, theme.primaryGold);
        }
        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 36, theme.primaryGold);
        break;
      }

      // 6. Royal Twin Pillars
      case 'architectural-pillars': {
        const pLeft = cardX + 45;
        const pRight = cardX + cardW - 45;
        const pTop = cardY + 35;
        const pBottom = cardY + cardH - 35;

        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(pLeft - 8, pTop, 16, pBottom - pTop);
        ctx.strokeRect(pRight - 8, pTop, 16, pBottom - pTop);

        ctx.beginPath();
        ctx.moveTo(pLeft + 8, pTop);
        ctx.bezierCurveTo(pLeft + 80, pTop - 20, pRight - 80, pTop - 20, pRight - 8, pTop);
        ctx.stroke();
        break;
      }

      // 7. Celestial Crescent
      case 'celestial-crescent': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 34, theme.primaryGold);
        break;
      }

      // 8. Alhambra Arabesque
      case 'alhambra-palace': {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();

        drawCornerBrackets(ctx, cardX + 30, cardY + 30, cardW - 60, cardH - 60, 40, theme.primaryGold);
        break;
      }

      // 9. Rub el Hizb Octagram Seal
      case 'octagram-medallion': {
        const ch = 24;
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cardX + ch, cardY);
        ctx.lineTo(cardX + cardW - ch, cardY);
        ctx.lineTo(cardX + cardW, cardY + ch);
        ctx.lineTo(cardX + cardW, cardY + cardH - ch);
        ctx.lineTo(cardX + cardW - ch, cardY + cardH);
        ctx.lineTo(cardX + ch, cardY + cardH);
        ctx.lineTo(cardX, cardY + cardH - ch);
        ctx.lineTo(cardX, cardY + ch);
        ctx.closePath();
        ctx.stroke();
        break;
      }

      // 10. Kiswah Silk Ribbon
      case 'kiswah-gold-ribbon':
      default: {
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(cardX + 16, cardY + 16, cardW - 32, cardH - 32);

        ctx.strokeStyle = theme.subtleLine;
        ctx.lineWidth = 1;
        ctx.strokeRect(cardX + 24, cardY + 24, cardW - 48, cardH - 48);

        drawCornerBrackets(ctx, cardX + 32, cardY + 32, cardW - 64, cardH - 64, 40, theme.primaryGold);
        break;
      }
    }

    ctx.restore();
  }

  // ═════════════════════════════════════════════════════════════════
  // 6. MAIN RENDER FUNCTION (THEMES × LAYOUTS)
  // ═════════════════════════════════════════════════════════════════
  function render(ctx, data, options = {}) {
    const themeKey = options.theme || 'royal-emerald';
    const layoutKey = options.layout || 'mihrab-arch';

    let T = Object.assign({}, THEMES[themeKey] || THEMES['royal-emerald']);
    const L = LAYOUTS[layoutKey] || LAYOUTS['mihrab-arch'];

    // ── DYNAMIC CONTRAST ENGINE ──
    // Ensures text is ALWAYS 100% crisp, legible, and high-contrast
    if (layoutKey === 'scenic-alabaster-gold') {
      // Pure White / Alabaster Gold scenic canvas -> High-contrast dark typography
      T = Object.assign({}, T, {
        cardBg: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(15, 23, 42, 0.22)',
        subtleLine: 'rgba(15, 23, 42, 0.12)',
        badgeBg: 'rgba(217, 119, 6, 0.12)',
        badgeBorder: 'rgba(217, 119, 6, 0.35)',
        badgeText: '#92400E',
        primaryGold: '#064E3B',    // Deep majestic emerald
        secondaryGold: '#B45309',  // Deep warm amber
        accentGold: '#0F172A',     // Crisp dark slate for main headings
        textColor: '#0F172A',      // High contrast dark text for calendar boxes
        subTextColor: '#334155',   // Deep slate for sub-text
        highlightColor: '#064E3B', // Rich emerald
        sunColor: '#D97706',
        isDark: false
      });
    } else if (layoutKey === 'scenic-kaaba-parchment') {
      // Vintage Parchment Sketch canvas -> High-contrast warm charcoal / deep brown typography
      T = Object.assign({}, T, {
        cardBg: 'rgba(255, 253, 247, 0.88)',
        borderColor: 'rgba(109, 76, 39, 0.38)',
        subtleLine: 'rgba(109, 76, 39, 0.18)',
        badgeBg: 'rgba(109, 76, 39, 0.12)',
        badgeBorder: 'rgba(109, 76, 39, 0.35)',
        badgeText: '#4A3219',
        primaryGold: '#6D4C27',
        secondaryGold: '#8B6538',
        accentGold: '#2B1A0E',     // Deep antique brown
        textColor: '#1A120B',      // Deep charcoal
        subTextColor: '#422814',   // Rich brown
        highlightColor: '#2B1A0E',
        sunColor: '#B45309',
        isDark: false
      });
    } else if (!T.isDark) {
      // Light themes (warm-parchment, classic-ivory)
      T = Object.assign({}, T, {
        cardBg: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(148, 110, 38, 0.38)',
        subtleLine: 'rgba(148, 110, 38, 0.18)',
        badgeBg: 'rgba(148, 110, 38, 0.1)',
        badgeBorder: 'rgba(148, 110, 38, 0.32)',
        badgeText: '#705315',
        textColor: '#1A120B',
        subTextColor: '#3F2D1D',
        highlightColor: '#1A120B',
        accentGold: '#2B1E14',
        primaryGold: '#8C6721',
        secondaryGold: '#6A4A0E'
      });
    } else if (layoutKey.startsWith('scenic-')) {
      // All other photo-scenic backgrounds (mountains, stars, dusk, clouds, etc.)
      T = Object.assign({}, T, {
        cardBg: 'rgba(15, 23, 42, 0.72)',
        borderColor: 'rgba(255, 255, 255, 0.32)',
        subtleLine: 'rgba(255, 255, 255, 0.18)',
        badgeBg: 'rgba(255, 255, 255, 0.16)',
        badgeBorder: 'rgba(255, 255, 255, 0.35)',
        badgeText: '#FFFBEB',
        primaryGold: '#FDE68A',
        secondaryGold: '#F59E0B',
        accentGold: '#FFFFFF',
        textColor: '#FFFFFF',
        subTextColor: '#E2E8F0',
        highlightColor: '#FDE68A',
        sunColor: '#F59E0B',
        isDark: true
      });
    }

    const cardMargin = 40;
    const cardX = cardMargin;
    const cardY = cardMargin;
    const cardW = W - cardMargin * 2;
    const cardH = H - cardMargin * 2;

    // ── A. Render Background ──
    if (layoutKey.startsWith('scenic-')) {
      // 10 Scenic & Image Backgrounds
      renderScenicBackground(ctx, layoutKey, cardX, cardY, cardW, cardH);

      // Add double border for alabaster & parchment scenic frames
      if (layoutKey === 'scenic-alabaster-gold' || layoutKey === 'scenic-kaaba-parchment') {
        ctx.save();
        ctx.strokeStyle = layoutKey === 'scenic-alabaster-gold' ? 'rgba(212, 175, 55, 0.65)' : 'rgba(109, 76, 39, 0.45)';
        ctx.lineWidth = 1.6;
        drawRoundRect(ctx, cardX + 16, cardY + 16, cardW - 32, cardH - 32, 16);
        ctx.stroke();
        drawRoundRect(ctx, cardX + 22, cardY + 22, cardW - 44, cardH - 44, 12);
        ctx.stroke();
        drawCornerBrackets(ctx, cardX + 28, cardY + 28, cardW - 56, cardH - 56, 26, '#D4AF37');
        ctx.restore();
      }
    } else {
      // 10 Architectural Theme Gradient Backgrounds
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, T.bgGrad[0]);
      grad.addColorStop(0.5, T.bgGrad[1]);
      grad.addColorStop(1, T.bgGrad[2]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Ambient radial lighting
      const radial = ctx.createRadialGradient(W / 2, 280, 50, W / 2, 280, 520);
      radial.addColorStop(0, T.isDark ? 'rgba(243, 205, 116, 0.12)' : 'rgba(255, 255, 255, 0.45)');
      radial.addColorStop(1, 'transparent');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, W, H);

      // Render Architectural Frame
      renderArchitecturalFrame(ctx, layoutKey, cardX, cardY, cardW, cardH, T);
    }

    // ── B. Header Area: Greetings ──
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 1. "আসসালামুআলাইকুম"
    ctx.fillStyle = T.primaryGold;
    ctx.font = 'bold 34px "Hind Siliguri", "Amiri", sans-serif';
    ctx.fillText(data.greetingHeader || 'আসসালামুআলাইকুম', W / 2, 104);

    // Decorative ornament line under Salam
    drawIslamicStar(ctx, W / 2, 132, 6.5, 3, T.secondaryGold);
    ctx.strokeStyle = T.borderColor;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 110, 132);
    ctx.lineTo(W / 2 - 20, 132);
    ctx.moveTo(W / 2 + 20, 132);
    ctx.lineTo(W / 2 + 110, 132);
    ctx.stroke();

    // 2. "শুভ সকাল" (Badge)
    const badgeW = 190;
    const badgeH = 40;
    const badgeX = (W - badgeW) / 2;
    const badgeY = 152;

    ctx.fillStyle = T.badgeBg;
    ctx.strokeStyle = T.badgeBorder;
    ctx.lineWidth = 1.5;
    drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 20, true, true);

    ctx.fillStyle = T.badgeText || (T.isDark ? T.accentGold : T.primaryGold);
    ctx.font = '600 22px "Hind Siliguri", sans-serif';
    ctx.fillText(data.greetingSub || 'শুভ সকাল', W / 2, badgeY + badgeH / 2 + 2);

    // ── C. Hero Section: আজ [বারের নাম] ──
    const todayLine = data.gregorian ? data.gregorian.todayLine : 'আজ বৃহস্পতিবার';
    ctx.fillStyle = T.accentGold;
    ctx.font = 'bold 48px "Hind Siliguri", sans-serif';
    ctx.fillText(todayLine, W / 2, 236);

    // ── D. Three Calendar Boxes (ত্রয়ী ক্যালেন্ডার) ──
    const calBoxW = 900;
    const calBoxH = 62;
    const calBoxX = (W - calBoxW) / 2;
    const calStartY = 282;
    const calGap = 12;

    const calendars = [
      {
        icon: 'moon',
        label: 'হিজরী',
        text: data.hijri ? data.hijri.formattedText : '২৪ জমাদিউল আউয়াল ১৪৪৮ হিজরী'
      },
      {
        icon: 'bangla',
        label: 'বঙ্গাব্দ',
        text: data.bangla ? data.bangla.formattedText : '২০ এ কার্তিক ১৪৩৩ বঙ্গাব্দ'
      },
      {
        icon: 'sun',
        label: 'খ্রীষ্টাব্দ',
        text: data.gregorian ? data.gregorian.formattedText : '০৫ নভেম্বর ২০২৬ খ্রীষ্টাব্দ'
      }
    ];

    calendars.forEach((cal, i) => {
      const curY = calStartY + i * (calBoxH + calGap);

      ctx.fillStyle = T.cardBg;
      ctx.strokeStyle = T.borderColor;
      ctx.lineWidth = 1.2;
      drawRoundRect(ctx, calBoxX, curY, calBoxW, calBoxH, 14, true, true);

      const iconCenterX = calBoxX + 44;
      const iconCenterY = curY + calBoxH / 2;
      if (cal.icon === 'moon') {
        drawCrescentMoon(ctx, iconCenterX, iconCenterY, 13, T.primaryGold);
      } else if (cal.icon === 'sun') {
        drawSunIcon(ctx, iconCenterX, iconCenterY + 2, 9, T.sunColor);
      } else {
        drawIslamicStar(ctx, iconCenterX, iconCenterY, 12, 5.5, T.primaryGold);
      }

      ctx.fillStyle = T.secondaryGold;
      ctx.beginPath();
      ctx.arc(calBoxX + 80, iconCenterY, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.textAlign = 'left';
      ctx.font = '600 28px "Hind Siliguri", sans-serif';
      ctx.fillStyle = T.textColor;
      ctx.fillText(cal.text, calBoxX + 104, iconCenterY + 2);
    });

    // ── E. Solar & Season Section ──
    const sunBoxY = 518;
    const sunBoxH = 102;

    ctx.fillStyle = T.cardBg;
    ctx.strokeStyle = T.borderColor;
    ctx.lineWidth = 1.2;
    drawRoundRect(ctx, calBoxX, sunBoxY, calBoxW, sunBoxH, 16, true, true);

    const sunLine = data.sun ? data.sun.formattedLine : 'সূর্যোদয়-৬:০৬ ও সূর্যাস্ত-৫:১৮(ঢাকা)';
    ctx.textAlign = 'center';
    ctx.font = 'bold 29px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.highlightColor;
    ctx.fillText(sunLine, W / 2, sunBoxY + 34);

    ctx.strokeStyle = T.subtleLine;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 240, sunBoxY + 58);
    ctx.lineTo(W / 2 + 240, sunBoxY + 58);
    ctx.stroke();

    const seasonLine = data.bangla ? data.bangla.seasonLine : 'এখন হেমন্তকাল';
    ctx.font = '600 24px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.subTextColor;
    ctx.fillText(seasonLine, W / 2, sunBoxY + 80);

    // ── F. Blessings & Reminders ──
    const blessStartY = 675;
    const blessings = data.blessings || [
      'সময়মত নামাজ পড়ুন',
      'সর্বদা আল্লাহকে স্মরণ করুন',
      'আনন্দময় কাটুক আপনার সারাদিন।'
    ];

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '500 27px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.subTextColor;
    ctx.fillText(blessings[0], W / 2, blessStartY);
    ctx.fillText(blessings[1], W / 2, blessStartY + 44);

    ctx.font = '600 30px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.accentGold;
    ctx.fillText(blessings[2], W / 2, blessStartY + 92);

    // ── G. Footer: Left (Company), Center (Tagline), Right (Website URL) ──
    const footerY = cardY + cardH - 50; // = 990
    const dividerY = footerY - 24;      // = 966

    ctx.save();
    ctx.strokeStyle = T.borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cardX + 70, dividerY);
    ctx.lineTo(W / 2 - 25, dividerY);
    ctx.moveTo(W / 2 + 25, dividerY);
    ctx.lineTo(cardX + cardW - 70, dividerY);
    ctx.stroke();
    drawIslamicStar(ctx, W / 2, dividerY, 6, 2.8, T.secondaryGold);

    ctx.textBaseline = 'middle';

    // ১. বামে: Royal Today
    ctx.textAlign = 'left';
    ctx.font = 'bold 21px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.primaryGold;
    ctx.fillText('Royal Today', cardX + 75, footerY);

    // ২. মাঝে: আজকের দিন, আজকের তথ্য
    ctx.textAlign = 'center';
    ctx.font = '500 18px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.subTextColor;
    ctx.fillText('আজকের দিন, আজকের তথ্য', W / 2, footerY);

    // ৩. ডানে: ওয়েবসাইটের URL (www.royaltechbd.com)
    ctx.textAlign = 'right';
    ctx.font = 'bold 19px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.secondaryGold || T.primaryGold;
    ctx.fillText('www.royaltechbd.com', cardX + cardW - 75, footerY);

    ctx.restore();

    return ctx;
  }

  return {
    THEMES: THEMES,
    THEME_KEYS: THEME_KEYS,
    LAYOUTS: LAYOUTS,
    LAYOUT_KEYS: LAYOUT_KEYS,
    render: render
  };
});
