const buildRgb = (imageData: Uint8ClampedArray) => {
  const rgbValues = [];
  for (let i = 0; i < imageData.length; i += 4) {
    const rgb = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2]
    };
    rgbValues.push(rgb);
  }
  return rgbValues;
};

const findBiggestColorRange = (
  rgbValues: Array<{
    r: number;
    g: number;
    b: number;
  }>
) => {
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
    case bRange:
      return "b";
  }
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
      console.log(imageData);
      if (imageData) {
        const rgbArray = buildRgb(imageData.data);
      }
    };
    image.src = fileReader.result as string;
  };

  if (file) {
    fileReader.readAsDataURL(file);
  }
});
