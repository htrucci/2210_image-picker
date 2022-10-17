interface RGBValue {
  r: number;
  g: number;
  b: number;
}

const buildRgb = (imageData: Uint8ClampedArray) => {
  const rgbValues = [] as RGBValue[];
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
    } as RGBValue;
    rgbValues.push(rgb);
  }
  return rgbValues;
};

const findBiggestChannel = (rgbValues: RGBValue[]) => {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const biggestRange = Math.max(rRange, gRange, bRange);
  switch (biggestRange) {
    case rRange:
      return "r";
    case gRange:
      return "g";
    default:
      return "b";
  }
};

const quantization = (rgbValues: RGBValue[], depth: number) => {
  const MAX_DEPTH = 4;

  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }

  const channel = findBiggestChannel(rgbValues);
  rgbValues.sort((a, b) => {
    return a[channel] - b[channel];
  });

  const mid = rgbValues.length / 2;

  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};

document.getElementById("btnLoad")?.addEventListener("click", () => {
  const $$imgFile = document.getElementById("imgfile") as HTMLInputElement;
  const image = new Image();
  const file = $$imgFile?.files?.[0];
  const fileReader = new FileReader();

  fileReader.onload = () => {
    image.onload = () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(image, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const rgbArray = buildRgb(imageData.data);
        const quantColors = quantization(rgbArray, 0);
      }
    };
    image.src = fileReader.result as string;
  };

  if (file) {
    fileReader.readAsDataURL(file);
  }
});
