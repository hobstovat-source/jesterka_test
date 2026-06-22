const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const levelEl = document.getElementById('level');

let frame = 0;

const levels = [
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 150, y: 478, w: 110, h: 12 },
      { x: 330, y: 412, w: 92, h: 12 },
      { x: 520, y: 348, w: 84, h: 12 },
      { x: 690, y: 286, w: 72, h: 12 },
      { x: 860, y: 224, w: 58, h: 12 },
      { x: 1010, y: 164, w: 50, h: 12 }
    ]
  },
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 120, y: 486, w: 90, h: 10 },
      { x: 260, y: 430, w: 72, h: 10 },
      { x: 410, y: 372, w: 68, h: 10 },
      { x: 560, y: 316, w: 64, h: 10 },
      { x: 700, y: 260, w: 60, h: 10 },
      { x: 840, y: 206, w: 56, h: 10 },
      { x: 980, y: 150, w: 52, h: 10 },
      { x: 1120, y: 96, w: 48, h: 10 }
    ]
  },
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 95, y: 490, w: 76, h: 10 },
      { x: 208, y: 438, w: 60, h: 10 },
      { x: 320, y: 386, w: 55, h: 10 },
      { x: 438, y: 336, w: 52, h: 10 },
      { x: 560, y: 286, w: 50, h: 10 },
      { x: 688, y: 236, w: 48, h: 10 },
      { x: 818, y: 188, w: 46, h: 10 },
      { x: 950, y: 140, w: 44, h: 10 },
      { x: 1080, y: 92, w: 42, h: 10 }
    ]
  },
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 80, y: 494, w: 68, h: 9 },
      { x: 182, y: 448, w: 56, h: 9 },
      { x: 285, y: 404, w: 52, h: 9 },
      { x: 394, y: 360, w: 48, h: 9 },
      { x: 506, y: 316, w: 46, h: 9 },
      { x: 620, y: 272, w: 44, h: 9 },
      { x: 736, y: 228, w: 42, h: 9 },
      { x: 852, y: 184, w: 40, h: 9 },
      { x: 968, y: 140, w: 38, h: 9 },
      { x: 1082, y: 98, w: 36, h: 9 }
    ]
  },
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 70, y: 500, w: 62, h: 8 },
      { x: 170, y: 458, w: 50, h: 8 },
      { x: 274, y: 416, w: 46, h: 8 },
      { x: 382, y: 374, w: 42, h: 8 },
      { x: 494, y: 332, w: 40, h: 8 },
      { x: 606, y: 290, w: 38, h: 8 },
      { x: 718, y: 248, w: 36, h: 8 },
      { x: 828, y: 206, w: 34, h: 8 },
      { x: 940, y: 164, w: 32, h: 8 },
      { x: 1052, y: 122, w: 30, h: 8 },
      { x: 1160, y: 80, w: 28, h: 8 }
    ]
  },
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 60, y: 506, w: 56, h: 7 },
      { x: 148, y: 466, w: 46, h: 7 },
      { x: 238, y: 426, w: 42, h: 7 },
      { x: 334, y: 386, w: 38, h: 7 },
      { x: 434, y: 346, w: 36, h: 7 },
      { x: 538, y: 306, w: 34, h: 7 },
      { x: 646, y: 266, w: 32, h: 7 },
      { x: 756, y: 226, w: 30, h: 7 },
      { x: 868, y: 186, w: 28, h: 7 },
      { x: 980, y: 146, w: 26, h: 7 },
      { x: 1092, y: 106, w: 24, h: 7 },
      { x: 1190, y: 66, w: 22, h: 7 }
    ]
  },
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 52, y: 510, w: 50, h: 6 },
      { x: 132, y: 472, w: 42, h: 6 },
      { x: 214, y: 434, w: 38, h: 6 },
      { x: 300, y: 396, w: 34, h: 6 },
      { x: 392, y: 358, w: 32, h: 6 },
      { x: 488, y: 320, w: 30, h: 6 },
      { x: 588, y: 282, w: 28, h: 6 },
      { x: 690, y: 244, w: 26, h: 6 },
      { x: 794, y: 206, w: 24, h: 6 },
      { x: 900, y: 168, w: 22, h: 6 },
      { x: 1008, y: 130, w: 20, h: 6 },
      { x: 1118, y: 92, w: 18, h: 6 },
      { x: 1220, y: 54, w: 16, h: 6 }
    ]
  },
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 45, y: 516, w: 44, h: 5 },
      { x: 118, y: 480, w: 36, h: 5 },
      { x: 194, y: 444, w: 32, h: 5 },
      { x: 276, y: 408, w: 28, h: 5 },
      { x: 362, y: 372, w: 26, h: 5 },
      { x: 452, y: 336, w: 24, h: 5 },
      { x: 546, y: 300, w: 22, h: 5 },
      { x: 644, y: 264, w: 20, h: 5 },
      { x: 746, y: 228, w: 18, h: 5 },
      { x: 852, y: 192, w: 16, h: 5 },
      { x: 962, y: 156, w: 14, h: 5 },
      { x: 1076, y: 120, w: 12, h: 5 },
      { x: 1194, y: 84, w: 10, h: 5 }
    ]
  },
  {
    platforms: [
      { x: 0, y: 540, w: 1200, h: 60 },
      { x: 38, y: 522, w: 38, h: 4 },
      { x: 106, y: 488, w: 30, h: 4 },
      { x: 176, y: 454, w: 26, h: 4 },
      { x: 250, y: 420, w: 22, h: 4 },
      { x: 328, y: 386, w: 20, h: 4 },
      { x: 410, y: 352, w: 18, h: 4 },
      { x: 496, y: 318, w: 16, h: 4 },
      { x: 586, y: 284, w: 14, h: 4 },
      { x: 680, y: 250, w: 12, h: 4 },
      { x: 778, y: 216, w: 10, h: 4 },
      { x: 880, y: 182, w: 8, h: 4 },
      { x: 986, y: 148, w: 6, h: 4 },
      { x: 1096, y: 114, w: 4, h: 4 }
    ]
  }
];

const player1 = {
  x: 50,
  y: 460,
  w: 38,
  h: 58,
  vx: 0,
  vy: 0,
  onGround: false,
  color: '#2f9aff',
  name: 'Lizard',
  controls: { left: 'ArrowLeft', right: 'ArrowRight', jump: 'ArrowUp' },
  finished: false,
  facing: 1,
  jumpCooldown: 0,
  score: 0
};

const player2 = {
  x: 50,
  y: 460,
  w: 38,
  h: 58,
  vx: 0,
  vy: 0,
  onGround: false,
  color: '#ff5da2',
  name: 'Ant',
  controls: { left: 'a', right: 'd', jump: 'w' },
  finished: false,
  facing: 1,
  jumpCooldown: 0,
  score: 0
};

let currentLevel = 0;
let winner = null;
let transitionTimer = 0;
let gameOver = false;
const keys = {};

function updateHud() {
  score1El.textContent = player1.score;
  score2El.textContent = player2.score;
  levelEl.textContent = gameOver
    ? 'Konec'
    : `${currentLevel + 1} / ${levels.length}`;
}

function resetPlayers() {
  player1.x = 50;
  player1.y = 460;
  player1.vx = 0;
  player1.vy = 0;
  player1.onGround = false;
  player1.finished = false;
  player1.facing = 1;
  player1.jumpCooldown = 0;

  player2.x = 50;
  player2.y = 460;
  player2.vx = 0;
  player2.vy = 0;
  player2.onGround = false;
  player2.finished = false;
  player2.facing = 1;
  player2.jumpCooldown = 0;

  winner = null;
  transitionTimer = 0;
  updateHud();
}

function rectOverlap(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getLevelPlatforms() {
  return levels[currentLevel].platforms;
}

function updatePlayer(player) {
  if (player.finished) return;

  const leftPressed = keys[player.controls.left];
  const rightPressed = keys[player.controls.right];
  const jumpPressed = keys[player.controls.jump];

  const moveDirection = (rightPressed ? 1 : 0) - (leftPressed ? 1 : 0);
  const runSpeed = 5.1 + currentLevel * 0.25;

  if (moveDirection !== 0) {
    player.vx += moveDirection * 0.65;
    player.vx = clamp(player.vx, -runSpeed, runSpeed);
    player.facing = moveDirection;
  } else {
    player.vx *= 0.78;
    if (Math.abs(player.vx) < 0.08) player.vx = 0;
  }

  if (player.jumpCooldown > 0) player.jumpCooldown--;

  if (jumpPressed && player.onGround && player.jumpCooldown === 0) {
    player.vy = -13.8;
    player.onGround = false;
    player.jumpCooldown = 6;
  }

  player.vy += 0.7;
  if (player.vy > 12) player.vy = 12;

  const prevX = player.x;
  const prevY = player.y;

  player.x += player.vx;
  player.y += player.vy;

  // horizontal bounds
  if (player.x < 0) {
    player.x = 0;
    player.vx = 0;
  } else if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
    player.vx = 0;
  }

  // platform collisions
  const platforms = getLevelPlatforms();
  for (const platform of platforms) {
    const next = {
      x: player.x,
      y: player.y,
      w: player.w,
      h: player.h
    };

    const prev = {
      x: prevX,
      y: prevY,
      w: player.w,
      h: player.h
    };

    if (player.vy >= 0 && rectOverlap(next, platform) && prev.y + prev.h <= platform.y) {
      player.y = platform.y - player.h;
      player.vy = 0;
      player.onGround = true;
      break;
    }

    if (player.vy < 0 && rectOverlap(next, platform) && prev.y >= platform.y + platform.h) {
      player.y = platform.y + platform.h;
      player.vy = 0;
    }
  }

  // floor collision fallback
  if (player.y + player.h >= 540 && player.vy >= 0) {
    player.y = 540 - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  if (player.y + player.h >= canvas.height) {
    player.y = canvas.height - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  if (player.x + player.w >= 1120 && !player.finished) {
    player.finished = true;
    if (!winner) {
      winner = player;
      player.score += 1;
      updateHud();
      transitionTimer = 90;
    }
  }
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#8edfff');
  gradient.addColorStop(0.55, '#c7f3a1');
  gradient.addColorStop(1, '#f7ffe9');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // sun
  ctx.fillStyle = 'rgba(255, 241, 140, 0.9)';
  ctx.beginPath();
  ctx.arc(980, 90, 44, 0, Math.PI * 2);
  ctx.fill();

  // clouds
  for (let i = 0; i < 4; i++) {
    const x = (i * 320 + frame * 0.2) % 1300 - 120;
    const y = 70 + i * 50;
    ctx.fillStyle = 'rgba(255,255,255,0.62)';
    ctx.beginPath();
    ctx.ellipse(x, y, 38, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 24, y - 8, 28, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 54, y, 34, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // jungle hills
  ctx.fillStyle = '#9de18d';
  ctx.beginPath();
  ctx.moveTo(0, 390);
  ctx.quadraticCurveTo(180, 300, 360, 390);
  ctx.quadraticCurveTo(520, 450, 700, 360);
  ctx.quadraticCurveTo(920, 260, 1200, 390);
  ctx.lineTo(1200, 600);
  ctx.lineTo(0, 600);
  ctx.closePath();
  ctx.fill();

  // trees
  for (let i = 0; i < 8; i++) {
    const x = 80 + i * 150;
    const trunkH = 90 + (i % 3) * 18;
    ctx.fillStyle = '#6a4729';
    ctx.fillRect(x, 430 - trunkH, 18, trunkH);

    ctx.fillStyle = '#41b354';
    ctx.beginPath();
    ctx.ellipse(x + 9, 405 - trunkH, 48, 34, 0, 0, Math.PI * 2);
    ctx.ellipse(x - 18, 420 - trunkH, 30, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(x + 36, 420 - trunkH, 30, 20, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // vines / leaves
  for (let i = 0; i < 12; i++) {
    const x = (i * 110) % 1200;
    const y = 360 + (i % 4) * 22;
    ctx.fillStyle = i % 2 === 0 ? 'rgba(60, 184, 73, 0.55)' : 'rgba(255, 255, 255, 0.18)';
    ctx.fillRect(x, y, 5, 18);
    ctx.fillRect(x + 10, y - 6, 5, 14);
  }
}

function drawPlatform(platform) {
  ctx.fillStyle = '#f4f8d9';
  ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
  ctx.fillStyle = '#d3e58f';
  ctx.fillRect(platform.x, platform.y, platform.w, 4);
  ctx.fillStyle = '#b9d96d';
  for (let i = 0; i < platform.w; i += 26) {
    ctx.fillRect(platform.x + i, platform.y + 6, 18, 3);
  }
}

function drawFinish() {
  const gateX = 1120;
  const gateY = 430;
  ctx.fillStyle = '#f6c10e';
  ctx.fillRect(gateX - 10, gateY - 10, 52, 14);
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(gateX, gateY, 12, 110);
  ctx.fillRect(gateX + 18, gateY, 12, 110);
  ctx.fillStyle = '#4faa55';
  ctx.fillRect(gateX - 14, gateY - 24, 58, 18);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(gateX - 8, gateY - 18, 46, 6);
  ctx.fillStyle = '#b5ece6';
  ctx.beginPath();
  ctx.moveTo(gateX - 8, gateY + 110);
  ctx.lineTo(gateX + 42, gateY + 110);
  ctx.lineTo(gateX + 17, gateY + 140);
  ctx.closePath();
  ctx.fill();
}

function drawPlayer(player) {
  const runCycle = Math.sin(frame * 0.35 + player.x * 0.08) * 4;
  const bob = Math.sin(frame * 0.4 + player.x * 0.05) * 2;
  const bodyY = player.y + 10 + bob;
  const headY = player.y + bob;
  const eyeY = bodyY + 13;
  const eyeX = player.x + (player.facing > 0 ? 9 : 17);
  const legOffset = player.vx !== 0 ? runCycle : 0;

  // glow
  ctx.fillStyle = player.color;
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  ctx.ellipse(player.x + player.w / 2, player.y + player.h / 2, player.w * 0.78, player.h * 0.9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // body
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.roundRect(player.x + 3, bodyY + 2, player.w - 6, player.h - 18, 10);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillRect(player.x + 5, bodyY + 6, player.w - 10, 10);

  // head
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.roundRect(player.x + 4, headY, player.w - 8, 18, 8);
  ctx.fill();
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.roundRect(player.x + 6, headY + 3, player.w - 12, 12, 6);
  ctx.fill();

  // eyes
  ctx.fillStyle = '#17335a';
  ctx.fillRect(eyeX, eyeY, 4, 4);
  ctx.fillRect(eyeX + (player.facing > 0 ? 10 : -6), eyeY, 4, 4);

  // mouth / smile
  ctx.strokeStyle = '#17335a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(player.x + player.w / 2, headY + 13, 5, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // legs
  ctx.fillStyle = '#123253';
  for (let i = 0; i < 3; i++) {
    const legX = player.x + 7 + i * 8;
    const legY = bodyY + player.h - 18 + (i % 2 === 0 ? legOffset : -legOffset);
    ctx.fillRect(legX, legY, 5, 18);
  }

  // tail / antenna
  if (player.name === 'Lizard') {
    ctx.fillStyle = '#0f2d52';
    ctx.beginPath();
    ctx.moveTo(player.x + player.w / 2, bodyY + 8);
    ctx.lineTo(player.x + player.w / 2 + 10, bodyY - 4);
    ctx.lineTo(player.x + player.w / 2 + 16, bodyY + 3);
    ctx.fill();
  } else {
    ctx.fillStyle = '#123253';
    ctx.fillRect(player.x + player.w / 2 - 3, headY - 10, 3, 10);
    ctx.fillRect(player.x + player.w / 2 + 3, headY - 10, 3, 10);
  }
}

function drawOverlay() {
  if (gameOver) {
    ctx.fillStyle = 'rgba(18, 51, 83, 0.68)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '700 46px Segoe UI';

    if (player1.score > player2.score) {
      ctx.fillText('🦎 Zvířecí vítěz: Lizard', 340, 230);
    } else if (player2.score > player1.score) {
      ctx.fillText('🐜 Zvířecí vítěz: Ant', 360, 230);
    } else {
      ctx.fillText('⚖️ Remíza!', 470, 230);
    }

    ctx.font = '500 26px Segoe UI';
    ctx.fillText(`Skóre: ${player1.score} : ${player2.score}`, 430, 300);
    ctx.fillText('Obnovit hru přes F5', 450, 360);
    return;
  }

  if (winner && transitionTimer > 0) {
    ctx.fillStyle = 'rgba(18, 51, 83, 0.62)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '700 44px Segoe UI';
    ctx.fillText(`${winner.name} získal bod!`, 420, 250);
    ctx.font = '500 24px Segoe UI';
    ctx.fillText(`Další level za ${Math.ceil(transitionTimer / 60)}...`, 470, 310);
  }
}

function update() {
  frame++;

  if (gameOver) {
    draw();
    requestAnimationFrame(update);
    return;
  }

  if (transitionTimer > 0) {
    transitionTimer--;
    if (transitionTimer === 0) {
      if (currentLevel + 1 >= levels.length) {
        gameOver = true;
        updateHud();
      } else {
        currentLevel += 1;
        resetPlayers();
      }
      draw();
      requestAnimationFrame(update);
      return;
    }
  } else {
    updatePlayer(player1);
    updatePlayer(player2);
  }

  draw();
  requestAnimationFrame(update);
}

function draw() {
  drawBackground();

  for (const platform of getLevelPlatforms()) {
    drawPlatform(platform);
  }

  drawFinish();

  drawPlayer(player1);
  drawPlayer(player2);
  drawOverlay();
}

function handleKeyDown(event) {
  keys[event.key] = true;
  keys[event.key.toLowerCase()] = true;
  if (event.key === ' ') event.preventDefault();
}

function handleKeyUp(event) {
  keys[event.key] = false;
  keys[event.key.toLowerCase()] = false;
}

for (const button of document.querySelectorAll('[data-key]')) {
  const key = button.dataset.key;

  button.addEventListener('pointerdown', () => {
    keys[key] = true;
  });

  const release = () => {
    keys[key] = false;
  };

  button.addEventListener('pointerup', release);
  button.addEventListener('pointerleave', release);
  button.addEventListener('pointercancel', release);
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

updateHud();
resetPlayers();
requestAnimationFrame(update);
