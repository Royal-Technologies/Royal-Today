/**
 * Royal Today — Interactive Frontend Web Application
 * Brand: Royal Today — আজকের দিন, আজকের তথ্য
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. State ──
  const state = {
    date: new Date(),
    district: 'dhaka',
    theme: 'sunrise-gold',
    hijriOffset: 0
  };

  // ── 2. DOM Elements ──
  const dateInput = document.getElementById('dateInput');
  const districtSelect = document.getElementById('districtSelect');
  const themeSelect = document.getElementById('themeSelect');
  const hijriOffsetSelect = document.getElementById('hijriOffsetSelect');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const liveClockEl = document.getElementById('liveClock');
  const previewThemeLabel = document.getElementById('previewThemeLabel');
  const captionPreviewText = document.getElementById('captionPreviewText');

  // Hero & Showcase Text Elements
  const heroSalamEl = document.getElementById('heroSalam');
  const heroDayEl = document.getElementById('heroDay');
  const showcaseHijri = document.getElementById('showcaseHijri');
  const showcaseBangla = document.getElementById('showcaseBangla');
  const showcaseGregorian = document.getElementById('showcaseGregorian');
  const showcaseSunrise = document.getElementById('showcaseSunrise');
  const showcaseSunset = document.getElementById('showcaseSunset');
  const showcaseSeason = document.getElementById('showcaseSeason');

  // Buttons
  const btnDownload = document.getElementById('btnDownload');
  const btnCopyImage = document.getElementById('btnCopyImage');
  const btnCopyCaptionShowcase = document.getElementById('btnCopyCaptionShowcase');
  const btnCopyImageShowcase = document.getElementById('btnCopyImageShowcase');
  const btnShareShowcase = document.getElementById('btnShareShowcase');
  const btnCopyCaptionBox = document.getElementById('btnCopyCaptionBox');
  const toastEl = document.getElementById('toast');

  // Canvas
  const canvas = document.getElementById('cardCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1080;
  canvas.height = 1080;

  // ── 3. Populate District Dropdown ──
  if (districtSelect && window.CalendarCalc) {
    districtSelect.innerHTML = '';
    const dists = window.CalendarCalc.DISTRICTS;
    for (const [key, d] of Object.entries(dists)) {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = d.name;
      if (key === 'dhaka') opt.selected = true;
      districtSelect.appendChild(opt);
    }
  }

  // Populate Date Input
  function formatDateInput(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
  if (dateInput) {
    dateInput.value = formatDateInput(state.date);
  }

  // ── 4. Toast Notification ──
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.querySelector('.toast-msg').textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // ── 5. Render & Update DOM ──
  function updateUI() {
    if (!window.CalendarCalc || !window.RoyalTodayCard) return;

    const data = window.CalendarCalc.getCompleteDailyData(state.date, {
      district: state.district,
      hijriOffset: state.hijriOffset
    });

    // Update Hero & Showcase Texts
    if (heroSalamEl) heroSalamEl.textContent = data.greetingHeader;
    if (heroDayEl) heroDayEl.textContent = data.gregorian.todayLine;
    if (showcaseHijri) showcaseHijri.textContent = data.hijri.formattedText;
    if (showcaseBangla) showcaseBangla.textContent = data.bangla.formattedText;
    if (showcaseGregorian) showcaseGregorian.textContent = data.gregorian.formattedText;
    if (showcaseSunrise) showcaseSunrise.textContent = data.sun.sunriseBn;
    if (showcaseSunset) showcaseSunset.textContent = data.sun.sunsetBn;
    if (showcaseSeason) showcaseSeason.textContent = `🍂 ${data.bangla.seasonLine}`;

    if (previewThemeLabel && window.RoyalTodayCard.THEMES[state.theme]) {
      previewThemeLabel.textContent = window.RoyalTodayCard.THEMES[state.theme].name;
    }

    if (captionPreviewText) {
      captionPreviewText.textContent = data.caption;
    }

    // Render Canvas
    window.RoyalTodayCard.render(ctx, data, { theme: state.theme });
  }

  // ── 6. Event Listeners ──
  if (dateInput) {
    dateInput.addEventListener('change', (e) => {
      if (e.target.value) {
        const parts = e.target.value.split('-');
        state.date = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        updateUI();
      }
    });
  }

  if (districtSelect) {
    districtSelect.addEventListener('change', (e) => {
      state.district = e.target.value;
      updateUI();
    });
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      state.theme = e.target.value;
      updateUI();
    });
  }

  if (hijriOffsetSelect) {
    hijriOffsetSelect.addEventListener('change', (e) => {
      state.hijriOffset = parseInt(e.target.value, 10) || 0;
      updateUI();
    });
  }

  // ── 7. Action Helpers ──
  async function copyCaptionText() {
    const data = window.CalendarCalc.getCompleteDailyData(state.date, {
      district: state.district,
      hijriOffset: state.hijriOffset
    });
    try {
      await navigator.clipboard.writeText(data.caption);
      showToast('ক্যাপশন সফলভাবে কপি হয়েছে!');
    } catch (err) {
      showToast('কপিতে সমস্যা হয়েছে!');
    }
  }

  async function copyCanvasImage() {
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          showToast('ইমেজ তৈরি ব্যর্থ হয়েছে!');
          return;
        }
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast('ইমেজ ক্লিপবোর্ডে কপি হয়েছে! (ফেসবুকে Ctrl+V চাপুন)');
      });
    } catch (err) {
      showToast('ব্রাউজারে সরাসরি ইমেজ কপি সমর্থিত নয়!');
    }
  }

  function downloadCanvasImage() {
    const link = document.createElement('a');
    const dStr = formatDateInput(state.date).replace(/-/g, '');
    link.download = `Royal-Today-${dStr}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('কার্ড ডাউনলোড শুরু হয়েছে!');
  }

  // Bind Buttons
  if (btnDownload) btnDownload.addEventListener('click', downloadCanvasImage);
  if (btnCopyImage) btnCopyImage.addEventListener('click', copyCanvasImage);
  if (btnCopyImageShowcase) btnCopyImageShowcase.addEventListener('click', copyCanvasImage);
  if (btnCopyCaptionShowcase) btnCopyCaptionShowcase.addEventListener('click', copyCaptionText);
  if (btnCopyCaptionBox) btnCopyCaptionBox.addEventListener('click', copyCaptionText);

  // Native Web Share
  if (btnShareShowcase) {
    btnShareShowcase.addEventListener('click', async () => {
      const data = window.CalendarCalc.getCompleteDailyData(state.date, {
        district: state.district,
        hijriOffset: state.hijriOffset
      });

      if (navigator.share) {
        try {
          canvas.toBlob(async (blob) => {
            const file = new File([blob], 'royal-today.png', { type: 'image/png' });
            await navigator.share({
              title: 'Royal Today — আজকের দিন, আজকের তথ্য',
              text: data.caption,
              files: [file]
            });
          });
        } catch (err) {
          try {
            await navigator.share({
              title: 'Royal Today — আজকের দিন, আজকের তথ্য',
              text: data.caption
            });
          } catch (e) {}
        }
      } else {
        copyCaptionText();
      }
    });
  }

  // Dark/Light Theme Toggle
  if (themeToggleBtn) {
    const savedMode = localStorage.getItem('rt_mode') || 'dark';
    if (savedMode === 'light') {
      document.body.classList.add('light');
      themeToggleBtn.innerHTML = '🌙 ডার্ক মোড';
    }

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('rt_mode', isLight ? 'light' : 'dark');
      themeToggleBtn.innerHTML = isLight ? '🌙 ডার্ক মোড' : '☀️ লাইট মোড';
    });
  }

  // Live Clock
  function updateClock() {
    if (!liveClockEl || !window.CalendarCalc) return;
    const now = new Date();
    let hours = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
    hours = hours % 12 || 12;
    const hStr = String(hours).padStart(2, '0');

    const bnTime = `${window.CalendarCalc.toBanglaDigits(hStr)}:${window.CalendarCalc.toBanglaDigits(mins)}:${window.CalendarCalc.toBanglaDigits(secs)} ${ampm}`;
    liveClockEl.textContent = bnTime;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Initial Render
  if (document.fonts) {
    document.fonts.ready.then(() => {
      updateUI();
    });
  } else {
    updateUI();
  }
});
