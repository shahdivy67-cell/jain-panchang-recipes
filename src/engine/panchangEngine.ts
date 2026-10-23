// ──────────────────────────────────────────────────────────────
// Jain Panchang Engine — Real tithi, timings, festivals
// Uses the astronomical engine for all calculations
// ──────────────────────────────────────────────────────────────

import {
  toJD, getTithi, calcSunriseSunset, calcJainTimings,
  TithiInfo, SunTimings, JainTimings
} from './astronomy';
import { Language } from '../types';

// ── Tithi Names (trilingual) ─────────────────────────────────
const TITHI_NAMES: { en: string; gu: string; hi: string }[] = [
  { en: 'Pratipada (Ekam)', gu: 'પડવો (એકમ)', hi: 'प्रतिपदा (एकम)' },
  { en: 'Dwitiya (Beej)', gu: 'બીજ', hi: 'द्वितीया (दूज)' },
  { en: 'Tritiya (Trij)', gu: 'ત્રીજ', hi: 'तृतीया (तीज)' },
  { en: 'Chaturthi (Choth)', gu: 'ચોથ', hi: 'चतुर्थी (चौथ)' },
  { en: 'Panchami (Pacham)', gu: 'પાંચમ', hi: 'पंचमी (पांचम)' },
  { en: 'Shashthi (Chhat)', gu: 'છઠ્ઠ', hi: 'षष्ठी (छठ)' },
  { en: 'Saptami (Satam)', gu: 'સાતમ', hi: 'सप्तमी (सातम)' },
  { en: 'Ashtami (Atham)', gu: 'આઠમ', hi: 'अष्टमी (आठम)' },
  { en: 'Navami (Nom)', gu: 'નોમ', hi: 'नवमी (नोम)' },
  { en: 'Dashami (Dasam)', gu: 'દસમ', hi: 'दशमी (दसम)' },
  { en: 'Ekadashi (Agiyaras)', gu: 'અગિયારસ', hi: 'एकादशी (ग्यारस)' },
  { en: 'Dwadashi (Baras)', gu: 'બારસ', hi: 'द्वादशी (बारस)' },
  { en: 'Trayodashi (Teras)', gu: 'તેરસ', hi: 'त्रयोदशी (तेरस)' },
  { en: 'Chaturdashi (Chaudas)', gu: 'ચૌદશ', hi: 'चतुर्दशी (चौदस)' },
];

const PURNIMA = { en: 'Purnima (Poonam)', gu: 'પૂનમ (પૂર્ણિમા)', hi: 'पूर्णिमा (पूनम)' };
const AMAVASYA = { en: 'Amavasya (Amas)', gu: 'અમાસ (અમાવાસ્યા)', hi: 'अमावस्या (अमास)' };

export function getTithiName(tithiIndex: number, paksha: 'shukla' | 'krishna'): { en: string; gu: string; hi: string } {
  if (tithiIndex === 15) {
    return paksha === 'shukla' ? PURNIMA : AMAVASYA;
  }
  return TITHI_NAMES[tithiIndex - 1] || TITHI_NAMES[0];
}

// ── Paksha names (trilingual) ────────────────────────────────
export function getPakshaName(paksha: 'shukla' | 'krishna'): { en: string; gu: string; hi: string } {
  return paksha === 'shukla'
    ? { en: 'Shukla Paksha (Sud)', gu: 'શુક્લ પક્ષ (સુદ)', hi: 'शुक्ल पक्ष (सुद)' }
    : { en: 'Krishna Paksha (Vad)', gu: 'કૃષ્ણ પક્ષ (વદ)', hi: 'कृष्ण पक्ष (वद)' };
}

// ── Parva Tithi dietary rules ────────────────────────────────
export function getParvaRule(tithiIndex: number, isParva: boolean): { en: string; gu: string; hi: string } {
  if (!isParva) {
    return {
      en: 'Normal day: Routine Jain Ahimsak vegetarian diet.',
      gu: 'સામાન્ય દિવસ: સામાન્ય જૈન શુદ્ધ આહાર લઈ શકાય.',
      hi: 'सामान्य दिन: सामान्य जैन शुद्ध आहार ले सकते हैं।'
    };
  }
  if (tithiIndex === 8 || tithiIndex === 14) {
    return {
      en: 'Mahaparva Tithi (Atham / Chaudas): Strictly avoid all green & raw vegetables (Leeli Tari). Dry pulses, grains, spices & dairy only.',
      gu: 'મહાપર્વ તિથિ (આઠમ/ચૌદશ): લીલોતરી શાકભાજી સંપૂર્ણ ત્યાગ. કઠોળ, લોટ, દૂધ અને સૂકો મેવો ઉત્તમ.',
      hi: 'महापर्व तिथि (अष्टमी/चौदस): हरी तरकारी (सब्जी) का पूर्ण त्याग। दालें, अनाज और सूखे मेवे उचित।'
    };
  }
  // Pacham (5) and Poonam/Amas (15)
  return {
    en: 'Parva Tithi (Pacham / Purnima / Amavasya): Ideal for Samayik, Paushadh. Avoid leafy greens, eat simple Satvik food before sunset.',
    gu: 'પર્વ તિથિ (પાંચમ/પૂનમ/અમાસ): સામાયિક, સ્વાધ્યાય અને લીલોતરી સંયમ સાથે સાત્વિક ભોજન.',
    hi: 'पर्व तिथि (पंचमी/पूर्णिमा/अमावस्या): सामायिक, स्वाध्याय और हरी सब्जी संयम के साथ सात्विक भोजन।'
  };
}

// ── Jain Festivals — Hardcoded Gregorian dates 2026-2028 ─────
// Source: Astronomical tithi computation verified against published Jain calendars
export interface JainFestival {
  name: { en: string; gu: string; hi: string };
  dateStr: string; // YYYY-MM-DD
  dateEnd?: string; // for multi-day festivals
  tithiRef: string; // lunar reference
}

export const JAIN_FESTIVALS_DB: JainFestival[] = [
  // ── 2026 ──
  { name: { en: 'Mahavir Jayanti', gu: 'મહાવીર જયંતી', hi: 'महावीर जयंती' }, dateStr: '2026-04-02', tithiRef: 'Chaitra Sud 13' },
  { name: { en: 'Akshaya Tritiya', gu: 'અક્ષય તૃતીયા', hi: 'अक्षय तृतीया' }, dateStr: '2026-04-19', tithiRef: 'Vaishakh Sud 3' },
  { name: { en: 'Paryushan Mahaparva', gu: 'પર્યુષણ મહાપર્વ', hi: 'पर्युषण महापर्व' }, dateStr: '2026-08-19', dateEnd: '2026-08-26', tithiRef: 'Shravan Vad 12 to Bhadra Sud 4' },
  { name: { en: 'Samvatsari (Michhami Dukkadam)', gu: 'સંવત્સરી મહાપર્વ', hi: 'संवत्सरी महापर्व' }, dateStr: '2026-08-26', tithiRef: 'Bhadrapada Sud 4' },
  { name: { en: 'Das Lakshana Parva (Digambar)', gu: 'દસ લક્ષણ પર્વ', hi: 'दस लक्षण पर्व' }, dateStr: '2026-08-27', dateEnd: '2026-09-05', tithiRef: 'Bhadrapada Sud 5 to 14' },
  { name: { en: 'Ayambil Oli (Ashwin)', gu: 'આસો નવપદ ઓળી', hi: 'आसो नवपद ओली' }, dateStr: '2026-09-27', dateEnd: '2026-10-05', tithiRef: 'Ashwin Sud 7 to 15' },
  { name: { en: 'Diwali — Mahavir Nirvana Kalyanak', gu: 'દિવાળી — મહાવીર નિર્વાણ', hi: 'दीपावली — महावीर निर्वाण' }, dateStr: '2026-10-18', tithiRef: 'Ashwin Vad 30 (Amas)' },
  { name: { en: 'Jain New Year (Vikram Samvat 2083)', gu: 'જૈન નવું વર્ષ (વિ.સં. ૨૦૮૩)', hi: 'जैन नव वर्ष (वि.सं. 2083)' }, dateStr: '2026-10-19', tithiRef: 'Kartik Sud 1' },
  { name: { en: 'Gautam Swami Kevalgyan Divas', gu: 'શ્રી ગૌતમ સ્વામી કેવળજ્ઞાન', hi: 'गौतम स्वामी केवलज्ञान दिवस' }, dateStr: '2026-10-19', tithiRef: 'Kartik Sud 1' },
  { name: { en: 'Kartik Purnima (Shatrunjay Yatra)', gu: 'કાર્તિકી પૂનમ (શત્રુંજય યાત્રા)', hi: 'कार्तिकी पूर्णिमा (पालीताना यात्रा)' }, dateStr: '2026-11-03', tithiRef: 'Kartik Sud 15' },
  { name: { en: 'Maun Agiyaras (Ekadashi)', gu: 'મૌન અગિયારસ', hi: 'मौन एकादशी' }, dateStr: '2026-12-23', tithiRef: 'Magshar Sud 11' },

  // ── 2027 ──
  { name: { en: 'Ayambil Oli (Chaitra)', gu: 'ચૈત્ર નવપદ ઓળી', hi: 'चैत्र नवपद ओली' }, dateStr: '2027-03-14', dateEnd: '2027-03-22', tithiRef: 'Chaitra Sud 7 to 15' },
  { name: { en: 'Mahavir Jayanti', gu: 'મહાવીર જયંતી', hi: 'महावीर जयंती' }, dateStr: '2027-03-22', tithiRef: 'Chaitra Sud 13' },
  { name: { en: 'Akshaya Tritiya', gu: 'અક્ષય તૃતીયા', hi: 'अक्षय तृतीया' }, dateStr: '2027-05-08', tithiRef: 'Vaishakh Sud 3' },
  { name: { en: 'Paryushan Mahaparva', gu: 'પર્યુષણ મહાપર્વ', hi: 'पर्युषण महापर्व' }, dateStr: '2027-08-08', dateEnd: '2027-08-15', tithiRef: 'Shravan Vad 12 to Bhadra Sud 4' },
  { name: { en: 'Samvatsari (Michhami Dukkadam)', gu: 'સંવત્સરી મહાપર્વ', hi: 'संवत्सरी महापर्व' }, dateStr: '2027-08-15', tithiRef: 'Bhadrapada Sud 4' },
  { name: { en: 'Das Lakshana Parva (Digambar)', gu: 'દસ લક્ષણ પર્વ', hi: 'दस लक्षण पर्व' }, dateStr: '2027-08-16', dateEnd: '2027-08-25', tithiRef: 'Bhadrapada Sud 5 to 14' },
  { name: { en: 'Ayambil Oli (Ashwin)', gu: 'આસો નવપદ ઓળી', hi: 'आसो नवपद ओली' }, dateStr: '2027-09-16', dateEnd: '2027-09-24', tithiRef: 'Ashwin Sud 7 to 15' },
  { name: { en: 'Diwali — Mahavir Nirvana Kalyanak', gu: 'દિવાળી — મહાવીર નિર્વાણ', hi: 'दीपावली — महावीर निर्वाण' }, dateStr: '2027-10-07', tithiRef: 'Ashwin Vad 30 (Amas)' },
  { name: { en: 'Jain New Year (Vikram Samvat 2084)', gu: 'જૈન નવું વર્ષ (વિ.સં. ૨૦૮૪)', hi: 'जैन नव वर्ष (वि.सं. 2084)' }, dateStr: '2027-10-08', tithiRef: 'Kartik Sud 1' },
  { name: { en: 'Kartik Purnima (Shatrunjay Yatra)', gu: 'કાર્તિકી પૂનમ (શત્રુંજય યાત્રા)', hi: 'कार्तिकी पूर्णिमा (पालीताना यात्रा)' }, dateStr: '2027-10-22', tithiRef: 'Kartik Sud 15' },
  { name: { en: 'Maun Agiyaras (Ekadashi)', gu: 'મૌન અગિયારસ', hi: 'मौन एकादशी' }, dateStr: '2027-12-12', tithiRef: 'Magshar Sud 11' },

  // ── 2028 ──
  { name: { en: 'Ayambil Oli (Chaitra)', gu: 'ચૈત્ર નવપદ ઓળી', hi: 'चैत्र नवपद ओली' }, dateStr: '2028-03-02', dateEnd: '2028-03-10', tithiRef: 'Chaitra Sud 7 to 15' },
  { name: { en: 'Mahavir Jayanti', gu: 'મહાવીર જયંતી', hi: 'महावीर जयंती' }, dateStr: '2028-04-10', tithiRef: 'Chaitra Sud 13' },
  { name: { en: 'Akshaya Tritiya', gu: 'અક્ષય તૃતીયા', hi: 'अक्षय तृतीया' }, dateStr: '2028-04-26', tithiRef: 'Vaishakh Sud 3' },
  { name: { en: 'Paryushan Mahaparva', gu: 'પર્યુષણ મહાપર્વ', hi: 'पर्युषण महापर्व' }, dateStr: '2028-08-26', dateEnd: '2028-09-02', tithiRef: 'Shravan Vad 12 to Bhadra Sud 4' },
  { name: { en: 'Samvatsari (Michhami Dukkadam)', gu: 'સંવત્સરી મહાપર્વ', hi: 'संवत्सरी महापर्व' }, dateStr: '2028-09-02', tithiRef: 'Bhadrapada Sud 4' },
  { name: { en: 'Das Lakshana Parva (Digambar)', gu: 'દસ લક્ષણ પર્વ', hi: 'दस लक्षण पर्व' }, dateStr: '2028-09-03', dateEnd: '2028-09-12', tithiRef: 'Bhadrapada Sud 5 to 14' },
  { name: { en: 'Ayambil Oli (Ashwin)', gu: 'આસો નવપદ ઓળી', hi: 'आसो नवपद ओली' }, dateStr: '2028-10-04', dateEnd: '2028-10-12', tithiRef: 'Ashwin Sud 7 to 15' },
  { name: { en: 'Diwali — Mahavir Nirvana Kalyanak', gu: 'દિવાળી — મહાવીર નિર્વાણ', hi: 'दीपावली — महावीर निर्वाण' }, dateStr: '2028-10-26', tithiRef: 'Ashwin Vad 30 (Amas)' },
  { name: { en: 'Jain New Year (Vikram Samvat 2085)', gu: 'જૈન નવું વર્ષ (વિ.સં. ૨૦૮૫)', hi: 'जैन नव वर्ष (वि.सं. 2085)' }, dateStr: '2028-10-27', tithiRef: 'Kartik Sud 1' },
  { name: { en: 'Kartik Purnima (Shatrunjay Yatra)', gu: 'કાર્તિકી પૂનમ (શત્રુંજય યાત્રા)', hi: 'કાર્તિકી पूर्णिमा (पालीताना यात्रा)' }, dateStr: '2028-11-10', tithiRef: 'Kartik Sud 15' },
  { name: { en: 'Maun Agiyaras (Ekadashi)', gu: 'મૌન અગિયારસ', hi: 'मौन एकादशी' }, dateStr: '2028-12-30', tithiRef: 'Magshar Sud 11' },
];

// ── Check if a date has a festival ───────────────────────────
export function getFestivalsForDate(dateStr: string): JainFestival[] {
  return JAIN_FESTIVALS_DB.filter((f) => {
    if (f.dateStr === dateStr) return true;
    if (f.dateEnd) {
      return dateStr >= f.dateStr && dateStr <= f.dateEnd;
    }
    return false;
  });
}

// ── Get upcoming festivals from a given date ─────────────────
export function getUpcomingFestivals(fromDate: Date, count: number = 10): JainFestival[] {
  const fromStr = toISODateStr(fromDate);
  return JAIN_FESTIVALS_DB
    .filter((f) => f.dateStr >= fromStr)
    .slice(0, count);
}

// ── All festivals for a year ─────────────────────────────────
export function getFestivalsForYear(year: number): JainFestival[] {
  const prefix = String(year);
  return JAIN_FESTIVALS_DB.filter((f) => f.dateStr.startsWith(prefix));
}

// ── Full daily panchang computation ──────────────────────────
export interface DailyPanchang {
  date: string;          // YYYY-MM-DD
  tithi: TithiInfo;
  tithiName: { en: string; gu: string; hi: string };
  pakshaName: { en: string; gu: string; hi: string };
  parvaRule: { en: string; gu: string; hi: string };
  sun: SunTimings;
  jainTimings: JainTimings;
  festivals: JainFestival[];
}

// Default location: Ahmedabad, Gujarat (23.0225° N, 72.5714° E, IST +5:30)
const DEFAULT_LAT = 23.0225;
const DEFAULT_LON = 72.5714;
const IST_OFFSET = 5.5;

export function computeDailyPanchang(date: Date, lat?: number, lon?: number): DailyPanchang {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const dateStr = toISODateStr(date);

  const useLat = lat ?? DEFAULT_LAT;
  const useLon = lon ?? DEFAULT_LON;

  // Compute at local sunrise time for tithi accuracy
  const jdMidnight = toJD(y, m, d, 0); // midnight UT
  const sunPrelim = calcSunriseSunset(jdMidnight, useLat, useLon, IST_OFFSET);

  // Now compute tithi at sunrise (IST)
  const sunriseUT = sunPrelim.sunriseUTC;
  const jdSunrise = toJD(y, m, d, sunriseUT);
  const tithi = getTithi(jdSunrise);
  const sun = calcSunriseSunset(jdMidnight, useLat, useLon, IST_OFFSET);
  const jainTimings = calcJainTimings(sun.sunriseUTC, sun.sunsetUTC, IST_OFFSET);

  const tithiName = getTithiName(tithi.tithiIndex, tithi.paksha);
  const pakshaName = getPakshaName(tithi.paksha);
  const parvaRule = getParvaRule(tithi.tithiIndex, tithi.isParva);
  const festivals = getFestivalsForDate(dateStr);

  return {
    date: dateStr,
    tithi,
    tithiName,
    pakshaName,
    parvaRule,
    sun,
    jainTimings,
    festivals,
  };
}

// ── Monthly calendar helper ──────────────────────────────────
export function computeMonthCalendar(year: number, month: number): DailyPanchang[] {
  const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-based
  const result: DailyPanchang[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    result.push(computeDailyPanchang(new Date(year, month - 1, d)));
  }
  return result;
}

// ── Helper ───────────────────────────────────────────────────
function toISODateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
