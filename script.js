const gardenEl = document.getElementById('garden');
const seedButtonsEl = document.getElementById('seedButtons');
const moneyEl = document.getElementById('money');

const PLANTS = {
  daisy: {
    label: 'Sedmikráska',
    icon: '🌼',
    seedCost: 1,
    growthMs: 10 * 1000,
    value: 1,
    colorClass: 'daisy'
  },
  dandelion: {
    label: 'Pampeliška',
    icon: '🌼',
    seedCost: 2,
    growthMs: 30 * 1000,
    value: 2,
    colorClass: 'dandelion'
  },
  tulip: {
    label: 'Tulipán',
    icon: '🌷',
    seedCost: 4,
    growthMs: 2 * 60 * 1000,
    value: 5,
    colorClass: 'tulip'
  },
  rose: {
    label: 'Růže',
    icon: '🌹',
    seedCost: 8,
    growthMs: 3 * 60 * 1000,
    value: 10,
    colorClass: 'rose'
  },
  sunflower: {
    label: 'Slunečnice',
    icon: '🌻',
    seedCost: 6,
    growthMs: 45 * 1000,
    value: 4,
    colorClass: 'sunflower'
  },
  appleTree: {
    label: 'Jabloň',
    icon: '🌳',
    seedCost: 20,
    growthMs: 10 * 60 * 1000,
    value: 40,
    colorClass: 'tree'
  }
};

const inventory = {
  daisy: 5,
  dandelion: 5,
  tulip: 1,
  rose: 0,
  sunflower: 0,
  appleTree: 0
};

let money = 0;
let selectedSeed = 'daisy';
const grid = Array(25).fill(null);

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  return `${seconds}s`;
}

function updateMoney() {
  moneyEl.textContent = `${money} Kč`;
}

function createSeedButtons() {
  for (const [key, plant] of Object.entries(PLANTS)) {
    const button = document.createElement('button');
    button.className = 'seed-btn';
    button.dataset.seed = key;
    button.disabled = inventory[key] <= 0 && key !== selectedSeed;
    button.innerHTML = `
      <span>${plant.label}</span>
      <small>${plant.seedCost} Kč · ${formatTime(plant.growthMs)}</small>
      <strong>${inventory[key]}</strong>
    `;
    button.addEventListener('click', () => {
      selectedSeed = key;
      updateSeedButtons();
    });
    seedButtonsEl.appendChild(button);
  }
}

function updateSeedButtons() {
  for (const button of seedButtonsEl.querySelectorAll('[data-seed]')) {
    const key = button.dataset.seed;
    button.classList.toggle('active', key === selectedSeed);
    button.disabled = inventory[key] <= 0 && key !== selectedSeed;
    button.querySelector('strong').textContent = inventory[key];
  }
}

function createGarden() {
  for (let i = 0; i < 25; i += 1) {
    const cell = document.createElement('button');
    cell.className = 'garden-cell';
    cell.dataset.index = String(i);
    cell.addEventListener('click', () => handleCellClick(i));
    gardenEl.appendChild(cell);
  }
}

function getPlantStage(plant) {
  const config = PLANTS[plant.type];
  const ratio = Math.min(1, (Date.now() - plant.plantedAt) / config.growthMs);
  if (ratio >= 1) return 3;
  if (ratio >= 0.66) return 2;
  if (ratio >= 0.33) return 1;
  return 0;
}

function renderGarden() {
  const cells = gardenEl.querySelectorAll('.garden-cell');
  cells.forEach((cell, index) => {
    const plant = grid[index];
    cell.innerHTML = '';

    if (plant) {
      const config = PLANTS[plant.type];
      const elapsed = Date.now() - plant.plantedAt;
      const stage = getPlantStage(plant);
      const isReady = elapsed >= config.growthMs;

      const plantEl = document.createElement('div');
      plantEl.className = `plant stage-${stage}`;
      plantEl.innerHTML = `<span class="plant-icon ${config.colorClass}">${config.icon}</span>`;
      cell.appendChild(plantEl);

      if (!isReady) {
        const progress = document.createElement('span');
        progress.className = 'plant-progress';
        progress.textContent = formatTime(config.growthMs - elapsed);
        cell.appendChild(progress);
      }

      cell.title = isReady
        ? `Klikni pro utržení ${config.label} za ${config.value} Kč`
        : `${config.label} roste ještě ${formatTime(config.growthMs - elapsed)}`;
      cell.style.cursor = 'pointer';
    } else {
      cell.title = 'Prázdné políčko';
      cell.style.cursor = 'pointer';
    }
  });
}

function handleCellClick(index) {
  const plant = grid[index];

  if (plant) {
    const config = PLANTS[plant.type];
    const elapsed = Date.now() - plant.plantedAt;

    if (elapsed >= config.growthMs) {
      money += config.value;
      grid[index] = null;
      updateMoney();
      renderGarden();
      return;
    }

    return;
  }

  if (inventory[selectedSeed] <= 0) {
    return;
  }

  inventory[selectedSeed] -= 1;
  grid[index] = {
    type: selectedSeed,
    plantedAt: Date.now()
  };
  updateSeedButtons();
  renderGarden();
}

function updatePlants() {
  renderGarden();
}

createSeedButtons();
createGarden();
updateMoney();
updateSeedButtons();
renderGarden();
setInterval(updatePlants, 500);
