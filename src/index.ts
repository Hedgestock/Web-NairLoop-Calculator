import { Plotter } from "./plotting-engine";

let p = [
  { x: 1, y: 1 },
  { x: 1, y: 2, color: "red" },
  { x: 3, y: 3, color: "green" },
  { x: 5, y: 7, color: "blue" },
  { x: 7, y: 4 },
];


const canvas = document.getElementById("plotting-canvas") as HTMLCanvasElement;

const plottingEngine = new Plotter(canvas);

canvas.onclick = (e) => {
  var rect = canvas.getBoundingClientRect(); // abs. size of element
  // translate position of the mouse to canva units
  const mousePosition = { x: (e.clientX - rect.left) / plottingEngine.unit, y: (e.clientY - rect.bottom) / -plottingEngine.unit }

  const boxRadius = 1 / 4;

  console.log()
  const selected = p.find(point => {
    console.log()
    return (point.x > mousePosition.x - boxRadius && point.x < mousePosition.x  + boxRadius)
      && (point.y > mousePosition.y - boxRadius && point.y < mousePosition.y + boxRadius)
  })


  if (selected) {
    selected.color = "red";
  } else {
    const snappedMousePosition = { x: Math.round(mousePosition.x), y: Math.round(mousePosition.y) }
    // const snappedMousePosition = {x: Math.round(mousePosition.x), y: mousePosition.y}

    p.push(snappedMousePosition)
  }
  plottingEngine.draw(p);
}

plottingEngine.draw(p);
