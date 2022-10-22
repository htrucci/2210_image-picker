import { RGBValue } from "./imageUtil";

const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (r: number, g: number, b: number, a?: number) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const rgbValueToHex = (v: RGBValue) => {
  return rgbToHex(v.r, v.g, v.r);
}