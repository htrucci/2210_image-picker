import extractColors from 'extract-colors';
import { ScopeGroup } from "./drawUtil";
import { resizeImg, RGBValue } from "./imageUtil";

declare global {
  interface Window {
    webkit?: any;
  }
}

const urlParams = new URLSearchParams(window.location.search);
var pointerCount = 3;
if(urlParams.get("pointerCount") != null){
  pointerCount = urlParams.get("pointerCount");
  // alert(pointerCount);
}

window['setPointerCount'] = setPointerCount;

function setPointerCount(pointNum: number) {
  pointerCount = pointNum;
  // alert(pointerCount);
  const imgWid = image.width;
  const imgHei = image.height;
  const { width, height } = resizeImg(winWidth, winHeight, imgWid, imgHei);
  image.width = width;
  image.height = height;

  extractColors(
      image.src, {
        distance: DISTANCE,
        saturationImportance: SATURATION_IMPORTANCE,
        splitPower: SPLITPOWER,
        // splitPower: 10,
        // colorValidator : ( red=255,  green = 255,  blue = 255,  alpha  =  255 )  =>  alpha  >  250
      }).then((e: Array<{
    hex: string;
    red: number;
    green: number;
    blue: number;
    area: number;
    saturation: number;
  }>) => {
    const mainColors = e.map((i) => new RGBValue(i.red, i.green, i.blue)).slice(0, pointerCount);

    ScopeGroup.create($$draw, image, width, height, mainColors, callback, {
      circle_size: CIRCLE_SIZE,
      circle_line_wid: CIRCLE_LINE_WID,
      circle_line_color: CIRCLE_LINE_COLOR,
      line_wid: LINE_WID,
      line_color: LINE_COLOR,
    });
  });
}

/**
 * ! 이곳이 callback
 * 
 * @param color 컬러코드
 */
const callback = (colors: [string, string, string]) => {  
  // alert(colors[0]+":"+colors[1]+":"+colors[2]);
  // alert(hexToRgb(colors[0])?.r+":"+hexToRgb(colors[1])?.g+":"+hexToRgb(colors[2])?.b);
  const rgbColors: RGBValue[] = [];
  for(let i = 0; i < pointerCount; i++){
    rgbColors.push(<RGBValue>hexToRgb(colors[i]));
  }
  outLinkSendRgbColors(JSON.stringify(rgbColors));
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let RgbColor;
  return result ? RgbColor = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// var isMobile = {
//   Android: function () {
//     return navigator.userAgent.match(/Android/i) == null ? false : true;
//   },
//   iOS: function () {
//     return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
//   },
//   any: function () {
//     return (isMobile.Android() || isMobile.iOS());
//   }
// };

// 입력 된 링크를 전달하는 Bridge 함수
function outLinkSendRgbColors(rgbColors: string) {
  // if (isMobile.any()) {
  //   if (isMobile.Android()) {
  //     // android.bridge.outLink(link);
  //   } else if (isMobile.iOS()) {
  //     alert("OK1");
  //     window.webkit.messageHandlers.test2.postMessage(link);
  //   }
  // }
  try{
    window.webkit.messageHandlers.rgbColors.postMessage(rgbColors);
  }catch (e) {
    console.log(e);
  }

}

const CIRCLE_SIZE = 28;
const CIRCLE_LINE_WID = 6;
const CIRCLE_LINE_COLOR = "#ffffff";
const LINE_WID = 6;
const LINE_COLOR = "#ffffff"
const DISTANCE = 0.2;
const SATURATION_IMPORTANCE = 1;
const SPLITPOWER = 5;
////////////////////////////////////////////////////////////////////////

const $$imgFile = document.getElementById("imgfile") as HTMLInputElement;
const $$draw = document.getElementById("draw") as HTMLDivElement;
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;
const image = new Image();
$$imgFile.addEventListener("change", () => {
  const file = $$imgFile.files?.[0];
  const fileReader = new FileReader();

  fileReader.onload = () => {

    image.onload = () => {
      const imgWid = image.width;
      const imgHei = image.height;
      const { width, height } = resizeImg(winWidth, winHeight, imgWid, imgHei);
      
      image.width = width;
      image.height = height;

      extractColors(
        image.src, {
          distance: DISTANCE,
          saturationImportance: SATURATION_IMPORTANCE,
          splitPower: SPLITPOWER,
            // colorValidator : ( red=255,  green = 255,  blue = 255,  alpha  =  255 )  =>  alpha  >  250
      }).then((e: Array<{
        hex: string;
        red: number;
        green: number;
        blue: number;
        area: number;
        saturation: number;
      }>) => {
        console.log("Colors Array:"+e.length);
        console.log(e[0].hex);
        console.log(e[1].hex);
        console.log(e[2].hex);
        console.log(e[3].hex);

        const mainColors = e.map((i) => new RGBValue(i.red, i.green, i.blue)).slice(0, pointerCount);
              
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

    if ($$imgFile.parentElement) {
      $$imgFile.parentElement.style.display = 'none';
    }
  };

  if (file) {
    fileReader.readAsDataURL(file);
  }
});
