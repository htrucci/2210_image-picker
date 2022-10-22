import { Circle } from "./Circle";
import { Position } from "./Position";

export class Line {
    #p1: Position;
    #p2: Position;

    constructor(p1: Position, p2: Position) {
        this.#p1 = p1;
        this.#p2 = p2;
    }

    static createByCircle(c1: Circle, c2: Circle) {
        return new Line(new Position(c1.x, c1.y), new Position(c2.x, c2.y));
    }

    get p1() { return this.#p1; };
    
    get p2() { return this.#p2; };
}