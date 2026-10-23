// ──────────────────────────────────────────────────────────────
// Real Astronomical Engine — Meeus-grade Sun/Moon/Tithi/Sunrise
// Accurate to ~0.1° for Sun, ~0.3° for Moon (tithi = 12° wide)
// ──────────────────────────────────────────────────────────────

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;

// ── Julian Day Number ────────────────────────────────────────
export function toJD(y: number, m: number, d: number, ut: number = 0): number {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + ut / 24 + B - 1524.5;
}

export function jdToDate(jd: number): Date {
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;
  let a = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const dd = Math.floor(365.25 * c);
  const e = Math.floor((b - dd) / 30.6001);
  const day = b - dd - Math.floor(30.6001 * e) + f;
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  const frac = day - Math.floor(day);
  const hours = frac * 24;
  return new Date(Date.UTC(year, month - 1, Math.floor(day), Math.floor(hours), Math.round((hours % 1) * 60)));
}

// ── Normalize degrees to [0, 360) ───────────────────────────
function norm360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

// ── Sun's Ecliptic Longitude (Meeus Ch. 25) ─────────────────
export function sunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  // Geometric mean longitude of the Sun
  const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  // Mean anomaly of the Sun
  const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mr = M * D2R;
  // Equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mr)
          + 0.000289 * Math.sin(3 * Mr);
  // Sun's true longitude
  const sunLon = norm360(L0 + C);
  // Nutation in longitude (simplified)
  const omega = norm360(125.04 - 1934.136 * T);
  const apparent = sunLon - 0.00569 - 0.00478 * Math.sin(omega * D2R);
  return norm360(apparent);
}

// ── Sun's Declination & Equation of Time ────────────────────
export function sunDeclination(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = norm360(280.46646 + 36000.76983 * T);
  const M = norm360(357.52911 + 35999.05029 * T);
  const Mr = M * D2R;
  const C = 1.914602 * Math.sin(Mr) + 0.019993 * Math.sin(2 * Mr) + 0.000289 * Math.sin(3 * Mr);
  const sunLon = (L0 + C) * D2R;
  const epsilon = (23.439291 - 0.0130042 * T) * D2R;
  return Math.asin(Math.sin(epsilon) * Math.sin(sunLon)) * R2D;
}

export function equationOfTime(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = norm360(280.46646 + 36000.76983 * T) * D2R;
  const M = norm360(357.52911 + 35999.05029 * T) * D2R;
  const e = 0.016708634 - 0.000042037 * T;
  const epsilon = (23.439291 - 0.0130042 * T) * D2R;
  const y = Math.tan(epsilon / 2) ** 2;
  const eot = y * Math.sin(2 * L0) - 2 * e * Math.sin(M) + 4 * e * y * Math.sin(M) * Math.cos(2 * L0)
            - 0.5 * y * y * Math.sin(4 * L0) - 1.25 * e * e * Math.sin(2 * M);
  return eot * R2D * 4; // minutes
}

// ── Moon's Ecliptic Longitude (Meeus Ch. 47, 60 terms) ──────
export function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  // Moon's mean longitude
  const Lp = norm360(218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000);
  // Mean elongation of the Moon
  const D = norm360(297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000);
  // Sun's mean anomaly
  const M = norm360(357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000);
  // Moon's mean anomaly
  const Mp = norm360(134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000);
  // Moon's argument of latitude
  const F = norm360(93.2720950 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000);

  // Eccentricity of Earth's orbit
  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const E2 = E * E;

  const Dr = D * D2R, Mr = M * D2R, Mpr = Mp * D2R, Fr = F * D2R;

  // Longitude perturbation terms (Meeus Table 47.A) — top 60
  // [D_mult, M_mult, Mp_mult, F_mult, sinCoeff]
  const lonTerms: [number, number, number, number, number][] = [
    [0, 0, 1, 0, 6288774],
    [2, 0, -1, 0, 1274027],
    [2, 0, 0, 0, 658314],
    [0, 0, 2, 0, 213618],
    [0, 1, 0, 0, -185116],
    [0, 0, 0, 2, -114332],
    [2, 0, -2, 0, 58793],
    [2, -1, -1, 0, 57066],
    [2, 0, 1, 0, 53322],
    [2, -1, 0, 0, 45758],
    [0, 1, -1, 0, -40923],
    [1, 0, 0, 0, -34720],
    [0, 1, 1, 0, -30383],
    [2, 0, 0, -2, 15327],
    [0, 0, 1, 2, -12528],
    [0, 0, 1, -2, 10980],
    [4, 0, -1, 0, 10675],
    [0, 0, 3, 0, 10034],
    [4, 0, -2, 0, 8548],
    [2, 1, -1, 0, -7888],
    [2, 1, 0, 0, -6766],
    [1, 0, -1, 0, -5163],
    [1, 1, 0, 0, 4987],
    [2, -1, 1, 0, 4036],
    [2, 0, 2, 0, 3994],
    [4, 0, 0, 0, 3861],
    [2, 0, -3, 0, 3665],
    [0, 1, -2, 0, -2689],
    [2, 0, -1, 2, -2602],
    [2, -1, -2, 0, 2390],
    [1, 0, 1, 0, -2348],
    [2, -2, 0, 0, 2236],
    [0, 1, 2, 0, -2120],
    [0, 2, 0, 0, -2069],
    [2, -2, -1, 0, 2048],
    [2, 0, 1, -2, -1773],
    [2, 0, 0, 2, -1595],
    [4, -1, -1, 0, 1215],
    [0, 0, 2, 2, -1110],
    [3, 0, -1, 0, -892],
    [2, 1, 1, 0, -810],
    [4, -1, -2, 0, 759],
    [0, 2, -1, 0, -713],
    [2, 2, -1, 0, -700],
    [2, 1, -2, 0, 691],
    [2, -1, 0, -2, 596],
    [4, 0, 1, 0, 549],
    [0, 0, 4, 0, 537],
    [4, -1, 0, 0, 520],
    [1, 0, -2, 0, -487],
    [2, 1, 0, -2, -399],
    [0, 0, 2, -2, -381],
    [1, 1, 1, 0, 351],
    [3, 0, -2, 0, -340],
    [4, 0, -3, 0, 330],
    [2, -1, 2, 0, 327],
    [0, 2, 1, 0, -323],
    [1, 1, -1, 0, 299],
    [2, 0, 3, 0, 294],
    [2, 0, -1, -2, 0],
  ];

  let sigmaL = 0;
  for (const [d, m, mp, f, coeff] of lonTerms) {
    const arg = d * Dr + m * Mr + mp * Mpr + f * Fr;
    let term = coeff * Math.sin(arg);
    // Eccentricity correction for terms involving M
    const absM = Math.abs(m);
    if (absM === 1) term *= E;
    else if (absM === 2) term *= E2;
    sigmaL += term;
  }

  // Additional corrections
  const A1 = norm360(119.75 + 131.849 * T) * D2R;
  const A2 = norm360(53.09 + 479264.290 * T) * D2R;
  const A3 = norm360(313.45 + 481266.484 * T) * D2R;

  sigmaL += 3958 * Math.sin(A1)
          + 1962 * Math.sin(Lp * D2R - Fr)
          + 318 * Math.sin(A2);

  return norm360(Lp + sigmaL / 1000000);
}

// ── Tithi Calculation ────────────────────────────────────────
export interface TithiInfo {
  /** 1-15 within the paksha */
  tithiIndex: number;
  /** 1-30 absolute (1=Shukla Pratipada, 30=Amavasya) */
  absoluteTithi: number;
  paksha: 'shukla' | 'krishna';
  /** Elongation in degrees (0-360) */
  elongation: number;
  /** True if Parva tithi (Pacham 5, Atham 8, Chaudas 14, Poonam/Amas 15) */
  isParva: boolean;
}

export function getTithi(jd: number): TithiInfo {
  const sunLon = sunLongitude(jd);
  const moonLon = moonLongitude(jd);
  const elongation = norm360(moonLon - sunLon);

  // Each tithi spans 12°
  const absoluteTithi = Math.floor(elongation / 12) + 1; // 1-30
  const isShukla = absoluteTithi <= 15;
  const tithiIndex = isShukla ? absoluteTithi : absoluteTithi - 15;

  return {
    tithiIndex,
    absoluteTithi,
    paksha: isShukla ? 'shukla' : 'krishna',
    elongation,
    isParva: [5, 8, 14, 15].includes(tithiIndex),
  };
}

// ── Sunrise & Sunset (NOAA algorithm) ────────────────────────
export interface SunTimings {
  sunriseUTC: number; // hours UTC
  sunsetUTC: number;
  sunrise: string; // formatted HH:MM AM/PM IST
  sunset: string;
}

export function calcSunriseSunset(
  jd: number,
  lat: number,
  lon: number,
  tzOffsetHours: number = 5.5 // IST default
): SunTimings {
  const dec = sunDeclination(jd);
  const eot = equationOfTime(jd);

  const latR = lat * D2R;
  const decR = dec * D2R;

  // Hour angle at sunrise/sunset (accounting for refraction + solar disk)
  const cosHA = (Math.sin(-0.8333 * D2R) - Math.sin(latR) * Math.sin(decR))
              / (Math.cos(latR) * Math.cos(decR));

  // Clamp for arctic/antarctic (no sunrise/sunset)
  const haClamp = Math.max(-1, Math.min(1, cosHA));
  const HA = Math.acos(haClamp) * R2D; // degrees

  // Solar noon in minutes from midnight UTC
  const solarNoonMin = 720 - 4 * lon - eot;

  const sunriseMin = solarNoonMin - HA * 4; // each degree = 4 minutes
  const sunsetMin = solarNoonMin + HA * 4;

  const sunriseUTC = sunriseMin / 60;
  const sunsetUTC = sunsetMin / 60;

  return {
    sunriseUTC,
    sunsetUTC,
    sunrise: formatTime(sunriseUTC + tzOffsetHours),
    sunset: formatTime(sunsetUTC + tzOffsetHours),
  };
}

function formatTime(hours: number): string {
  let h = ((hours % 24) + 24) % 24;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  const m = Math.round((hours % 1) * 60);
  const mClamped = m >= 60 ? 59 : m;
  return `${String(Math.floor(h)).padStart(2, '0')}:${String(mClamped).padStart(2, '0')} ${ampm}`;
}

// ── Navkarsi, Porshi, Sadh Porshi, Chauvihar ─────────────────
export interface JainTimings {
  navkarsi: string;   // 48 minutes after sunrise
  porshi: string;     // ~3 hours (1 prahar ≈ 3h) after sunrise
  sadhPorshi: string; // ~4.5 hours after sunrise
  chauvihar: string;  // at sunset
}

export function calcJainTimings(sunriseUTC: number, sunsetUTC: number, tzOffset: number = 5.5): JainTimings {
  const localSunrise = sunriseUTC + tzOffset;
  const localSunset = sunsetUTC + tzOffset;

  // Dynamic day duration based prahar calculation
  const dayDuration = sunsetUTC - sunriseUTC; // hours
  const prahar = dayDuration / 4; // One prahar = 1/4 of daylight

  return {
    navkarsi: formatTime(localSunrise + 48 / 60),       // 48 min after sunrise
    porshi: formatTime(localSunrise + prahar),            // 1 prahar after sunrise
    sadhPorshi: formatTime(localSunrise + prahar * 1.5),  // 1.5 prahars after sunrise
    chauvihar: formatTime(localSunset),                   // at sunset
  };
}

// ── Find JD of next New Moon (Amavasya) near a given JD ─────
export function findNextNewMoon(jdStart: number): number {
  // Walk forward in 0.5-day steps until elongation crosses 0
  let jd = jdStart;
  let prevElong = getTithi(jd).elongation;
  for (let i = 0; i < 60; i++) {
    jd += 0.5;
    const elong = getTithi(jd).elongation;
    if (elong < prevElong && elong < 12) {
      // Refine with bisection
      let lo = jd - 0.5, hi = jd;
      for (let j = 0; j < 20; j++) {
        const mid = (lo + hi) / 2;
        const e = getTithi(mid).elongation;
        if (e > 180) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }
    prevElong = elong;
  }
  return jd;
}

// ── Find JD of next Full Moon (Purnima) near a given JD ─────
export function findNextFullMoon(jdStart: number): number {
  let jd = jdStart;
  for (let i = 0; i < 60; i++) {
    jd += 0.5;
    const elong = getTithi(jd).elongation;
    if (Math.abs(elong - 180) < 6) {
      // Near full moon, refine
      let lo = jd - 0.5, hi = jd + 0.5;
      for (let j = 0; j < 20; j++) {
        const mid = (lo + hi) / 2;
        const e = getTithi(mid).elongation;
        if (e < 180) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }
  }
  return jd;
}
