import { useEffect, useState } from "react";
import { getEntryStore } from "@/lib/store";
import type { EntrySchema } from "@/lib/types";
import DemoStage from "@/components/DemoStage";

interface DemoProps {
  entryId: string;
  schema: EntrySchema;
}

/**
 * material-color-utilities@0.3.0(Apache-2.0)TS 简版移植,与 hct-tonal-palette 条目同一套:
 * 常量与公式逐字对照官方发布源码(utils/color_utils.js、utils/math_utils.js、
 * hct/viewing_conditions.js、hct/hct_solver.js、hct/cam16.js 前向)。
 * 已复核:#6750A4 求解回写一致;#D0BCFF 实测 tone≈80(调研 06§六7)。
 * 变体配方来自 scheme_{tonal_spot,neutral,vibrant,expressive}.js;
 * 角色 tone 映射(contrastLevel 0)来自 material_dynamic_colors.js / dynamic_scheme.js。
 */

const signum = (x: number): number => (x < 0 ? -1 : x > 0 ? 1 : 0);
const lerpN = (start: number, stop: number, amount: number): number => start + (stop - start) * amount;
const clampDouble = (min: number, max: number, x: number): number => Math.min(max, Math.max(min, x));
const sanitizeDegreesDouble = (d: number): number => {
  d = d % 360;
  if (d < 0) d += 360;
  return d;
};
function matrixMultiply(row: number[], m: number[][]): number[] {
  return [
    row[0] * m[0][0] + row[1] * m[0][1] + row[2] * m[0][2],
    row[0] * m[1][0] + row[1] * m[1][1] + row[2] * m[1][2],
    row[0] * m[2][0] + row[1] * m[2][1] + row[2] * m[2][2],
  ];
}

function delinearizedF(c: number): number {
  const n = c / 100;
  return n <= 0.0031308 ? n * 12.92 : 1.055 * Math.pow(n, 1 / 2.4) - 0.055;
}
function delinearized(c: number): number {
  return Math.min(255, Math.max(0, Math.round(delinearizedF(c) * 255)));
}
function labInvf(ft: number): number {
  const e = 216 / 24389;
  const k = 24389 / 27;
  const ft3 = ft * ft * ft;
  return ft3 > e ? ft3 : (116 * ft - 16) / k;
}
const yFromLstar = (l: number): number => 100 * labInvf((l + 16) / 116);
function argbFromRgb(r: number, g: number, b: number): number {
  return ((255 << 24) | ((r & 255) << 16) | ((g & 255) << 8) | (b & 255)) >>> 0;
}
function argbFromLinrgb(lin: number[]): number {
  return argbFromRgb(delinearized(lin[0]), delinearized(lin[1]), delinearized(lin[2]));
}
function argbFromLstar(l: number): number {
  const c = delinearized(yFromLstar(l));
  return argbFromRgb(c, c, c);
}
const rgbOf = (argb: number): [number, number, number] => [(argb >>> 16) & 255, (argb >>> 8) & 255, argb & 255];
const hexOf = (argb: number): string =>
  "#" + rgbOf(argb).map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();

/** hct/viewing_conditions.js 的 ViewingConditions.DEFAULT(make() 默认参数) */
const VC = (() => {
  const whitePoint = [95.047, 100.0, 108.883];
  const La = ((200 / Math.PI) * yFromLstar(50)) / 100;
  const surround = 2.0;
  const rW = whitePoint[0] * 0.401288 + whitePoint[1] * 0.650173 + whitePoint[2] * -0.051461;
  const gW = whitePoint[0] * -0.250268 + whitePoint[1] * 1.204414 + whitePoint[2] * 0.045854;
  const bW = whitePoint[0] * -0.002079 + whitePoint[1] * 0.048952 + whitePoint[2] * 0.953127;
  const f = 0.8 + surround / 10;
  const c = f >= 0.9 ? lerpN(0.59, 0.69, (f - 0.9) * 10) : lerpN(0.525, 0.59, (f - 0.8) * 10);
  let d = f * (1 - (1 / 3.6) * Math.exp((-La - 42) / 92));
  d = clampDouble(0, 1, d);
  const nc = f;
  const rgbD = [d * (100 / rW) + 1 - d, d * (100 / gW) + 1 - d, d * (100 / bW) + 1 - d];
  const k = 1 / (5 * La + 1);
  const k4 = k * k * k * k;
  const k4F = 1 - k4;
  const fl = k4 * La + 0.1 * k4F * k4F * Math.cbrt(5 * La);
  const n = yFromLstar(50) / whitePoint[1];
  const z = 1.48 + Math.sqrt(n);
  const nbb = 0.725 / Math.pow(n, 0.2);
  const rgbAFactors = [
    Math.pow((fl * rgbD[0] * rW) / 100, 0.42),
    Math.pow((fl * rgbD[1] * gW) / 100, 0.42),
    Math.pow((fl * rgbD[2] * bW) / 100, 0.42),
  ];
  const rgbA = [
    (400 * rgbAFactors[0]) / (rgbAFactors[0] + 27.13),
    (400 * rgbAFactors[1]) / (rgbAFactors[1] + 27.13),
    (400 * rgbAFactors[2]) / (rgbAFactors[2] + 27.13),
  ];
  const aw = (2 * rgbA[0] + rgbA[1] + 0.05 * rgbA[2]) * nbb;
  return { n, aw, nbb, ncb: nbb, c, nc, rgbD, fl, z };
})();

const SCALED_DISCOUNT_FROM_LINRGB = [
  [0.001200833568784504, 0.002389694492170889, 0.0002795742885861124],
  [0.0005891086651375999, 0.0029785502573438758, 0.0003270666104008398],
  [0.00010146692491640572, 0.0005364214359186694, 0.0032979401770712076],
];
const LINRGB_FROM_SCALED_DISCOUNT = [
  [1373.2198709594231, -1100.4251190754821, -7.278681089101213],
  [-271.815969077903, 559.6580465940733, -32.46047482791194],
  [1.9622899599665666, -57.173814538844006, 308.7233197812385],
];
const Y_FROM_LINRGB = [0.2126, 0.7152, 0.0722];

function trueDelinearized(c: number): number {
  return delinearizedF(c) * 255;
}
function chromaticAdaptation(c: number): number {
  const af = Math.pow(Math.abs(c), 0.42);
  return (signum(c) * 400 * af) / (af + 27.13);
}
function hueOf(linrgb: number[]): number {
  const sd = matrixMultiply(linrgb, SCALED_DISCOUNT_FROM_LINRGB);
  const rA = chromaticAdaptation(sd[0]);
  const gA = chromaticAdaptation(sd[1]);
  const bA = chromaticAdaptation(sd[2]);
  const a = (11 * rA - 12 * gA + bA) / 11;
  const b = (rA + gA - 2 * bA) / 9;
  return Math.atan2(b, a);
}
const sanitizeRadians = (a: number): number => (a + Math.PI * 8) % (Math.PI * 2);
const areInCyclicOrder = (a: number, b: number, c: number): boolean =>
  sanitizeRadians(b - a) < sanitizeRadians(c - a);
const intercept = (src: number, mid: number, tgt: number): number => (mid - src) / (tgt - src);
function lerpPoint(src: number[], t: number, tgt: number[]): number[] {
  return [src[0] + (tgt[0] - src[0]) * t, src[1] + (tgt[1] - src[1]) * t, src[2] + (tgt[2] - src[2]) * t];
}
function setCoordinate(src: number[], coord: number, tgt: number[], axis: number): number[] {
  return lerpPoint(src, intercept(src[axis], coord, tgt[axis]), tgt);
}
const isBounded = (x: number): boolean => 0 <= x && x <= 100;
function nthVertex(y: number, n: number): number[] {
  const kR = Y_FROM_LINRGB[0];
  const kG = Y_FROM_LINRGB[1];
  const kB = Y_FROM_LINRGB[2];
  const coordA = n % 4 <= 1 ? 0 : 100;
  const coordB = n % 2 === 0 ? 0 : 100;
  if (n < 4) {
    const g = coordA;
    const b = coordB;
    const r = (y - g * kG - b * kB) / kR;
    return isBounded(r) ? [r, g, b] : [-1, -1, -1];
  } else if (n < 8) {
    const b = coordA;
    const r = coordB;
    const g = (y - r * kR - b * kB) / kG;
    return isBounded(g) ? [r, g, b] : [-1, -1, -1];
  }
  const r = coordA;
  const g = coordB;
  const b = (y - r * kR - g * kG) / kB;
  return isBounded(b) ? [r, g, b] : [-1, -1, -1];
}
function bisectToSegment(y: number, targetHue: number): number[][] {
  let left = [-1, -1, -1];
  let right = left;
  let leftHue = 0;
  let rightHue = 0;
  let initialized = false;
  let uncut = true;
  for (let n = 0; n < 12; n++) {
    const mid = nthVertex(y, n);
    if (mid[0] < 0) continue;
    const midHue = hueOf(mid);
    if (!initialized) {
      left = mid;
      right = mid;
      leftHue = midHue;
      rightHue = midHue;
      initialized = true;
      continue;
    }
    if (uncut || areInCyclicOrder(leftHue, midHue, rightHue)) {
      uncut = false;
      if (areInCyclicOrder(leftHue, targetHue, midHue)) {
        right = mid;
        rightHue = midHue;
      } else {
        left = mid;
        leftHue = midHue;
      }
    }
  }
  return [left, right];
}
const midpoint = (a: number[], b: number[]): number[] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
const criticalPlaneBelow = (x: number): number => Math.floor(x - 0.5);
const criticalPlaneAbove = (x: number): number => Math.ceil(x - 0.5);
function bisectToLimit(y: number, targetHue: number): number[] {
  const segment = bisectToSegment(y, targetHue);
  let left = segment[0];
  let leftHue = hueOf(left);
  let right = segment[1];
  for (let axis = 0; axis < 3; axis++) {
    if (left[axis] !== right[axis]) {
      let lPlane = -1;
      let rPlane = 255;
      if (left[axis] < right[axis]) {
        lPlane = criticalPlaneBelow(trueDelinearized(left[axis]));
        rPlane = criticalPlaneAbove(trueDelinearized(right[axis]));
      } else {
        lPlane = criticalPlaneAbove(trueDelinearized(left[axis]));
        rPlane = criticalPlaneBelow(trueDelinearized(right[axis]));
      }
      for (let i = 0; i < 8; i++) {
        if (Math.abs(rPlane - lPlane) <= 1) break;
        const mPlane = Math.floor((lPlane + rPlane) / 2);
        const mid = setCoordinate(left, CRITICAL_PLANES[mPlane], right, axis);
        const midHue = hueOf(mid);
        if (areInCyclicOrder(leftHue, targetHue, midHue)) {
          right = mid;
          rPlane = mPlane;
        } else {
          left = mid;
          leftHue = midHue;
          lPlane = mPlane;
        }
      }
    }
  }
  return midpoint(left, right);
}
function inverseChromaticAdaptation(adapted: number): number {
  const a = Math.abs(adapted);
  const base = Math.max(0, (27.13 * a) / (400 - a));
  return signum(adapted) * Math.pow(base, 1 / 0.42);
}
function findResultByJ(hueRadians: number, chroma: number, y: number): number {
  let j = Math.sqrt(y) * 11;
  const tInnerCoeff = 1 / Math.pow(1.64 - Math.pow(0.29, VC.n), 0.73);
  const eHue = 0.25 * (Math.cos(hueRadians + 2) + 3.8);
  const p1 = eHue * (50000 / 13) * VC.nc * VC.ncb;
  const hSin = Math.sin(hueRadians);
  const hCos = Math.cos(hueRadians);
  for (let round = 0; round < 5; round++) {
    const jN = j / 100;
    const alpha = chroma === 0 || j === 0 ? 0 : chroma / Math.sqrt(jN);
    const t = Math.pow(alpha * tInnerCoeff, 1 / 0.9);
    const ac = VC.aw * Math.pow(jN, 1 / VC.c / VC.z);
    const p2 = ac / VC.nbb;
    const gamma = (23 * (p2 + 0.305) * t) / (23 * p1 + 11 * t * hCos + 108 * t * hSin);
    const a = gamma * hCos;
    const b = gamma * hSin;
    const rA = (460 * p2 + 451 * a + 288 * b) / 1403;
    const gA = (460 * p2 - 891 * a - 261 * b) / 1403;
    const bA = (460 * p2 - 220 * a - 6300 * b) / 1403;
    const lin = matrixMultiply(
      [inverseChromaticAdaptation(rA), inverseChromaticAdaptation(gA), inverseChromaticAdaptation(bA)],
      LINRGB_FROM_SCALED_DISCOUNT,
    );
    if (lin[0] < 0 || lin[1] < 0 || lin[2] < 0) return 0;
    const fnj = Y_FROM_LINRGB[0] * lin[0] + Y_FROM_LINRGB[1] * lin[1] + Y_FROM_LINRGB[2] * lin[2];
    if (fnj <= 0) return 0;
    if (round === 4 || Math.abs(fnj - y) < 0.002) {
      if (lin[0] > 100.01 || lin[1] > 100.01 || lin[2] > 100.01) return 0;
      return argbFromLinrgb(lin);
    }
    j = j - ((fnj - y) * j) / (2 * fnj);
  }
  return 0;
}
function solveToInt(hueDegrees: number, chroma: number, lstar: number): number {
  if (chroma < 0.0001 || lstar < 0.0001 || lstar > 99.9999) {
    return argbFromLstar(lstar);
  }
  hueDegrees = sanitizeDegreesDouble(hueDegrees);
  const hueRadians = (hueDegrees / 180) * Math.PI;
  const y = yFromLstar(lstar);
  const exact = findResultByJ(hueRadians, chroma, y);
  if (exact !== 0) return exact;
  return argbFromLinrgb(bisectToLimit(y, hueRadians));
}

// hct_solver.js 发布源码中的 CRITICAL_PLANES(逐字复制,255 项)
const CRITICAL_PLANES: number[] = [
  0.015176349177441876, 0.045529047532325624, 0.07588174588720938, 0.10623444424209313,
  0.13658714259697685, 0.16693984095186062, 0.19729253930674434, 0.2276452376616281,
  0.2579979360165119, 0.28835063437139563, 0.3188300904430532, 0.350925934958123,
  0.3848314933096426, 0.42057480301049466, 0.458183274052838, 0.4976837250274023,
  0.5391024159806381, 0.5824650784040898, 0.6277969426914107, 0.6751227633498623,
  0.7244668422128921, 0.775853049866786, 0.829304845476233, 0.8848452951698498,
  0.942497089126609, 1.0022825574869039, 1.0642236851973577, 1.1283421258858297,
  1.1946592148522128, 1.2631959812511864, 1.3339731595349034, 1.407011200216447,
  1.4823302800086415, 1.5599503113873272, 1.6398909516233677, 1.7221716113234105,
  1.8068114625156377, 1.8938294463134073, 1.9832442801866852, 2.075074464868551,
  2.1693382909216234, 2.2660538449872063, 2.36523901573795, 2.4669114995532007,
  2.5710888059345764, 2.6777882626779785, 2.7870270208169257, 2.898822059350997,
  3.0131901897720907, 3.1301480604002863, 3.2497121605402226, 3.3718988244681087,
  3.4967242352587946, 3.624204428461639, 3.754355295633311, 3.887192587735158,
  4.022731918402185, 4.160988767090289, 4.301978482107941, 4.445716283538092,
  4.592217266055746, 4.741496401646282, 4.893568542229298, 5.048448422192488,
  5.20615066083972, 5.3666897647573375, 5.5300801301023865, 5.696336044816294,
  5.865471690767354, 6.037501145825082, 6.212438385869475, 6.390297286737924,
  6.571091626112461, 6.7548350853498045, 6.941541251256611, 7.131223617812143,
  7.323895587840543, 7.5195704746346665, 7.7182615035334345, 7.919981813454504,
  8.124744458384042, 8.332562408825165, 8.543448553206703, 8.757415699253682,
  8.974476575321063, 9.194643831691977, 9.417930041841839, 9.644347703669503,
  9.873909240696694, 10.106627003236781, 10.342513269534024, 10.58158024687427,
  10.8238400726681, 11.069304815507364, 11.317986476196008, 11.569896988756009,
  11.825048221409341, 12.083451977536606, 12.345119996613247, 12.610063955123938,
  12.878295467455942, 13.149826086772048, 13.42466730586372, 13.702830557985108,
  13.984327217668513, 14.269168601521828, 14.55736596900856, 14.848930523210871,
  15.143873411576273, 15.44220572664832, 15.743938506781891, 16.04908273684337,
  16.35764934889634, 16.66964922287304, 16.985093187232053, 17.30399201960269,
  17.62635644741625, 17.95219714852476, 18.281524751807332, 18.614349837764564,
  18.95068293910138, 19.290534541298456, 19.633915083172692, 19.98083495742689,
  20.331304511189067, 20.685334046541502, 21.042933821039977, 21.404114048223256,
  21.76888489811322, 22.137256497705877, 22.50923893145328, 22.884842241736916,
  23.264076429332462, 23.6469514538663, 24.033477234264016, 24.42366364919083,
  24.817520537484558, 25.21505769858089, 25.61628489293138, 26.021211842414342,
  26.429848230738664, 26.842203703840827, 27.258287870275353, 27.678110301598522,
  28.10168053274597, 28.529008062403893, 28.96010235337422, 29.39497283293396,
  29.83362889318845, 30.276079891419332, 30.722335150426627, 31.172403958865512,
  31.62629557157785, 32.08401920991837, 32.54558406207592, 33.010999283389665,
  33.4802739966603, 33.953417292456834, 34.430438229418264, 34.911345834551085,
  35.39614910352207, 35.88485700094671, 36.37747846067349, 36.87402238606382,
  37.37449765026789, 37.87891309649659, 38.38727753828926, 38.89959975977785,
  39.41588851594697, 39.93615253289054, 40.460400508064545, 40.98864111053629,
  41.520882981230194, 42.05713473317016, 42.597404951718396, 43.141702194811224,
  43.6900349931913, 44.24241185063697, 44.798841244188324, 45.35933162437017,
  45.92389141541209, 46.49252901546552, 47.065252796817916, 47.64207110610409,
  48.22299226451468, 48.808024568002054, 49.3971762874833, 49.9904556690408,
  50.587870934119984, 51.189430279724725, 51.79514187861014, 52.40501387947288,
  53.0190544071392, 53.637271562750364, 54.259673423945976, 54.88626804504493,
  55.517063457223934, 56.15206766869424, 56.79128866487574, 57.43473440856916,
  58.08241284012621, 58.734331877617365, 59.39049941699807, 60.05092333227251,
  60.715611475655585, 61.38457167773311, 62.057811747619894, 62.7353394731159,
  63.417162620860914, 64.10328893648692, 64.79372614476921, 65.48848194977529,
  66.18756403501224, 66.89098006357258, 67.59873767827808, 68.31084450182222,
  69.02730813691093, 69.74813616640164, 70.47333615344107, 71.20291564160104,
  71.93688215501312, 72.67524319850172, 73.41800625771542, 74.16517879925733,
  74.9167682708136, 75.67278210128072, 76.43322770089146, 77.1981124613393,
  77.96744375590167, 78.74122893956174, 79.51947534912904, 80.30219030335869,
  81.08938110306934, 81.88105503125999, 82.67721935322541, 83.4778813166706,
  84.28304815182372, 85.09272707154808, 85.90692527145302, 86.72564993000343,
  87.54890820862819, 88.3767072518277, 89.2090541872801, 90.04595612594655,
  90.88742016217518, 91.73345337380438, 92.58406282226491, 93.43925555268066,
  94.29903859396902, 95.16341895893969, 96.03240364439274, 96.9059996312159,
  97.78421388448044, 98.6670533535366, 99.55452497210776,
];

// ---- dynamic_scheme.js 的 getRotatedHue ----
function getRotatedHue(sourceHue: number, hues: number[], rotations: number[]): number {
  for (let i = 0; i <= hues.length - 2; i++) {
    if (hues[i] < sourceHue && sourceHue < hues[i + 1]) {
      return sanitizeDegreesDouble(sourceHue + rotations[i]);
    }
  }
  return sourceHue;
}

// ---- scheme_{tonal_spot,neutral,vibrant,expressive}.js 的调色板配方 ----
interface Palettes {
  primary: [number, number];
  secondary: [number, number];
  tertiary: [number, number];
  neutral: [number, number];
  nv: [number, number];
}
const VIBRANT_HUES = [0.0, 41.0, 61.0, 101.0, 131.0, 181.0, 251.0, 301.0, 360.0];
const VIBRANT_SEC = [18.0, 15.0, 10.0, 12.0, 15.0, 18.0, 15.0, 12.0, 12.0];
const VIBRANT_TER = [35.0, 30.0, 20.0, 25.0, 30.0, 35.0, 30.0, 25.0, 25.0];
const EXPRESSIVE_HUES = [0.0, 21.0, 51.0, 121.0, 151.0, 191.0, 271.0, 321.0, 360.0];
const EXPRESSIVE_SEC = [45.0, 95.0, 45.0, 20.0, 45.0, 90.0, 45.0, 45.0, 45.0];
const EXPRESSIVE_TER = [120.0, 120.0, 20.0, 45.0, 20.0, 15.0, 20.0, 120.0, 120.0];

function palettesFor(variant: string, hue: number): Palettes {
  switch (variant) {
    case "neutral":
      return {
        primary: [hue, 12.0],
        secondary: [hue, 8.0],
        tertiary: [hue, 16.0],
        neutral: [hue, 2.0],
        nv: [hue, 2.0],
      };
    case "vibrant":
      return {
        primary: [hue, 200.0], // 求解器按各 tone 可达色度截断(官方行为)
        secondary: [getRotatedHue(hue, VIBRANT_HUES, VIBRANT_SEC), 24.0],
        tertiary: [getRotatedHue(hue, VIBRANT_HUES, VIBRANT_TER), 32.0],
        neutral: [hue, 10.0],
        nv: [hue, 12.0],
      };
    case "expressive":
      return {
        primary: [sanitizeDegreesDouble(hue + 240.0), 40.0],
        secondary: [getRotatedHue(hue, EXPRESSIVE_HUES, EXPRESSIVE_SEC), 24.0],
        tertiary: [getRotatedHue(hue, EXPRESSIVE_HUES, EXPRESSIVE_TER), 32.0],
        neutral: [sanitizeDegreesDouble(hue + 15.0), 8.0],
        nv: [sanitizeDegreesDouble(hue + 15.0), 12.0],
      };
    default: // tonal-spot
      return {
        primary: [hue, 36.0],
        secondary: [hue, 16.0],
        tertiary: [sanitizeDegreesDouble(hue + 60.0), 24.0],
        neutral: [hue, 6.0],
        nv: [hue, 8.0],
      };
  }
}

// ---- material_dynamic_colors.js 的角色 tone(contrastLevel 0)----
// error 调色板固定 (25, 84)(dynamic_scheme.js 构造器)
interface Role {
  key: string;
  palette: "primary" | "secondary" | "tertiary" | "error" | "neutral" | "nv";
  tone: { light: number; dark: number };
}
const ROLES: Role[] = [
  { key: "primary", palette: "primary", tone: { light: 40, dark: 80 } },
  { key: "on-primary", palette: "primary", tone: { light: 100, dark: 20 } },
  { key: "primary-container", palette: "primary", tone: { light: 90, dark: 30 } },
  { key: "on-primary-container", palette: "primary", tone: { light: 30, dark: 90 } },
  { key: "secondary", palette: "secondary", tone: { light: 40, dark: 80 } },
  { key: "secondary-container", palette: "secondary", tone: { light: 90, dark: 30 } },
  { key: "tertiary", palette: "tertiary", tone: { light: 40, dark: 80 } },
  { key: "error", palette: "error", tone: { light: 40, dark: 80 } },
  { key: "error-container", palette: "error", tone: { light: 90, dark: 30 } },
  { key: "surface", palette: "neutral", tone: { light: 98, dark: 6 } },
  { key: "on-surface", palette: "neutral", tone: { light: 10, dark: 90 } },
  { key: "surface-variant", palette: "nv", tone: { light: 90, dark: 30 } },
  { key: "on-surface-variant", palette: "nv", tone: { light: 30, dark: 80 } },
  { key: "outline", palette: "nv", tone: { light: 50, dark: 60 } },
];
// ink 色按 tone(= CIE L*)的相对亮度判定,保证示例文字在角色底上可读
const inkFor = (tone: number): string =>
  yFromLstar(tone) / 100 >= 0.42 ? "#1b1b1f" : "#f4f2f7";

const css = `
.md-stage { position: absolute; inset: 0; display: flex; gap: 14px; padding: 16px; align-items: stretch; }
.md-mock { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; }
.md-card {
  width: min(300px, 100%);
  border-radius: 18px;
  padding: 20px 20px 18px;
  box-shadow: 0 6px 22px rgb(0 0 0 / 0.28);
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
  border: 1px solid transparent;
}
.md-card h4 { margin: 0 0 6px; font-size: 16px; font-weight: 650; transition: color 0.18s ease; }
.md-card p { margin: 0 0 14px; font-size: 12px; line-height: 1.55; opacity: 0.9; transition: color 0.18s ease; }
.md-chip {
  display: inline-block;
  border-radius: 9px;
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 600;
  margin-bottom: 14px;
  transition: background-color 0.18s ease, color 0.18s ease;
}
.md-actions { display: flex; gap: 10px; align-items: center; }
.md-btn {
  border: 0; border-radius: 999px;
  padding: 9px 20px;
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;
}
.md-fab {
  width: 40px; height: 40px; flex: none;
  border: 0; border-radius: 14px;
  margin-left: auto;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  transition: background-color 0.18s ease, color 0.18s ease;
}
.md-roles { flex: 1.25; min-width: 0; display: flex; flex-direction: column; justify-content: center; gap: 7px; }
.md-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.md-cell {
  border-radius: 9px;
  padding: 8px 10px;
  display: flex; flex-direction: column; gap: 1px;
  min-width: 0;
  transition: background-color 0.18s ease, color 0.18s ease;
}
.md-cell > b { font-size: 11px; font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.md-cell > span { font-size: 10px; font-family: ui-monospace, "JetBrains Mono", Consolas, monospace; opacity: 0.78; }
.md-baseline { font-size: 10.5px; line-height: 1.55; color: var(--text-faint); }
@media (max-width: 760px) {
  .md-stage { flex-direction: column; overflow: auto; }
  .md-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .md-card, .md-card h4, .md-card p, .md-chip, .md-btn, .md-fab, .md-cell { transition: none; }
}
`;

/**
 * M3 动态取色演示:sourceHue + variant 生成 5 个关键色调色板,scheme 决定角色 tone,
 * 输出 14 个关键角色色并用其拼装迷你界面卡。角色名/档位与官方库 material_dynamic_colors.js
 * (contrastLevel 0)一致;官方手调基线值(调研 06§六7)以脚注并列呈现,不冒充生成值。
 */
export default function Demo({ entryId, schema }: DemoProps) {
  const store = getEntryStore(entryId, schema);
  const [, setTick] = useState(0);

  useEffect(
    () =>
      store.subscribe(() => {
        setTick((n) => n + 1);
      }),
    [store],
  );

  const sourceHue = store.get("sourceHue") as number;
  const variant = store.get("variant") as string;
  const isDark = (store.get("scheme") as string) === "dark";

  const pals = palettesFor(variant, sourceHue);
  const paletteFor = (p: Role["palette"]): [number, number] =>
    p === "error" ? [25.0, 84.0] : pals[p];
  const toneOf = (role: Role): number => (isDark ? role.tone.dark : role.tone.light);
  const argbOf = (role: Role): number => {
    const [h, c] = paletteFor(role.palette);
    return solveToInt(h, c, toneOf(role));
  };

  const roleCells = ROLES.map((role) => {
    const argb = argbOf(role);
    return { role, tone: toneOf(role), hex: hexOf(argb), argb };
  });
  const cellStyle = (argb: number, tone: number) => ({
    backgroundColor: hexOf(argb),
    color: inkFor(tone),
  });

  const surface = roleCells.find((c) => c.role.key === "surface")!;
  const onSurface = roleCells.find((c) => c.role.key === "on-surface")!;
  const onSurfaceVariant = roleCells.find((c) => c.role.key === "on-surface-variant")!;
  const primary = roleCells.find((c) => c.role.key === "primary")!;
  const onPrimary = roleCells.find((c) => c.role.key === "on-primary")!;
  const primaryContainer = roleCells.find((c) => c.role.key === "primary-container")!;
  const onPrimaryContainer = roleCells.find((c) => c.role.key === "on-primary-container")!;
  const secondaryContainer = roleCells.find((c) => c.role.key === "secondary-container")!;
  const tertiary = roleCells.find((c) => c.role.key === "tertiary")!;
  const outline = roleCells.find((c) => c.role.key === "outline")!;

  return (
    <DemoStage entryId={entryId} schema={schema}>
      <div className="md-stage">
        <div className="md-mock">
          <div
            className="md-card"
            style={{
              backgroundColor: surface.hex,
              color: onSurface.hex,
              borderColor: outline.hex,
            }}
          >
            <h4 style={{ color: onSurface.hex }}>动态取色 Dynamic color</h4>
            <p style={{ color: onSurfaceVariant.hex }}>
              壁纸 → source → 调色板 → 角色 / wallpaper → source → palettes → roles
            </p>
            <span className="md-chip" style={{ backgroundColor: secondaryContainer.hex, color: inkFor(secondaryContainer.tone) }}>
              secondary-container
            </span>
            <div className="md-actions">
              <button type="button" className="md-btn" style={{ backgroundColor: primary.hex, color: onPrimary.hex }}>
                主操作 Action
              </button>
              <span
                className="md-fab"
                aria-hidden="true"
                style={{ backgroundColor: tertiary.hex, color: inkFor(tertiary.tone) }}
              >
                ✦
              </span>
            </div>
            <div className="md-chip" style={{ backgroundColor: primaryContainer.hex, color: onPrimaryContainer.hex, marginTop: 12 }}>
              primary-container
            </div>
          </div>
        </div>
        <div className="md-roles">
          <div className="md-grid">
            {roleCells.map((c) => (
              <div key={c.role.key} className="md-cell" style={cellStyle(c.argb, c.tone)}>
                <b>
                  {c.role.key} · t{c.tone}
                </b>
                <span>{c.hex}</span>
              </div>
            ))}
          </div>
          <p className="md-baseline">
            官方手调基线参照(调研 06§六7):亮 primary #6750A4 · primary-container #EADDFF · surface #FFFBFE;暗 primary #D0BCFF(≈tone 80)· surface-variant #49454F。变体管线生成值与基线接近但不逐值相等(基线 primary chroma≈48 / 变体 36;neutral≈4 / 6)。
            Hand-tuned baseline for reference: light primary #6750A4 · surface #FFFBFE; dark primary #D0BCFF (≈tone 80). Generated values sit close to but not exactly on the baseline (baseline primary chroma≈48 / variant 36; neutral≈4 / 6).
          </p>
        </div>
      </div>
      <style>{css}</style>
    </DemoStage>
  );
}
