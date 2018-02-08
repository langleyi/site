var canvas;
var context;
var mx = 0;
var my = 0;

var background = new Image();
background.src = "site_background_jpg.jpg";


var eyes = [
   { 
    'centerX' : 0.8 * innerWidth,
    'centerY' : 0.7 * innerHeight,
    'radius' : 8
  },
]

window.onload = function() {
  canvas = document.getElementById('eyes');
  context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.onmousemove = function(evt) { mx = evt.x; my = evt.y };
  tekenFrame();
}



// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    context.drawImage(background,0,0);   
}

function tekenFrame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < eyes.length; i++) {
    drawEye(eyes[i]);
  };
  // loop
  requestAnimationFrame(tekenFrame);
}

function drawEye(eye) {
  bepaalCoordinaten(eye);

  // clip the eye
  context.save();
  context.beginPath();
  context.arc(eye.centerX, eye.centerY, eye.radius, 0, Math.PI * 2);
  context.clip();

  // eye
  context.beginPath();
  context.arc(eye.centerX, eye.centerY, eye.radius, 0, Math.PI * 2);
  context.fillStyle = "rgb(255, 255, 255, 0.5)";
  context.fill();
  context.closePath();

  // iris
  context.beginPath();
  context.arc(eye.centerX + eye.pupilX, eye.centerY + eye.pupilY, eye.radius / 2, 0, Math.PI * 2);
  context.fillStyle = "#007";
  context.fill();
  context.closePath();

  // pupil
  context.beginPath();
  context.arc(eye.centerX + eye.pupilX, eye.centerY + eye.pupilY, eye.radius / 5, 0, Math.PI * 2);
  context.fillStyle = "#000";
  context.fill();
  context.closePath();

  context.restore();
}



function bepaalCoordinaten(eye) {
  // afstand van middenpunt oog tot cursor
  dx = mx - eye.centerX;
  dy = my - eye.centerY;
  // stelling van pythagoras
  c = Math.sqrt((dx*dx) + (dy*dy));
  
  // afstand middelpunt tot pupil
  r = eye.radius * 0.8;

  // cursor op oog
  if (Math.abs(dx) < r && Math.abs(dy) < r && c < r) {
    r = c;
  } 

  // hoek bepalen
  alfa = Math.asin(dy / c);

  // coordinaten op rand cirkel bepalen
  eye.pupilX = Math.cos(alfa) * r;
  // 180 graden fout herstellen
  eye.pupilX = (dx < 0 ? eye.pupilX * -1 : eye.pupilX);
  eye.pupilY = Math.sin(alfa) * r;
}
