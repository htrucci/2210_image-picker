import { rgbValueToHex } from "./colorUtil";
import { RGBValue } from "./imageUtil";
import { Position } from "./Position";

export class Circle {
    #x: number;
    #y: number;
    #color: string;

    constructor(x: number, y: number, color: string) {
        this.#x = x;
        this.#y = y;
        this.#color = color;
    }

    static createByPosition(position: Position, color: string | RGBValue) {
        return new Circle(position.x, position.y, typeof color === "string" ? color : rgbValueToHex(color));
    }

    get x() { return this.#x; };
    
    get y() { return this.#y; };

    get color() { return this.#color; };
}
