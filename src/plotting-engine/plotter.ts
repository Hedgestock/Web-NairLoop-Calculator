import { IConfig, IPoint } from "./interfaces";

const defaultConfig: IConfig = {
  abscissa: "X",
  ordinate: "Y",
  pointsConfig: {
    fill: true,
    radius: 0.2,
  },
};
export class Plotter {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  private _config: IConfig;
  private _unit: number;

  private _points: IPoint[];
  private _selectedPoint: IPoint | undefined = undefined;

  constructor(canvas: HTMLCanvasElement, config?: IConfig) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d") as CanvasRenderingContext2D;
    this._config = config ?? defaultConfig;
    this._unit = 1;
    this._points = [];

    window.addEventListener("resize", (e) => {
      this.adaptResolution();
    });

    // this._canvas.addEventListener(
    //   "mousedown",
    //   this.mouseDownHandler.bind(this)
    // );
    // this._canvas.addEventListener(
    //   "mousemove",
    //   this.mouseMoveHandler.bind(this)
    // );
    // this._canvas.addEventListener("mouseup", this.mouseUpHandler.bind(this));
  }

  private mouseDownHandler(e) {
    var rect = this._canvas.getBoundingClientRect(); // abs. size of element
    // translate position of the mouse to canva units
    const mousePosition = {
      x: (e.clientX - rect.left) / this._unit,
      y: (e.clientY - rect.bottom) / -this._unit,
    };

    const boxRadius = 1 / 4;

    this._selectedPoint = this._points.find((point) => {
      console.log();
      return (
        point.x > mousePosition.x - boxRadius &&
        point.x < mousePosition.x + boxRadius &&
        point.y > mousePosition.y - boxRadius &&
        point.y < mousePosition.y + boxRadius
      );
    });

    if (this._selectedPoint) {
      this._selectedPoint.color = "red";
    } else {
      const snappedMousePosition = {
        x: Math.round(mousePosition.x),
        y: Math.round(mousePosition.y),
      };
      // const snappedMousePosition = {x: Math.round(mousePosition.x), y: mousePosition.y}

      this._points.push(snappedMousePosition);
    }
    this.draw();
  }

  private mouseMoveHandler(e) {
    if (this._selectedPoint) {
      console.log("mouve");
      var rect = this._canvas.getBoundingClientRect(); // abs. size of element
      // translate position of the mouse to canva units
      const mousePosition = {
        x: (e.clientX - rect.left) / this._unit,
        y: (e.clientY - rect.bottom) / -this._unit,
      };
      const snappedMousePosition = {
        x: Math.round(mousePosition.x),
        y: Math.round(mousePosition.y),
      };

      this._selectedPoint.x = snappedMousePosition.x;
      this._selectedPoint.y = snappedMousePosition.y;
      this.draw();
    }
  }

  private mouseUpHandler(e) {
    if (this._selectedPoint) {
      this._selectedPoint.color = "black";
      this._selectedPoint = undefined;
      this.draw();
    }
  }
  set points(value) {
    this._points = value;
    this.adaptResolution();
    this.draw();
  }

  private drawRaw() {
    console.debug("Drawing Raw");

    this._context.strokeStyle = "black";

    if (!this._points.length) return;

    this._context.moveTo(
      this._points[0].x * this._unit,
      this._points[0].y * this._unit
    );

    this._points.forEach((point) => {
      this._context.lineTo(point.x * this._unit, point.y * this._unit);
      this._context.closePath();
      this._context.stroke();

      this.drawPoint(point);

      this._context.beginPath();
      this._context.moveTo(point.x * this._unit, point.y * this._unit);
    });
  }

  private drawPoint(point: IPoint) {
    let { fillStyle, strokeStyle, lineWidth } = this._context;
    if (point.color) {
      this._context.strokeStyle = point.color;
      this._context.fillStyle = point.color;
      this._context.lineWidth = 3;
    }
    this._context.beginPath();
    this._context.arc(
      point.x * this._unit,
      point.y * this._unit,
      this._unit * this._config.pointsConfig.radius,
      0,
      2 * Math.PI
    );
    this._context.closePath();
    this._context.stroke();
    if (this._config.pointsConfig.fill) this._context.fill();

    this._context.fillStyle = fillStyle;
    this._context.strokeStyle = strokeStyle;
    this._context.lineWidth = lineWidth;
  }

  private drawAxis() {

    

    this._context.save()
    // this._context.scale(1, -1);
    this._context.resetTransform();
    this._context.fillText("test", 10, 10);
    this._context.restore();
  }

  private clear() {
    console.debug("Clearing");
    this._context.clearRect(
      -this._canvas.width,
      -this._canvas.height,
      2 * this._canvas.width,
      2 * this._canvas.height
    );
  }

  private draw() {
    console.debug("Drawing");
    this.clear();
    this.drawAxis()
    this.drawRaw();
  }

  private adaptResolution() {
    console.debug("Adapting resolution");
    let maxY = this._points.reduce((a, c) => (a > c.y ? a : c.y), 0);
    let maxX = this._points.reduce((a, c) => (a > c.x ? a : c.x), 0);
    this._canvas.height = this._canvas.offsetHeight;
    this._canvas.width = this._canvas.offsetWidth;

    this._unit = Math.min(
      this._canvas.width / (maxX + 1),
      this._canvas.height / (maxY + 1)
    );
    this._context.transform(1, 0, 0, -1, 0, this._canvas.height); //do this to get y axis to go from bottom to top
  }
}
