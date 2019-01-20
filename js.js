var canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var MAX_PARTICLES = 60;
var ctx = canvas.getContext("2d");
var particles = [];

var create = function(options) {
  options = options || {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height
  };
  if (particles.length > MAX_PARTICLES) {
    particles.shift();
  }
  var red = Math.floor(Math.random() * 255);
  var green = Math.floor(Math.random() * 255);
  var blue = Math.floor(Math.random() * 255);
  var p = {
    x: options.x,
    y: options.y,
    xVel: (Math.random() - 0.5) * 4,
    yVel: (Math.random() - 0.5) * 4,
    radius: 10,
    color: "rgba(30,30,80, 1)"
  };
  particles.push(p);
};

var resizeHandler = function() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

var move = function(p) {
  p.x += p.xVel;
  p.y += p.yVel;
};

var distance = function(p) {
  for (var i = particles.length - 1; i > 0; i--) {
    var p2 = particles[i];
    var xp;
    var dist;
    if (p.x > p2.x) {
      xp = p.x - p2.x;
    } else if (p.x == p2.x) {
      xp = p.x;
    } else {
      xp = p2.x - p.x;
    }
    var yp;
    if (p.y > p2.y) {
      yp = p.y - p2.y;
    } else if (p.y == p2.y) {
      yp = p.y;
    } else {
      yp = p2.y - p.y;
    }
    xp *= xp;
    yp *= yp;
    dist = Math.sqrt(xp + yp);
    if (dist < 100) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineWidth = 8;
      ctx.strokeStyle = p.color;
      ctx.stroke();
    }
  }
};

var loop = function() {
  create();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function(p) {
    move(p);
    distance(p);
    draw(p);
  });
  setTimeout(function() {
    window.requestAnimationFrame(loop);
  }, 1000 / 20);
};

canvas.onload = function() {
  loop();
};

var draw = function(p) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = p.color;
  ctx.fill();
};

canvas.addEventListener(
  "click",
  function(ev) {
    for (var i = 0; i < 1; i++) {
      create({
        x: ev.clientX,
        y: ev.clientY
      });
    }
  },
  false
);

window.addEventListener(
  "resize",
  function() {
    resizeHandler();
  },
  false
);

window.requestAnimationFrame(loop);
