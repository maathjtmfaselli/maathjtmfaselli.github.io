document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.grid-priority-progress').forEach(progress => {
    const completed = parseInt(progress.dataset.completed) || 0;
    const attempted = parseInt(progress.dataset.attempted) || 0;
    const eligible = parseInt(progress.dataset.eligible) || 0;
    const target = parseInt(progress.dataset.target) || 0;
    const total = parseInt(progress.dataset.total) || 50;

    // Crear el grid visual
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
});
