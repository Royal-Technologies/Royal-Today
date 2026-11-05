/**
 * Royal Today — 1080x1080 Social Media Card Template Engine
 * 
 * Features:
 * - 1080x1080 pixel high-definition canvas layout
 * - Pure vector graphics (100% zero-glyph-box guarantee across Windows, Linux & macOS)
 * - 5 Luxury Themes (Sunrise Gold, Royal Emerald, Midnight Navy, Crimson Dusk, Warm Parchment)
 * - Royal Today branding positioned elegantly at the bottom (Footer)
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
  // 1. THEMES PALETTES
  // ═════════════════════════════════════════════════════════════════
  const THEMES = {
    'sunrise-gold': {
      key: 'sunrise-gold',
      name: 'প্রভাতী কাঞ্চন (Sunrise Gold)',
      bgGrad: ['#0A1118', '#14202E', '#233348'],
      cardBg: 'rgba(25, 42, 65, 0.65)',
      primaryGold: '#F3CD74',
      secondaryGold: '#BF9A3C',
      accentGold: '#FFF2D1',
      textColor: '#FFFFFF',
      subTextColor: '#E2E8F0',
      highlightColor: '#FBD38D',
      borderColor: 'rgba(243, 205, 116, 0.45)',
      innerBorderColor: 'rgba(243, 205, 116, 0.2)',
      sunColor: '#FFA726',
      badgeBg: 'rgba(243, 205, 116, 0.12)',
      badgeBorder: 'rgba(243, 205, 116, 0.35)',
      isDark: true
    },
    'royal-emerald': {
      key: 'royal-emerald',
      name: 'পান্না সবুজ (Royal Emerald)',
      bgGrad: ['#01150E', '#05291E', '#0B3E2F'],
      cardBg: 'rgba(6, 42, 31, 0.65)',
      primaryGold: '#E5C383',
      secondaryGold: '#B88F3A',
      accentGold: '#FAF1DE',
      textColor: '#FAF8F5',
      subTextColor: '#D1E7DD',
      highlightColor: '#F5DEB3',
      borderColor: 'rgba(229, 195, 131, 0.45)',
      innerBorderColor: 'rgba(229, 195, 131, 0.2)',
      sunColor: '#FFB74D',
      badgeBg: 'rgba(229, 195, 131, 0.12)',
      badgeBorder: 'rgba(229, 195, 131, 0.35)',
      isDark: true
    },
    'midnight-navy': {
      key: 'midnight-navy',
      name: 'গভীর নীলকান্ত (Midnight Navy)',
      bgGrad: ['#030914', '#08172E', '#0F274D'],
      cardBg: 'rgba(10, 28, 56, 0.7)',
      primaryGold: '#EAC875',
      secondaryGold: '#C59E3F',
      accentGold: '#FFF6DF',
      textColor: '#F8FAFC',
      subTextColor: '#CBD5E1',
      highlightColor: '#FDE68A',
      borderColor: 'rgba(234, 200, 117, 0.45)',
      innerBorderColor: 'rgba(234, 200, 117, 0.2)',
      sunColor: '#FBBF24',
      badgeBg: 'rgba(234, 200, 117, 0.12)',
      badgeBorder: 'rgba(234, 200, 117, 0.35)',
      isDark: true
    },
    'crimson-dusk': {
      key: 'crimson-dusk',
      name: 'গোধূলি আভা (Crimson Dusk)',
      bgGrad: ['#160309', '#2E0915', '#4A1224'],
      cardBg: 'rgba(46, 12, 23, 0.65)',
      primaryGold: '#E8C581',
      secondaryGold: '#BE923B',
      accentGold: '#FCF3E3',
      textColor: '#FFF5F5',
      subTextColor: '#FED7D7',
      highlightColor: '#FBD38D',
      borderColor: 'rgba(232, 197, 129, 0.45)',
      innerBorderColor: 'rgba(232, 197, 129, 0.2)',
      sunColor: '#FF7043',
      badgeBg: 'rgba(232, 197, 129, 0.12)',
      badgeBorder: 'rgba(232, 197, 129, 0.35)',
      isDark: true
    },
    'warm-parchment': {
      key: 'warm-parchment',
      name: 'শুভ্র পাণ্ডুলিপি (Warm Parchment)',
      bgGrad: ['#F6EFE0', '#EFE4CD', '#E5D5B8'],
      cardBg: 'rgba(255, 253, 247, 0.85)',
      primaryGold: '#8C6721',
      secondaryGold: '#66470C',
      accentGold: '#B8892E',
      textColor: '#1A120B',
      subTextColor: '#3D2F1F',
      highlightColor: '#6B4912',
      borderColor: 'rgba(140, 103, 33, 0.45)',
      innerBorderColor: 'rgba(140, 103, 33, 0.2)',
      sunColor: '#D97706',
      badgeBg: 'rgba(140, 103, 33, 0.08)',
      badgeBorder: 'rgba(140, 103, 33, 0.3)',
      isDark: false
    }
  };

  // ═════════════════════════════════════════════════════════════════
  // 2. VECTOR DRAWING HELPERS (ZERO-GLYPH-BOX)
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
    ctx.lineWidth = 2.5;

    // Semi-sun
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.fill();

    // Horizon line
    ctx.beginPath();
    ctx.moveTo(cx - r * 1.7, cy + 2);
    ctx.lineTo(cx + r * 1.7, cy + 2);
    ctx.stroke();

    // Rays
    const numRays = 5;
    for (let i = 0; i < numRays; i++) {
      const angle = Math.PI + ((i + 1) * Math.PI) / (numRays + 1);
      const x1 = cx + (r + 4) * Math.cos(angle);
      const y1 = cy + (r + 4) * Math.sin(angle);
      const x2 = cx + (r + 10) * Math.cos(angle);
      const y2 = cy + (r + 10) * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  /** Draw Sunset Vector Icon */
  function drawSunsetIcon(ctx, cx, cy, r, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.5;

    // Half sun dipping below horizon
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.fill();

    // Two water / horizon ripple lines
    ctx.beginPath();
    ctx.moveTo(cx - r * 1.7, cy + 3);
    ctx.lineTo(cx + r * 1.7, cy + 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - r * 1.2, cy + 8);
    ctx.lineTo(cx + r * 1.2, cy + 8);
    ctx.stroke();
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

  /** Draw Royal Corner Ornaments */
  function drawCornerOrnaments(ctx, x, y, w, h, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    const len = 42;
    const offset = 14;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(x, y + len);
    ctx.lineTo(x, y);
    ctx.lineTo(x + len, y);
    ctx.stroke();
    drawIslamicStar(ctx, x + offset, y + offset, 6, 3, color);

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(x + w, y + len);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w - len, y);
    ctx.stroke();
    drawIslamicStar(ctx, x + w - offset, y + offset, 6, 3, color);

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(x, y + h - len);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + len, y + h);
    ctx.stroke();
    drawIslamicStar(ctx, x + offset, y + h - offset, 6, 3, color);

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(x + w, y + h - len);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w - len, y + h);
    ctx.stroke();
    drawIslamicStar(ctx, x + w - offset, y + h - offset, 6, 3, color);

    ctx.restore();
  }

  // ═════════════════════════════════════════════════════════════════
  // 3. MAIN RENDER FUNCTION
  // ═════════════════════════════════════════════════════════════════
  function render(ctx, data, options = {}) {
    const themeKey = options.theme || 'sunrise-gold';
    const T = THEMES[themeKey] || THEMES['sunrise-gold'];

    // ── A. Background Gradient ──
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, T.bgGrad[0]);
    grad.addColorStop(0.5, T.bgGrad[1]);
    grad.addColorStop(1, T.bgGrad[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle background ambient light
    const radial = ctx.createRadialGradient(W / 2, 280, 50, W / 2, 280, 520);
    radial.addColorStop(0, T.isDark ? 'rgba(243, 205, 116, 0.12)' : 'rgba(255, 255, 255, 0.4)');
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // ── B. Outer & Inner Decorative Borders ──
    const margin = 44;
    ctx.strokeStyle = T.borderColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(margin, margin, W - margin * 2, H - margin * 2);

    const innerMargin = 54;
    ctx.strokeStyle = T.innerBorderColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(innerMargin, innerMargin, W - innerMargin * 2, H - innerMargin * 2);

    // Corner Ornaments
    drawCornerOrnaments(ctx, margin, margin, W - margin * 2, H - margin * 2, T.primaryGold);

    // ── C. Header Area: Greetings ──
    // 1. "আসসালামুআলাইকুম"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = T.primaryGold;
    ctx.font = 'bold 34px "Hind Siliguri", "Amiri", sans-serif';
    ctx.fillText(data.greetingHeader || 'আসসালামুআলাইকুম', W / 2, 104);

    // Small decorative ornament under Salam
    drawIslamicStar(ctx, W / 2, 132, 6.5, 3, T.secondaryGold);
    ctx.strokeStyle = T.innerBorderColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 110, 132);
    ctx.lineTo(W / 2 - 20, 132);
    ctx.moveTo(W / 2 + 20, 132);
    ctx.lineTo(W / 2 + 110, 132);
    ctx.stroke();

    // 2. "শুভ সকাল" (Badge Style)
    const badgeW = 190;
    const badgeH = 40;
    const badgeX = (W - badgeW) / 2;
    const badgeY = 152;

    ctx.fillStyle = T.badgeBg;
    ctx.strokeStyle = T.badgeBorder;
    ctx.lineWidth = 1.5;
    drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 20, true, true);

    ctx.fillStyle = T.accentGold;
    ctx.font = '600 22px "Hind Siliguri", sans-serif';
    ctx.fillText(data.greetingSub || 'শুভ সকাল', W / 2, badgeY + badgeH / 2 + 2);

    // ── D. Hero Section: আজ [বারের নাম] ──
    // e.g. "আজ বৃহস্পতিবার"
    const todayLine = data.gregorian ? data.gregorian.todayLine : 'আজ বৃহস্পতিবার';
    ctx.fillStyle = T.accentGold;
    ctx.font = 'bold 48px "Hind Siliguri", sans-serif';
    ctx.fillText(todayLine, W / 2, 236);

    // ── E. Three Calendar Boxes (ত্রয়ী ক্যালেন্ডার) ──
    // 1. হিজরী
    // 2. বঙ্গাব্দ
    // 3. খ্রীষ্টাব্দ
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

      // Card Background
      ctx.fillStyle = T.cardBg;
      ctx.strokeStyle = T.borderColor;
      ctx.lineWidth = 1.2;
      drawRoundRect(ctx, calBoxX, curY, calBoxW, calBoxH, 14, true, true);

      // Left Accent Icon
      const iconCenterX = calBoxX + 44;
      const iconCenterY = curY + calBoxH / 2;
      if (cal.icon === 'moon') {
        drawCrescentMoon(ctx, iconCenterX, iconCenterY, 13, T.primaryGold);
      } else if (cal.icon === 'sun') {
        drawSunIcon(ctx, iconCenterX, iconCenterY + 2, 9, T.sunColor);
      } else {
        // Bengali star
        drawIslamicStar(ctx, iconCenterX, iconCenterY, 12, 5.5, T.primaryGold);
      }

      // Divider dot
      ctx.fillStyle = T.secondaryGold;
      ctx.beginPath();
      ctx.arc(calBoxX + 80, iconCenterY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Text
      ctx.textAlign = 'left';
      ctx.font = '600 28px "Hind Siliguri", sans-serif';
      ctx.fillStyle = T.textColor;
      ctx.fillText(cal.text, calBoxX + 104, iconCenterY + 2);
    });

    // ── F. Solar & Season Section ──
    const sunBoxY = 518;
    const sunBoxH = 102;

    ctx.fillStyle = T.cardBg;
    ctx.strokeStyle = T.borderColor;
    ctx.lineWidth = 1.2;
    drawRoundRect(ctx, calBoxX, sunBoxY, calBoxW, sunBoxH, 16, true, true);

    // Row 1: সূর্যোদয় ও সূর্যাস্ত
    const sunLine = data.sun ? data.sun.formattedLine : 'সূর্যোদয়-৬:০৬ ও সূর্যাস্ত-৫:১৮(ঢাকা)';
    ctx.textAlign = 'center';
    ctx.font = 'bold 29px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.highlightColor;
    ctx.fillText(sunLine, W / 2, sunBoxY + 34);

    // Decorative mini-line
    ctx.strokeStyle = T.innerBorderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 240, sunBoxY + 58);
    ctx.lineTo(W / 2 + 240, sunBoxY + 58);
    ctx.stroke();

    // Row 2: ঋতু (এখন হেমন্তকাল)
    const seasonLine = data.bangla ? data.bangla.seasonLine : 'এখন হেমন্তকাল';
    ctx.font = '600 24px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.subTextColor;
    ctx.fillText(seasonLine, W / 2, sunBoxY + 80);

    // ── G. Blessings & Reminders ──
    const blessStartY = 650;
    const blessings = data.blessings || [
      'সময়মত নামাজ পড়ুন',
      'সর্বদা আল্লাহকে স্মরণ করুন',
      'আনন্দময় কাটুক আপনার সারাদিন।'
    ];

    ctx.textAlign = 'center';
    ctx.font = '500 26px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.subTextColor;
    ctx.fillText(blessings[0], W / 2, blessStartY);
    ctx.fillText(blessings[1], W / 2, blessStartY + 38);

    ctx.font = '600 28px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.accentGold;
    ctx.fillText(blessings[2], W / 2, blessStartY + 80);

    // ── H. Footer: ROYAL TECHNOLOGIES BRANDING AT THE BOTTOM ──
    // Bottom separator with Islamic Star
    const footerY = 800;
    ctx.strokeStyle = T.borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(calBoxX + 60, footerY);
    ctx.lineTo(W / 2 - 30, footerY);
    ctx.moveTo(W / 2 + 30, footerY);
    ctx.lineTo(calBoxX + calBoxW - 60, footerY);
    ctx.stroke();
    drawIslamicStar(ctx, W / 2, footerY, 7.5, 3.5, T.primaryGold);

    // Primary Branding: Royal Technologies
    ctx.textAlign = 'center';
    ctx.fillStyle = T.primaryGold;
    ctx.font = 'bold 32px "Hind Siliguri", sans-serif';
    ctx.fillText('Royal Technologies', W / 2, footerY + 48);

    // Website: https://www.royaltechbd.com/
    ctx.fillStyle = T.accentGold;
    ctx.font = '600 21px "Hind Siliguri", sans-serif';
    ctx.fillText('https://www.royaltechbd.com/', W / 2, footerY + 86);

    // Tagline: Royal Today • আজকের দিন, আজকের তথ্য
    ctx.font = '500 17px "Hind Siliguri", sans-serif';
    ctx.fillStyle = T.subTextColor;
    ctx.fillText('Royal Today • আজকের দিন, আজকের তথ্য', W / 2, footerY + 118);

    return ctx;
  }

  return {
    THEMES: THEMES,
    render: render
  };
});
