import cv, { MinMaxLoc, Rect } from "@techstark/opencv-js";
import Tesseract, { createWorker } from "tesseract.js";
import { setKeyType, slotKeyType } from "../consts/Artifact";
import { statKeyType } from "../consts/Stat";
import { ArtifactType } from "../types/Artifact";
import { Language } from "../types/Language";
import { SubstatType } from "../types/Substat";
import { imshowTrimmed } from "./opencv";
import { isAlphabet } from "./string";
import { str2artifactSet, str2stat, str2stats } from "./strToArtifact";
import setChars from "../consts/set-charlist.json";

//PROCESSED
export type ArtifactScanOut = {
  setKey: ScanResSetKey;
  rarity: ScanResNum;
  level: ScanResNum;
  slotKey: ScanResSlotKey;
  mainStatKey: ScanResStatKey;
  substats: ScanResStat[];
  warning: string[];
  error: string[];
};

//scale change sample size: larger precise, smaller faster
export type ArtifactScanStrOut = {
  name: ScanRes;
  slot: ScanRes;
  mainKey: ScanRes;
  mainValue: ScanRes;
  star: ScanRes;
  level: ScanRes;
  substat: ScanRes;
};

export const ScanRes2GOOD = (scanned: ArtifactScanOut): ArtifactType => {
  return {
    setKey: scanned.setKey.key,
    rarity: scanned.rarity.value as 1 | 2 | 3 | 4 | 5,
    level: scanned.level.value,
    slotKey: scanned.slotKey.value,
    mainStatKey: scanned.mainStatKey.key,
    substats: scanned.substats.map((substat) => {
      return { key: substat.key, value: substat.value } as SubstatType;
    }),
  };
};

export const ArtifactScan = async (
  src: cv.Mat,
  scale: number,
  left: cv.Mat,
  right: cv.Mat,
  mid: cv.Mat,
  buf: React.RefObject<HTMLCanvasElement>,
  worker?: Tesseract.Worker,
  setProgress?: (value: number) => void
) => {
  let strs = await ArtifactScanStr(
    src,
    scale,
    left,
    right,
    mid,
    buf,
    worker,
    setProgress
  );

  console.log(strs);

  let warning: string[] = [];
  let error: string[] = [];

  let lang: Language = isAlphabet(strs.name.value.charAt(0)) ? "en" : "ja";
  let res = {} as ArtifactScanOut;
  let set = str2artifactSet(strs.name.value, lang);
  res.setKey = { key: set.key, confidence: set.confidence };
  res.slotKey = { value: set.slot, confidence: set.confidence };
  if (set.confidence < 0.6)
    set.confidence > 0.4
      ? warning.push("set", "slot")
      : error.push("set", "slot");
  res.rarity = {
    value: strs.star.value.replace(/\s/g, "").length,
    confidence: strs.star.confidence,
  };
  if (strs.star.confidence < 0.5)
    strs.star.confidence > 0.3 ? warning.push("star") : error.push("star");
  //could compare with main stat and improve accuracy
  res.level = {
    value: Number(strs.level.value.replace(/^\D+/g, "")),
    confidence: strs.level.confidence,
  };
  if (strs.level.confidence < 0.8)
    strs.level.confidence > 0.5 ? warning.push("level") : error.push("level");
  let mainstat = str2stat(
    strs.mainKey.value + "+" + strs.mainValue.value,
    lang
  );
  res.mainStatKey = { key: mainstat.key, confidence: mainstat.confidence };
  if (mainstat.confidence < 0.6)
    mainstat.confidence > 0.3
      ? warning.push("mainstat")
      : error.push("mainstat");

  res.substats = str2stats(strs.substat.value, lang);
  res.substats.forEach((stat, i) => {
    if (stat.confidence < 0.8)
      stat.confidence > 0.5
        ? warning.push(`substat${i}`)
        : error.push(`substat${i}`);
  });
  res.warning = warning;
  res.error = error;

  return res;
};

export const ArtifactScanStr = async (
  src_: cv.Mat,
  scale: number,
  left: cv.Mat,
  right: cv.Mat,
  mid: cv.Mat,
  buf: React.RefObject<HTMLCanvasElement>,
  worker?: Tesseract.Worker,
  setProgress?: (value: number) => void
) => {
  let time = performance.now();
  setProgress && setProgress(0);
  let src = new cv.Mat();
  let small = new cv.Mat();
  src_.copyTo(src);

  let res = {} as ArtifactScanStrOut;

  const resize = () => {
    let aspect = src.size().width / src.size().height;
    cv.resize(src, small, new cv.Size((720 / 2) * aspect, 720 / 2)); //* RESIZE FOR FASTER RES,
    cv.resize(src, src, new cv.Size(720 * scale * aspect, 720 * scale)); //* RESIZE FOR FASTER RES,
  };

  let dst = new cv.Mat();
  let mask = new cv.Mat();

  const rightMatch = async () => {
    cv.matchTemplate(small, right, dst, cv.TM_CCOEFF_NORMED, mask);
    let result = cv.minMaxLoc(dst, mask) as any as MinMaxLoc;
    return result.maxLoc.x + right.cols;
  };
  const leftMatch = async () => {
    cv.matchTemplate(small, left, dst, cv.TM_CCOEFF_NORMED, mask);
    let result = cv.minMaxLoc(dst, mask) as any as MinMaxLoc;
    return result.maxLoc.x;
  };

  resize();
  setProgress && setProgress(10);
  // console.log(performance.now() - time, src.size());
  // time = performance.now();

  const [rightright, leftleft] = await Promise.all([rightMatch(), leftMatch()]);
  setProgress && setProgress(30);
  // console.log(performance.now() - time, "left right match");
  // time = performance.now();

  let slimRect = new cv.Rect(
    leftleft * scale * 2,
    0,
    (rightright - leftleft) * scale * 2,
    src.size().height
  );
  let slimImg = src.roi(slimRect);
  //*RESIZE AFTER CLOP!!!!!!!!!
  let aspect = slimImg.size().width / slimImg.size().height;

  cv.resize(slimImg, slimImg, new cv.Size(352 * scale, (352 * scale) / aspect));

  cv.matchTemplate(slimImg, mid, dst, cv.TM_CCOEFF, mask);
  let result = cv.minMaxLoc(dst, mask) as any as MinMaxLoc;
  let maxPoint = result.maxLoc;
  let point = new cv.Point(maxPoint.x + mid.cols, maxPoint.y + mid.rows);
  setProgress && setProgress(40);
  // console.log(performance.now() - time, "slimmed");
  // time = performance.now();

  let midSeparator = maxPoint.y + mid.rows / 2;
  let topHalfHeight = 189;
  let topHalfBottom = 156;
  let topHalfR = new cv.Rect(
    12,
    midSeparator - topHalfHeight * scale,
    328 * scale,
    (topHalfHeight + topHalfBottom) * scale
  );
  let trimmedImg = slimImg.roi(topHalfR);
  cv.cvtColor(trimmedImg, trimmedImg, cv.COLOR_BGR2GRAY);
  setProgress && setProgress(50);
  // console.log(performance.now() - time, "trimmed");
  // time = performance.now();

  let name1p = new cv.Point(17 * scale, 2 * scale);
  let name2p = new cv.Point((17 + 295) * scale, (2 + 34) * scale);
  let part1p = new cv.Point(16 * scale, 46 * scale);
  let part2p = new cv.Point((16 + 130) * scale, (46 + 18) * scale);
  let mainKey1p = new cv.Point(16 * scale, 100 * scale);
  let mainKey2p = new cv.Point((16 + 130) * scale, (100 + 18) * scale);
  let mainValue1p = new cv.Point(16 * scale, 118 * scale);
  let mainValue2p = new cv.Point((16 + 102) * scale, (118 + 32) * scale);
  let star1p = new cv.Point(16 * scale, 156 * scale);
  let star2p = new cv.Point((16 + 116) * scale, (156 + 24) * scale);
  let level1p = new cv.Point(24 * scale, 208 * scale);
  let level2p = new cv.Point((24 + 34) * scale, (208 + 16) * scale);
  let substat1p = new cv.Point(32 * scale, 237 * scale);
  let substat2p = new cv.Point((32 + 198) * scale, (237 + 106) * scale);

  if (worker === undefined) {
    worker = await createWorker(); //{logger: (m) => console.log(m), // Add logger here}
    await worker.loadLanguage("eng+jpn");
    await worker.initialize("eng+jpn");
  }
  setProgress && setProgress(60);
  // console.log(performance.now() - time, "worker initialized");
  // time = performance.now();

  const fname = async () => {
    imshowTrimmed(buf, trimmedImg, 0.75, -180, name1p, name2p);
    await worker!.setParameters({
      tessedit_char_whitelist: setChars,
    });
    let result = await worker!.recognize(buf.current!.toDataURL()); //, "jpn"
    await worker!.setParameters({
      tessedit_char_whitelist: undefined,
    });
    res.name = { value: result.data.text, confidence: result.data.confidence };
  };
  const fslot = async () => {
    imshowTrimmed(buf, trimmedImg, 1, -180, part1p, part2p);
    let result = await worker!.recognize(buf.current!.toDataURL()); //, "jpn"
    res.slot = { value: result.data.text, confidence: result.data.confidence };
  };

  const fmainKey = async () => {
    imshowTrimmed(buf, trimmedImg, 1, -135, mainKey1p, mainKey2p);
    let result = await worker!.recognize(buf.current!.toDataURL()); //, "jpn" //nograyscale
    res.mainKey = {
      value: result.data.text,
      confidence: result.data.confidence,
    };
  };
  const fmainValue = async () => {
    imshowTrimmed(buf, trimmedImg, 0.75, -180, mainValue1p, mainValue2p);
    let result = await worker!.recognize(buf.current!.toDataURL());
    res.mainValue = {
      value: result.data.text,
      confidence: result.data.confidence,
    };
  };

  const fstar = async () => {
    imshowTrimmed(buf, trimmedImg, 1, -150, star1p, star2p);
    let result = await worker!.recognize(buf.current!.toDataURL()); //, "chi_tra"
    res.star = { value: result.data.text, confidence: result.data.confidence };
  };

  const flevel = async () => {
    imshowTrimmed(buf, trimmedImg, 1, -150, level1p, level2p);
    await worker!.setParameters({
      tessedit_char_whitelist: "+0123456789",
    });
    let result = await worker!.recognize(buf.current!.toDataURL()); //nograyscale
    await worker!.setParameters({
      tessedit_char_whitelist: undefined,
    });
    res.level = { value: result.data.text, confidence: result.data.confidence };
  };

  const fsubstat = async () => {
    imshowTrimmed(buf, trimmedImg, 1, 140, substat1p, substat2p);
    let result = await worker!.recognize(buf.current!.toDataURL()); //, "jpn"
    res.substat = {
      value: result.data.text,
      confidence: result.data.confidence,
    };
  };

  // setProgress && setProgress(70);
  //console.log(performance.now() - time, "Start tesseract");
  // time = performance.now();
  await fname();
  await fslot();
  await fmainKey();
  await fmainValue();
  await fstar();
  await flevel();
  await fsubstat();

  //await worker.terminate();
  setProgress && setProgress(100);
  // console.log(performance.now() - time, "end tesseract");
  // time = performance.now();
  return res;
};

export type ScanRes = {
  value: string;
  confidence: number;
};

export type ScanResSlotKey = {
  value: slotKeyType;
  confidence: number;
};
export type ScanResNum = {
  value: number;
  confidence: number;
};

export type ScanResSetKey = {
  key: setKeyType;
  confidence: number;
};

export type ScanResStat = {
  key: statKeyType;
  value: number;
  confidence: number;
};

export type ScanResStatKey = {
  key: statKeyType;
  confidence: number;
};
