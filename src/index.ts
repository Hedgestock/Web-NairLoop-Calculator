import { Plotter } from "./plotting-engine/plotter";

let p = [
  { x: 1, y: 1 },
  { x: 1, y: 2, color: "red" },
  { x: 3, y: 3, color: "green" },
  { x: 5, y: 7, color: "blue" },
  { x: 7, y: 4 },
];


const canvas = document.getElementById("plotting-canvas") as HTMLCanvasElement;

const plottingEngine = new Plotter(canvas);

plottingEngine.points = p;
