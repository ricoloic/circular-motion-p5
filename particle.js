defaultColor = {
  name: "Magenta",
  rgbDecimal: {
    r: 255,
    g: 0,
    b: 255,
    string: "255, 0, 255"
  }
};

function Particle(x, y, radius = 50, color = defaultColor, vel = 0.03, trailLength = 50) {
  this.vel = vel;
  this.radius = radius;
  this.origin = { x: x, y: y };
  this.pos = { x: x, y: y };
  this.radians = floor(random(0, 100));
  this.color = color;
  this.alfaIntencity = random(.08, .1) && .5;
  this.trails = [];
  this.trailLength = trailLength;
  this.spacing = floor(random(100, 275));
}

Particle.prototype.updatePos = function (mouseIsPressed, position) {
  this.radians += this.vel;
  this.pos.x = (mouseIsPressed ? position.x : this.origin.x) + cos(this.radians) * this.spacing;
  this.pos.y = (mouseIsPressed ? position.y : this.origin.y) + sin(this.radians) * this.spacing;
  this.trails.push({ x: this.pos.x, y: this.pos.y });
  if (this.trails.length > this.trailLength) this.trails.splice(0, 1);
}

Particle.prototype.showTrail = function () {
  for (let i = this.trails.length - 1; i >= 0; i--) {
    trail = this.trails[i];
    alfa = Math.abs(map(i, 0, this.trailLength, 0, 1) * this.alfaIntencity);
    fill(`rgba(${this.color.rgbDecimal.r}, ${this.color.rgbDecimal.g}, ${this.color.rgbDecimal.b}, ${alfa})`);
    circle(trail.x, trail.y, this.radius * 2);
  }
}

Particle.prototype.showHead = function () {
  fill(`rgba(${this.color.rgbDecimal.r}, ${this.color.rgbDecimal.g}, ${this.color.rgbDecimal.b}, ${this.alfaIntencity + 0.2})`);
  circle(this.pos.x, this.pos.y, this.radius * 2);
}

Particle.prototype.show = function () {
  this.showHead();
  this.showTrail();
}

Particle.prototype.animate = function (mouseIsPressed, position) {
  this.updatePos(mouseIsPressed, position);
  this.show();
}