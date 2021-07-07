let particles;
let canvas;
let latestMousePos;
let avgMousePos;
const sunReadyColors = colorPalettes[0].colors;

function setup() {
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	const mainNodeDOM = canvas.parent();
	canvas.parent("canvas-container");
	mainNodeDOM.remove();
	particles = new Array(10);
	for (let i = 0; i < particles.length; i++)
		particles[i] = new Particle(width / 2, height / 2, 5, random(sunReadyColors), random(0.02, 0.04));
	latestMousePos = [];
	avgMousePos = {x: 0, y: 0};
	noStroke();
}

function updateLatestMousePos() {
	if (latestMousePos.length > 17) latestMousePos.splice(0, 1);
	latestMousePos.push({x: mouseX, y: mouseY});
}

function updateAvgMousePos() {
	const tempAvgMousePos = latestMousePos.reduce(function (acc, curr, index, array) {
		return {x: acc.x + curr.x, y: acc.y + curr.y};
	}, {x: 0, y: 0});
	tempAvgMousePos.x = floor(tempAvgMousePos.x / latestMousePos.length);
	tempAvgMousePos.y = floor(tempAvgMousePos.y / latestMousePos.length);
	avgMousePos = {...tempAvgMousePos};
}

function draw() {
	updateLatestMousePos();
	updateAvgMousePos();
	background(color('black'));
	for (let i = 0; i < particles.length; i++)
		particles[i].animate(mouseIsPressed, avgMousePos);
}
