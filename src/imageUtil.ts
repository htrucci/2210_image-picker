
export class RGBValue {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  compare(value: RGBValue) {
    return value.r === this.r && value.g === this.g && value.b === this.b;
  }
}

export const resizeImg = (max_width: number, max_height: number, width: number, height: number) => {
    if (width > height) {
        if (width > max_width) {
            height = height * (max_width / width);
            width = max_width;
        }
    } else {
        if (height > max_height) {
            width = width * (max_height / height);
            height = max_height;
        }
    }      
    
    return {width, height};
}

export const buildRgb = (imageData: Uint8ClampedArray) => {
  const rgbValues = [] as RGBValue[];
  for (let i = 0; i < imageData.length; i += 4) {    
    rgbValues.push(new RGBValue(
      imageData[i],
      imageData[i + 1],
      imageData[i + 2],
    ));
  }
  return rgbValues;
};
