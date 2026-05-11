function initGridPriorityProgress(root = document) {
  root.querySelectorAll('.grid-priority-progress').forEach(progress => {
    // Evitar doble inicialización
    if (progress.dataset.initialized) return;
    progress.dataset.initialized = "true";

    const completed = parseInt(progress.dataset.completed) || 0;
    const attempted = parseInt(progress.dataset.attempted) || 0;
    const eligible = parseInt(progress.dataset.eligible) || 0;
    const target = parseInt(progress.dataset.target) || 0;
    const total = parseInt(progress.dataset.total) || 50;

    const grid = document.createElement('div');
    grid.classList.add('priority-grid');

    for (let i = 0; i < total; i++) {
      const box = document.createElement('div');
      box.classList.add('player-box');

      if (i < completed) {
        box.classList.add('complete');
      } else if (i < attempted) {
        box.classList.add('failed');
      } else if (i < eligible) {
        box.classList.add('not-played');
      } else {
        box.classList.add('not-eligible');
      }

      if (i < target) {
        box.classList.add('target-box');
      }

      grid.appendChild(box);
    }

    progress.innerHTML = '';
    progress.appendChild(grid);
  });
}

function initGridGuildRanksProgress(root = document) {
  root.querySelectorAll(".grid-ranks-progress").forEach(container => {
    // Evitar doble inicialización
    if (container.dataset.initialized) return;
    container.dataset.initialized = "true";

    const grandMasters = Number(container.dataset.grandMaster || 0);
    const knights = Number(container.dataset.knight || 0);
    const padawan = Number(container.dataset.padawan || 0);
    const target = parseInt(container.dataset.target) || 0;
    const total = Number(container.dataset.total || 50);

    const grid = document.createElement('div');
    grid.classList.add('priority-grid');

    for (let i = 0; i < total; i++) {
      const box = document.createElement('div');
      box.classList.add('player-box');

      if (i < grandMasters) {
        box.classList.add('grand-master');
      } else if (i < knights + grandMasters) {
        box.classList.add('complete');
      } else if (i < padawan + knights + grandMasters) {
        box.classList.add('failed');
      } else {
        box.classList.add('not-eligible');
      }

      if (i < target) {
        box.classList.add('target-box');
      }

      grid.appendChild(box);
    }

    container.innerHTML = '';
    container.appendChild(grid);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGridPriorityProgress();
});
