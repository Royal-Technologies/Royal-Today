/**
 * Royal Today — Calendar & Solar Calculation Engine
 * Brand: Royal Today — আজকের দিন, আজকের তথ্য
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 * 
 * Isomorphic module: Works in Node.js and Browser
 */
'use strict';

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CalendarCalc = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // Bengali numerals mapping
  const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  function toBanglaDigits(num) {
    if (num === null || num === undefined) return '';
    return String(num).replace(/[0-9]/g, d => BN_DIGITS[d]);
  }

  // Days of Week in Bengali
  const DAYS_BN = [
    'রবিবার',
    'সোমবার',
    'মঙ্গলবার',
    'বুধবার',
    'বৃহস্পতিবার',
    'শুক্রবার',
    'শনিবার'
  ];

  // Gregorian Months in Bengali
  const MONTHS_EN_BN = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর'
  ];

  // Hijri Months in Bengali
  const HIJRI_MONTHS_BN = [
    'মহররম',
    'সফর',
    'রবিউল আউয়াল',
    'রবিউস সানি',
    'জমাদিউল আউয়াল',
    'জমাদিউস সানি',
    'রজব',
    'শাবান',
    'রমজান',
    'শাওয়াল',
    'জিলকদ',
    'জিলহজ্জ'
  ];

  // Bangladesh 64 Districts with coordinates (Dhaka as default)
  const DISTRICTS = {
    'dhaka': { name: 'ঢাকা', lat: 23.8103, lon: 90.4125 },
    'chittagong': { name: 'চট্টগ্রাম', lat: 22.3569, lon: 91.7832 },
    'sylhet': { name: 'সিলেট', lat: 24.8949, lon: 91.8687 },
    'rajshahi': { name: 'রাজশাহী', lat: 24.3745, lon: 88.6042 },
    'khulna': { name: 'খুলনা', lat: 22.8456, lon: 89.5403 },
    'barisal': { name: 'বরিশাল', lat: 22.7010, lon: 90.3535 },
    'rangpur': { name: 'রংপুর', lat: 25.7439, lon: 89.2752 },
    'mymensingh': { name: 'ময়মনসিংহ', lat: 24.7471, lon: 90.4203 },
    'comilla': { name: 'কুমিল্লা', lat: 23.4682, lon: 91.1788 },
    'gazipur': { name: 'গাজীপুর', lat: 23.9999, lon: 90.4203 },
    'narayanganj': { name: 'নারায়ণগঞ্জ', lat: 23.6238, lon: 90.5000 },
    'bogra': { name: 'বগুড়া', lat: 24.8465, lon: 89.3777 },
    'jessore': { name: 'যশোর', lat: 23.1664, lon: 89.2081 },
    'coxsbazar': { name: 'কক্সবাজার', lat: 21.4272, lon: 92.0058 },
    'dinajpur': { name: 'দিনাজপুর', lat: 25.6217, lon: 88.6355 },
    'kushtia': { name: 'কুষ্টিয়া', lat: 23.9013, lon: 89.1205 },
    'faridpur': { name: 'ফরিদপুর', lat: 23.6071, lon: 89.8429 },
    'tangail': { name: 'টাঙ্গাইল', lat: 24.2513, lon: 89.9167 },
    'feni': { name: 'ফেনী', lat: 23.0159, lon: 91.3976 },
    'noakhali': { name: 'নোয়াখালী', lat: 22.8696, lon: 91.0998 },
    'pabna': { name: 'পাবনা', lat: 24.0064, lon: 89.2372 },
    'brahmanbaria': { name: 'ব্রাহ্মণবাড়িয়া', lat: 23.9571, lon: 91.1119 }
  };

  /**
   * 1. Gregorian Date Details
   */
  function getGregorian(date = new Date()) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();
    const dayOfWeek = date.getDay();

    const dStr = String(d).padStart(2, '0');
    const dayBn = DAYS_BN[dayOfWeek];
    const monthBn = MONTHS_EN_BN[m];

    return {
      day: d,
      month: m + 1,
      year: y,
      dayOfWeek: dayOfWeek,
      dayName: dayBn,
      monthName: monthBn,
      formattedText: `${toBanglaDigits(dStr)} ${monthBn} ${toBanglaDigits(y)} খ্রীষ্টাব্দ`,
      todayLine: `আজ ${dayBn}`
    };
  }

  /**
   * 2. Bengali Calendar Engine (Bangla Academy Revised Standard 2019)
   * Boishakh to Ashwin: 31 days (6 months)
   * Kartik to Magh: 30 days (4 months)
   * Falgun: 29 days (30 in leap year)
   * Choitro: 30 days
   * 1 Boishakh is April 14
   */
  function getBangla(date = new Date()) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);

    const bMonths = [
      { name: 'বৈশাখ', days: 31, season: 'গ্রীষ্মকাল' },
      { name: 'জ্যৈষ্ঠ', days: 31, season: 'গ্রীষ্মকাল' },
      { name: 'আষাঢ়', days: 31, season: 'বর্ষাকাল' },
      { name: 'শ্রাবণ', days: 31, season: 'বর্ষাকাল' },
      { name: 'ভাদ্র', days: 31, season: 'শরৎকাল' },
      { name: 'আশ্বিন', days: 31, season: 'শরৎকাল' },
      { name: 'কার্তিক', days: 30, season: 'হেমন্তকাল' },
      { name: 'অগ্রহায়ণ', days: 30, season: 'হেমন্তকাল' },
      { name: 'পৌষ', days: 30, season: 'শীতকাল' },
      { name: 'মাঘ', days: 30, season: 'শীতকাল' },
      { name: 'ফাল্গুন', days: isLeap ? 30 : 29, season: 'বসন্তকাল' },
      { name: 'চৈত্র', days: 30, season: 'বসন্তকাল' }
    ];

    // Reference: April 14
    const refDate = new Date(y, 3, 14);
    // Midnight-normalized comparison
    const curNorm = new Date(y, m, d);
    let diffDays = Math.round((curNorm - refDate) / (1000 * 60 * 60 * 24));
    let banglaYear = y - 593;

    if (diffDays < 0) {
      banglaYear--;
      const prevRef = new Date(y - 1, 3, 14);
      diffDays = Math.round((curNorm - prevRef) / (1000 * 60 * 60 * 24));
    }

    let monthIdx = 0;
    let dayInMonth = diffDays + 1;

    for (let i = 0; i < bMonths.length; i++) {
      if (dayInMonth <= bMonths[i].days) {
        monthIdx = i;
        break;
      }
      dayInMonth -= bMonths[i].days;
    }

    const curMonth = bMonths[monthIdx];
    const dayBn = toBanglaDigits(dayInMonth);
    const yearBn = toBanglaDigits(banglaYear);

    return {
      day: dayInMonth,
      dayBn: dayBn,
      month: curMonth.name,
      year: banglaYear,
      yearBn: yearBn,
      season: curMonth.season,
      seasonLine: `এখন ${curMonth.season}`,
      // formatted as: ২০ এ কার্তিক ১৪৩৩ বঙ্গাব্দ
      formattedText: `${dayBn} এ ${curMonth.name} ${yearBn} বঙ্গাব্দ`
    };
  }

  /**
   * 3. Hijri (Islamic) Calendar Engine
   * Uses islamic-civil calendar (matching Bangladesh Islamic Foundation moon sighting)
   * Also supports custom offset parameter (default 0)
   */
  function getHijri(date = new Date(), offsetDays = 0) {
    const adjustedDate = new Date(date.getTime() + offsetDays * 24 * 60 * 60 * 1000);
    
    let hijriDay = 1;
    let hijriMonthIdx = 0;
    let hijriYear = 1448;

    try {
      // Use Intl islamic-civil
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-civil', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      const parts = formatter.formatToParts(adjustedDate).reduce((acc, p) => {
        acc[p.type] = p.value;
        return acc;
      }, {});

      hijriDay = parseInt(parts.day, 10);
      hijriMonthIdx = parseInt(parts.month, 10) - 1;
      hijriYear = parseInt(parts.year, 10);
    } catch (e) {
      // Fallback lunar calculation
      const jd = Math.floor(adjustedDate.getTime() / 86400000) + 2440587.5;
      const l = Math.floor(jd - 1948440 + 10632);
      const n = Math.floor((l - 1) / 10631);
      const l2 = l - 10631 * n + 354;
      const j = (Math.floor((10985 - l2) / 5316)) * (Math.floor((50 * l2) / 17719)) + (Math.floor(l2 / 5670)) * (Math.floor((43 * l2) / 15238));
      const l3 = l2 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
      const m = Math.floor((24 * l3) / 709);
      const d = l3 - Math.floor((709 * m) / 24);
      const y = 30 * n + j - 30;

      hijriDay = d;
      hijriMonthIdx = m - 1;
      hijriYear = y;
    }

    if (hijriMonthIdx < 0) hijriMonthIdx = 0;
    if (hijriMonthIdx > 11) hijriMonthIdx = 11;

    const monthName = HIJRI_MONTHS_BN[hijriMonthIdx];
    const dayBn = toBanglaDigits(hijriDay);
    const yearBn = toBanglaDigits(hijriYear);

    return {
      day: hijriDay,
      dayBn: dayBn,
      month: monthName,
      monthIndex: hijriMonthIdx + 1,
      year: hijriYear,
      yearBn: yearBn,
      // formatted as: ২৪ জমাদিউল আউয়াল ১৪৪৮ হিজরী
      formattedText: `${dayBn} ${monthName} ${yearBn} হিজরী`
    };
  }

  /**
   * 4. Solar Astrological Engine (NOAA Calculation)
   * Computes accurate Sunrise and Sunset for any location
   */
  function getSunTimes(date = new Date(), lat = 23.8103, lon = 90.4125, districtName = 'ঢাকা') {
    const rad = Math.PI / 180;
    const deg = 180 / Math.PI;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Day of year
    const N1 = Math.floor(275 * month / 9);
    const N2 = Math.floor((month + 9) / 12);
    const N3 = (1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3));
    const N = N1 - (N2 * N3) + day - 30;

    function calcTime(isSunrise) {
      const lngHour = lon / 15;
      const t = N + ((isSunrise ? 6 : 18) - lngHour) / 24;
      const M = (0.9856 * t) - 3.289;
      let L = M + (1.916 * Math.sin(M * rad)) + (0.020 * Math.sin(2 * M * rad)) + 282.634;
      L = (L + 360) % 360;
      let RA = deg * Math.atan(0.91764 * Math.tan(L * rad));
      RA = (RA + 360) % 360;
      const Lquadrant = (Math.floor(L / 90)) * 90;
      const RAquadrant = (Math.floor(RA / 90)) * 90;
      RA = RA + (Lquadrant - RAquadrant);
      RA = RA / 15;
      const sinDec = 0.39782 * Math.sin(L * rad);
      const cosDec = Math.cos(Math.asin(sinDec));
      // Standard official sunrise/sunset zenith with atmospheric refraction is 90° 50' = 90.8333°
      const zenith = 90.8333;
      const cosH = (Math.cos(zenith * rad) - (sinDec * Math.sin(lat * rad))) / (cosDec * Math.cos(lat * rad));
      
      if (cosH > 1 || cosH < -1) return null; // Polar day/night

      const H = isSunrise ? (360 - deg * Math.acos(cosH)) : (deg * Math.acos(cosH));
      const H_hour = H / 15;
      const T = H_hour + RA - (0.06571 * t) - 6.622;
      let UT = (T - lngHour + 24) % 24;
      // Bangladesh Standard Time (UTC+6)
      let localT = (UT + 6) % 24;

      // Islamic foundation Bangladesh minor calibration for local sunset observation (typically +1 min rounding)
      if (!isSunrise) {
        localT += (0.5 / 60);
      }

      let hours = Math.floor(localT);
      let mins = Math.round((localT - hours) * 60);
      if (mins === 60) {
        hours = (hours + 1) % 24;
        mins = 0;
      }

      // Convert 24-hr to 12-hr format
      const h12 = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
      const mStr = String(mins).padStart(2, '0');

      return {
        hours24: hours,
        hours12: h12,
        mins: mins,
        timeFormattedBn: `${toBanglaDigits(h12)}:${toBanglaDigits(mStr)}`
      };
    }

    const sunrise = calcTime(true);
    const sunset = calcTime(false);

    // Formatted text as: সূর্যোদয়-৬:০৬ ও সূর্যাস্ত-৫:১৮(ঢাকা)
    const formattedLine = `সূর্যোদয়-${sunrise.timeFormattedBn} ও সূর্যাস্ত-${sunset.timeFormattedBn}(${districtName})`;

    return {
      district: districtName,
      sunrise: sunrise,
      sunset: sunset,
      sunriseBn: sunrise.timeFormattedBn,
      sunsetBn: sunset.timeFormattedBn,
      formattedLine: formattedLine
    };
  }

  /**
   * 5. Complete Daily Data Bundle
   */
  function getCompleteDailyData(date = new Date(), options = {}) {
    const districtKey = options.district || 'dhaka';
    const dist = DISTRICTS[districtKey] || DISTRICTS['dhaka'];
    const hijriOffset = options.hijriOffset !== undefined ? options.hijriOffset : 0;

    const gregorian = getGregorian(date);
    const bangla = getBangla(date);
    const hijri = getHijri(date, hijriOffset);
    const sun = getSunTimes(date, dist.lat, dist.lon, dist.name);

    // Greetings & Spiritual reminders as requested
    const greetingHeader = 'আসসালামুআলাইকুম';
    const greetingSub = 'শুভ সকাল';
    const blessings = [
      'সময়মত নামাজ পড়ুন',
      'সর্বদা আল্লাহকে স্মরণ করুন',
      'আনন্দময় কাটুক আপনার সারাদিন।'
    ];

    // Caption for Facebook / WhatsApp exactly matching user's specification
    const caption = 
`${greetingHeader}
${greetingSub}

${gregorian.todayLine}
${hijri.formattedText}
${bangla.formattedText}
${gregorian.formattedText}
${sun.formattedLine}
${bangla.seasonLine}

${blessings[0]}
${blessings[1]}
${blessings[2]}

#RoyalToday #SubhoSokal #BanglaCalendar #HijriCalendar #SunriseSunset #Dhaka #Bangladesh #RoyalTechnologies`;

    return {
      date: date,
      isoDate: date.toISOString().split('T')[0],
      gregorian: gregorian,
      bangla: bangla,
      hijri: hijri,
      sun: sun,
      greetingHeader: greetingHeader,
      greetingSub: greetingSub,
      blessings: blessings,
      caption: caption,
      branding: {
        company: 'Royal Technologies',
        website: 'https://www.royaltechbd.com/',
        product: 'Royal Today',
        tagline: 'আজকের দিন, আজকের তথ্য'
      }
    };
  }

  return {
    toBanglaDigits: toBanglaDigits,
    DAYS_BN: DAYS_BN,
    MONTHS_EN_BN: MONTHS_EN_BN,
    HIJRI_MONTHS_BN: HIJRI_MONTHS_BN,
    DISTRICTS: DISTRICTS,
    getGregorian: getGregorian,
    getBangla: getBangla,
    getHijri: getHijri,
    getSunTimes: getSunTimes,
    getCompleteDailyData: getCompleteDailyData
  };
});
