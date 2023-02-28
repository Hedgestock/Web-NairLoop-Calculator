export class Plotter {
    private _canvas: HTMLCanvasElement;
    private _context;
    private _unit;
    private _points: IPoint[];

    constructor(canvas: HTMLCanvasElement, _unit?: number) {
        this._canvas = canvas;
        this._context = canvas.getContext("2d");
        this._unit = this._unit ?? 30;
        this._points = [];


        window.addEventListener("resize", (e) => {
            this.adaptResolution();
        })
    }

    get unit() {
        return this._unit;
    }

    drawRaw() {
        console.debug("Drawing Raw");
        // this._context.beginPath();
        this._context.clearRect(-this._canvas.width, -this._canvas.height, this._canvas.width, this._canvas.height)
        // this._context.fillStyle = "#ff6";
        // this._context.fillRect(0, 0, canvas.width, canvas.height);

        //this._context.strokeStyle = "#" + Math.floor(Math.random() * 16777215).toString(16);
        this._context.strokeStyle = "black";
        this._points.forEach((point) => {

            this._context.lineTo(point.x * this._unit, point.y * this._unit);
            this._context.closePath();
            this._context.stroke();


            if (point.color) {
                this._context.strokeStyle = point.color;
                this._context.lineWidth = 3;
            }
            this._context.beginPath();
            this._context.arc(point.x * this._unit, point.y * this._unit, this._unit / 4, 0, 2 * Math.PI);
            this._context.closePath();
            //  this._context.fill();
             this._context.stroke();
            if (point.color) {
                this._context.strokeStyle = "black";
                this._context.lineWidth = 1;
            }
            
            this._context.beginPath();
            this._context.moveTo(point.x * this._unit, point.y * this._unit);
        });
    }


    draw(points) {
        console.debug("Drawing");
        this._points = points;
        // this.drawRaw(points);
        this.adaptResolution();
    }


    adaptResolution() {
        console.debug("Adapting resolution");
        let maxY = this._points.reduce((a, c) => a > c.y ? a : c.y, 0)
        let maxX = this._points.reduce((a, c) => a > c.x ? a : c.x, 0)
        this._canvas.height = this._canvas.offsetHeight;
        this._canvas.width = this._canvas.offsetWidth;



        this._unit = Math.min(this._canvas.width / (maxX + 1), this._canvas.height / (maxY + 1))
        this._context.transform(1, 0, 0, -1, 0, this._canvas.height); //do this to get y axis to go from bottom to top

        this.drawRaw();
    }

    
}

