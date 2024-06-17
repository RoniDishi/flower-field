let flowers;
let currentColor;
let gridSize = 20;
let flowerOffsetX = 0;
let flowerOffsetY = 40; // Adjust the vertical offset for flowers
let song; // Variable for the sound file

function preload() {
  song = loadSound("Animal Crossing.mp3", loaded); // Load the sound file and call loaded() when ready
}

function loaded() {
  // song.play(); // Remove this line from loaded() if you added it before
}

function setup() {
  createCanvas(600, 600);
  flowers = createFieldOfFlowers();
  currentColor = color(0); // Default to black
}

function draw() {
  background(color(173, 216, 230)); // Set light blue background
  drawGrid();
  drawFlowers();
  drawButtons(); // Draw the color buttons
  drawHeadline();
}

function drawGrid() {
  stroke(200);
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      fill(255);
      rect(x, y, gridSize, gridSize);
    }
  }
}

function drawFlowers() {
  noStroke();
  for (let i = 0; i < flowers.length; i++) {
    let px = flowers[i].x;
    let py = flowers[i].y;
    fill(flowers[i].color);
    rect(px * gridSize + width / 2 - 15 * gridSize + flowerOffsetX, py * gridSize + height / 2 - 10 * gridSize + flowerOffsetY, gridSize, gridSize);
  }
}

function drawButtons() {
  let buttonSize = 50;
  let spacing = 10;
  let x = width / 2 - 2.5 * (buttonSize + spacing); // Centering the buttons horizontally
  let y = 80; // Adjust the vertical position

  // Draw buttons with letters centered inside them
  fill(161, 195, 51); // Green
  rect(x, y, buttonSize, buttonSize);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("G", x + buttonSize / 2, y + buttonSize / 2);

  x += buttonSize + spacing; // Move to the next button position

  fill(216, 105, 159); // Magenta
  rect(x, y, buttonSize, buttonSize);
  fill(0);
  text("P", x + buttonSize / 2, y + buttonSize / 2);

  x += buttonSize + spacing; // Move to the next button position

  fill(81, 192, 217); // Blue
  rect(x, y, buttonSize, buttonSize);
  fill(0);
  text("B", x + buttonSize / 2, y + buttonSize / 2);

  x += buttonSize + spacing; // Move to the next button position

  fill(236, 238, 43); // Yellow
  rect(x, y, buttonSize, buttonSize);
  fill(0);
  text("Y", x + buttonSize / 2, y + buttonSize / 2);

  x += buttonSize + spacing; // Move to the next button position

  fill(229, 44, 31); // Red
  rect(x, y, buttonSize, buttonSize);
  fill(0);
  text("R", x + buttonSize / 2, y + buttonSize / 2);
}

function drawHeadline() {
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Customize Your Field", width / 2, 30); // Position the headline at the top
}

function createFieldOfFlowers() {
  let flowerPixels = [];
  let flowerPattern = [
    ".....",
    "..#..",
    ".#.#.",
    "..#..",
    ".#.#.",
    "..#..",
    "..#..",
  ];
  for (let fy = 0; fy < 3; fy++) { // 3 rows of flowers
    for (let fx = 0; fx < 5; fx++) { // 5 columns of flowers
      for (let y = 0; y < flowerPattern.length; y++) {
        for (let x = 0; x < flowerPattern[y].length; x++) {
          if (flowerPattern[y][x] === '#') {
            flowerPixels.push({ x: x + fx * 6, y: y + fy * 8, color: color(200) });
          }
        }
      }
    }
  }
  return flowerPixels;
}

function mouseClicked() {
  let mx = mouseX - width / 2 + 15 * gridSize;
  let my = mouseY - height / 2 + 15 * gridSize;

  // Check if mouse click is within the bounds of any flower
  for (let i = 0; i < flowers.length; i++) {
    let px = flowers[i].x * gridSize + width / 2 - 15 * gridSize + flowerOffsetX;
    let py = flowers[i].y * gridSize + height / 2 - 10 * gridSize + flowerOffsetY;

    if (mx >= px && mx < px + gridSize && my >= py && my < py + gridSize) {
      flowers[i].color = currentColor;
      if (!song.isPlaying()) {
        song.play(); // Play the sound file only if it's not already playing
      }
    }
  }

  // Check if mouse click is within the bounds of any color button
  let buttonSize = 50;
  let spacing = 10;
  let x = width / 2 - 2.5 * (buttonSize + spacing); // Centering the buttons horizontally
  let y = 80; // Adjust the vertical position

  if (mx >= x && mx < x + buttonSize && my >= y && my < y + buttonSize) {
    currentColor = color(161, 195, 51); // Green
  } else if (mx >= x + buttonSize + spacing && mx < x + 2 * buttonSize + spacing && my >= y && my < y + buttonSize) {
    currentColor = color(216, 105, 159); // Magenta
  } else if (mx >= x + 2 * (buttonSize + spacing) && mx < x + 3 * buttonSize + 2 * spacing && my >= y && my < y + buttonSize) {
    currentColor = color(81, 192, 217); // Blue
  } else if (mx >= x + 3 * (buttonSize + spacing) && mx < x + 4 * buttonSize + 3 * spacing && my >= y && my < y + buttonSize) {
    currentColor = color(236, 238, 43); // Yellow
  } else if (mx >= x + 4 * (buttonSize + spacing) && mx < x + 5 * buttonSize + 4 * spacing && my >= y && my < y + buttonSize) {
    currentColor = color(229, 44, 31); // Red
  }
}

function keyPressed() {
  if (key === 'g') {
    currentColor = color(161, 195, 51); // Green
  } else if (key === 'p') {
    currentColor = color(216, 105, 159); // Magenta
  } else if (key === 'b') {
    currentColor = color(81, 192, 217); // Blue
  } else if (key === 'y') {
    currentColor = color(236, 238, 43); // Yellow
  } else if (key === 'r') {
    currentColor = color(229, 44, 31); // Red
  }
}



