import { Circle } from "./Circle";
import { rgbToHex } from "./colorUtil";
import { RGBValue } from "./imageUtil";
import { Line } from "./Line";
import { Position } from "./Position";

export class ScopeGroup {
    private ctx: CanvasRenderingContext2D;
    private image: HTMLImageElement;
    private circles: [Circle, Circle, Circle];
    private areaInfo: DOMRect;
    private imageData: Uint8ClampedArray;
    private callback: (data: string) => void;

    private drawOpt: {
        circle_size: number;
        circle_line_wid: number;
        circle_line_color: string;
        line_wid: number;
        line_color: string;
    };

    constructor(
        $$wrap: HTMLDivElement,
        image: HTMLImageElement, 
        width: number,
        height: number,
        mainColors: RGBValue[], 
        callback: (color: string) => void,
        opt: {
            circle_size: number;
            circle_line_wid: number;
            circle_line_color: string;
            line_wid: number;
            line_color: string;
        }
    ) {      
        this.drawOpt = Object.assign({
            circle_size: 32,
            circle_line_wid: 5,
            circle_line_color: '#ffffff',
            line_wid: 5,
            line_color: '#ffffff',
        }, opt);

        this._initHTML($$wrap, width, height);
        const $$imgDraw = document.getElementById("img-draw") as HTMLCanvasElement;

        this.ctx = $$imgDraw.getContext('2d') as CanvasRenderingContext2D;
        this.image = image;
        this.areaInfo = this.ctx.canvas.getBoundingClientRect();
        this.callback = callback;

        ////////////////////////////////////////////////////////////////

        this.ctx.drawImage(image, 0, 0, width, height);
        const imageData = this.ctx.getImageData(0, 0, width, height);  
        this.imageData = imageData.data;
                
        const circles = [] as Circle[];
        for (let color of mainColors) {
            const position = this._findPositionOfColor(color);            
            if (position) {
                circles.push(Circle.createByPosition(position, color));
            }
        }
        this.circles = circles as [Circle, Circle, Circle];

        //////////////////////////////////

        this._draw();
        this._event();
    }

    static create(...params: ConstructorParameters<typeof ScopeGroup>) {        
        return new ScopeGroup(...params);
    }

    private _initHTML($$wrap: HTMLDivElement, width: number, height: number) {
        $$wrap.innerHTML = `
            <div style="
                position: relative;
                width: ${width}px;
                height: ${height}px;
            ">
                <canvas 
                    id="img-draw" 
                    width="${width}" 
                    height="${height}"></canvas>
            </div>
        `;
    }

    private _draw() {
        const {width, height} = this.ctx.canvas;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.drawImage(this.image, 0, 0, width, height)

        // finding`
        for (let i = 0, len = this.circles.length; i < len; i++) {
            // 마지막 루프는 제외
            if (i < len - 1) {
                this._drawLine(Line.createByCircle(this.circles[i], this.circles[i+1])); 
            }
            this._drawCircle(this.circles[i]);
        }
    }

    private _drawCircle(circle: Circle) {
        this.ctx.beginPath();
        this.ctx.arc(circle.x, circle.y, this.drawOpt.circle_size, 0, 2 * Math.PI);
        
        this.ctx.fillStyle = circle.color;
        this.ctx.fill();

        this.ctx.lineWidth = this.drawOpt.circle_line_wid;
        this.ctx.strokeStyle = this.drawOpt.circle_line_color;
        this.ctx.stroke();
    }

    private _drawLine(l: Line) {
        this.ctx.beginPath();
        this.ctx.moveTo(l.p1.x, l.p1.y);
        this.ctx.lineTo(l.p2.x, l.p2.y);
        this.ctx.lineWidth = this.drawOpt.line_wid;
        this.ctx.strokeStyle = this.drawOpt.line_color;
        this.ctx.stroke();
    }

    private _event() {
        this.ctx.canvas.addEventListener('mousedown', this._onMouseDown.bind(this));
    }
    
    private _onMouseDown(e: MouseEvent) {
        const mouseDownPos = this._getRealPosition(e);
        const clickIdx = this._idxOfCircles(mouseDownPos);
        
        if (clickIdx > -1) {
            const clickCircle = this.circles[clickIdx];
            const x_gap = clickCircle.x - mouseDownPos.x;
            const y_gap = clickCircle.y - mouseDownPos.y;

            const onMouseMove = (e: MouseEvent) => {
                const mouseMovePos = this._getRealPosition(e);                
                const revPosition = new Position(mouseMovePos.x + x_gap, mouseMovePos.y + y_gap);
                if (revPosition.x - this.drawOpt.circle_size < 0 || 
                    revPosition.x + this.drawOpt.circle_size > this.ctx.canvas.width || 
                    revPosition.y - this.drawOpt.circle_size < 0 || 
                    revPosition.y + this.drawOpt.circle_size > this.ctx.canvas.height
                ) {
                    return;
                }
                
                const overColor = this._colorOfPoint(revPosition);
                const newCircle = new Circle(revPosition.x, revPosition.y, overColor);
                this.circles[clickIdx] = newCircle;
                this._draw();
                this.callback(overColor);
            };

            const onMouseUp = () => {
                this.ctx.canvas.removeEventListener('mousemove',onMouseMove);
                this.ctx.canvas.removeEventListener('mouseup', onMouseUp);
                this.ctx.canvas.removeEventListener('mouseleave', onMouseUp);
            };

            this.ctx.canvas.addEventListener('mousemove', onMouseMove);
            this.ctx.canvas.addEventListener('mouseup', onMouseUp);
            this.ctx.canvas.addEventListener('mouseleave', onMouseUp)
        }
    }

    private _getRealPosition(e: MouseEvent) {
        const x = e.clientX - this.areaInfo.x;
        const y = e.clientY - this.areaInfo.y;

        return new Position(x, y);
    }

    private _findPositionOfColor(rgbValue: RGBValue): Position | undefined {
        const { width } = this.ctx.canvas;
        const startY = width * this.drawOpt.circle_size * 4;
        const endY = this.imageData.length - startY;        

        for (let i = startY; i < endY; i += 4) {
            const rgb = new RGBValue(
                this.imageData[i],
                this.imageData[i + 1],
                this.imageData[i + 2],
            )
            if (rgb.compare(rgbValue)) {
                const x = i % width;
                const y = Math.floor(i / width);               

                return new Position(x, y);
            }
        }
    }

    private _idxOfCircles(p: Position) {
        return this.circles.findIndex(circle => {
            // 방향
            const dy = Math.abs(circle.y - p.y);
            const dx = Math.abs(circle.x - p.x);
            const theta = Math.atan2(dy, dx);
            
            // 방향으로 원의 최대 위치
            const maxX = circle.x + this.drawOpt.circle_size * Math.cos(theta);
            const maxY = circle.y + this.drawOpt.circle_size * Math.sin(theta);   
            const minX = circle.x - this.drawOpt.circle_size * Math.cos(theta);
            const minY = circle.y - this.drawOpt.circle_size * Math.sin(theta);

            return p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;
        });
    }

    private _colorOfPoint(p: Position) {
        const {width} = this.ctx.canvas;
        const pointData = this.imageData[p.y * width * 4 + p.x * 4];
        
        return rgbToHex(pointData, pointData+1, pointData+2);
    }
}