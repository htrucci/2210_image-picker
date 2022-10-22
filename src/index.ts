import extractColors from 'extract-colors';
import { ScopeGroup } from "./drawUtil";
import { RGBValue } from "./imageUtil";

/**
 * ! 이곳이 callback
 * 
 * @param color 컬러코드
 */
const callback = (colors: [string, string, string]) => {  
  
}

const CIRCLE_SIZE = 32;
const CIRCLE_LINE_WID = 6;
const CIRCLE_LINE_COLOR = "#ffffff";
const LINE_WID = 6;
const LINE_COLOR = "#ffffff"

////////////////////////////////////////////////////////////////////////

const $$imgFile = document.getElementById("imgfile") as HTMLInputElement;
const $$draw = document.getElementById("draw") as HTMLDivElement;

$$imgFile.addEventListener("change", () => {
  const file = $$imgFile.files?.[0];
  const fileReader = new FileReader();

  fileReader.onload = () => {
    const image = new Image();

    image.onload = () => {
      const MAX_WIDTH = 500;
      const MAX_HEIGHT = 500;
      const width = MAX_WIDTH;
      const height = MAX_HEIGHT;
      
      extractColors(
        image.src, {
          distance: 0.2, 
          saturationImportance: 0
      }).then((e: Array<{
        hex: string;
        red: number;
        green: number;
        blue: number;
        area: number;
        saturation: number;
      }>) => {
        const mainColors = e.map((i) => new RGBValue(i.red, i.green, i.blue)).slice(0, 3);
              
        ScopeGroup.create($$draw, image, width, height, mainColors, callback, {
          circle_size: CIRCLE_SIZE,
          circle_line_wid: CIRCLE_LINE_WID,
          circle_line_color: CIRCLE_LINE_COLOR,
          line_wid: LINE_WID,
          line_color: LINE_COLOR,
        });
      });
    };
    image.src = fileReader.result as string;
  };

  if (file) {
    fileReader.readAsDataURL(file);
  }
});
