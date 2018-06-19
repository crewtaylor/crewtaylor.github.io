var springs;
var gravity = 9.0;
var mass = 2.0;
var radius = 15;
var yIncr = 0;
var inverted = 1;
function setup() {
  createCanvas(displayWidth, displayHeight);
  fill(255, 126);
  // Inputs: x, y, mass, gravity
  springs = []
  springs.push(new Spring2D(0.0, width/2 - 20, mass, gravity, 0));
  springs.push(new Spring2D(0.0, width/2 - 20, mass, gravity, 1));
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);

  // A rectangle
  rect(40, 120, 120, 40);
  // An ellipse
  ellipse(240, 240, 80, 80);
}

function draw() {

  background(0);
  fill(120,120,120, 80);
  stroke(127, 127, 127);

  // A rectangle
  // An ellipse
  ellipse(10, 10, 240, 240);
  for(var i = 0; i < springs.length; i++){
  	if (i === 0) {
  		springs[i].update(mouseX, mouseY);
  		springs[i].display(mouseX, mouseY);
  	}
  	else{
  		springs[i].update(springs[i-1].x, springs[i-1].y + i*6*inverted);
  		springs[i].display(springs[i-1].x, springs[i-1].y + i*6*inverted);
  	}
  }
}
  
function Spring2D(xpos, ypos, m, g, index) {
  this.x = xpos;// The x- and y-coordinates
  this.y = ypos;
  this.index = index;
  this.vx = 0; // The x- and y-axis velocities
  this.vy = 0;
  mass += .2;
  this.mass = m;
  this.gravity = g;
  radius += 3;
  this.radius = radius;
  this.stiffness = 0.2;
  this.damping = 0.7;
  
  this.update = function(targetX, targetY) {
    var forceX = (targetX - this.x) * this.stiffness;
    var ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    var forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    var ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }
  
  this.display = function(nx, ny) { 
  	var colorAry = [color(255,0,0), color(255,127,0), color(255,255,0), color(127,255,0), color(0,255,0), color(0,255,127), color(0,255,255), color(0,127,255), color(0,0,255), color(127,0,255), color(255,0,255), color(255,0,127)]// Define color 'c'
	fill(colorAry[this.index]); // Use color variable 'c' as fill color
	noStroke(); // Don't draw a stroke around shapes
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
    
  }
}
function mouseClicked() {
  if (springs.length < 12) {
  	var new_width = Math.floor(Math.random() * width); 
  	springs.push(new Spring2D(0.0, new_width, mass, gravity, springs.length));
  }
  var d = dist(mouseX, mouseY, 28, 28);
  if (d < 100){
  	for(var i = 0; i < springs.length; i++) {
  		springs[i].y *= -1;
  		springs[i].gravity *= -1;
  	}
  	gravity *= -1;
  	inverted *= -1;
  }
}