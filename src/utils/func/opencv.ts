import cv, { Mat, Point, Rect } from "@techstark/opencv-js";

export const imreadUrl = async (url: string): Promise<Mat> => {
  let e = await loadImage(url);
  //console.log(e.target);
  return cv.imread(e.target as HTMLElement);
};

export const loadImage = (src: string): Promise<Event> => {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = (e) => resolve(e);
    i.onerror = (e) => reject(e);
    i.src = src;
  });
};

export const imshowTrimmed = (
  ref: React.RefObject<HTMLCanvasElement>,
  src: Mat,
  scale: number,
  threshold: number,
  p1: Point,
  p2: Point
) => {
  let i = src.roi(new Rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y));
  cv.resize(i, i, new cv.Size(i.size().width * scale, i.size().height * scale));
  cv.threshold(
    i,
    i,
    Math.abs(threshold),
    255,
    threshold >= 0 ? cv.THRESH_BINARY : cv.THRESH_BINARY_INV
  );
  cv.imshow(ref.current!, i);
};
