import { RGBValue } from "./imageUtil";

const componentToHex = (c: number) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (r: number, g: number, b: number) => {  
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const rgbValueToHex = (v: RGBValue) => {
  return rgbToHex(v.r, v.g, v.b);
}

export const rgbValueToHSL = (v: RGBValue) => {
  // Make r, g, and b fractions of 1
  v.r /= 255;
  v.g /= 255;
  v.b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(v.r,v.g,v.b),
      cmax = Math.max(v.r,v.g,v.b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == v.r)
    h = ((v.g -v.b) / delta) % 6;
  // Green is max
  else if (cmax == v.g)
    h = (v.b - v.r) / delta + 2;
  // Blue is max
  else
    h = (v.r - v.g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0)
    h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}