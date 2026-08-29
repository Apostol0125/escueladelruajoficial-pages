(() => {
  const pages = [...document.querySelectorAll('.mag-page')];
  const book = document.getElementById('book');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const label = document.getElementById('pageLabel');
  const progress = document.getElementById('progressBar');
  const toc = document.getElementById('toc');
  const tocBtn = document.getElementById('tocBtn');
  const reader = document.getElementById('reader');
  let current = 0;
  let locked = false;
  let touchStart = 0;

  pages.forEach((page, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = (index === 0 ? 'Portada' : String(index).padStart(2, '0') + ' · ' + page.dataset.title);
    button.addEventListener('click', () => { show(index); toc.hidden = true; });
    toc.appendChild(button);
  });

  function render() {
    pages.forEach((page, index) => page.classList.toggle('is-active', index === current));
    label.textContent = current === 0 ? 'Portada' : 'Página ' + current + ' de ' + (pages.length - 1);
    progress.style.width = ((current + 1) / pages.length * 100) + '%';
    prev.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    next.querySelector('span').textContent = current === pages.length - 1 ? 'Final' : 'Siguiente';
    document.title = pages[current].dataset.title + ' | MAIER Magazine';
  }

  function show(index) {
    if (locked || index < 0 || index >= pages.length || index === current) return;
    locked = true;
    const direction = index > current ? 'turn-next' : 'turn-prev';
    book.classList.add(direction);
    window.setTimeout(() => {
      current = index;
      render();
    }, 150);
    window.setTimeout(() => {
      book.classList.remove(direction);
      locked = false;
    }, 360);
  }

  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  tocBtn.addEventListener('click', () => { toc.hidden = !toc.hidden; });
  document.getElementById('printBtn').addEventListener('click', () => window.print());
  document.getElementById('fullscreenBtn').addEventListener('click', async () => {
    if (!document.fullscreenElement) await reader.requestFullscreen?.();
    else await document.exitFullscreen?.();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown') show(current + 1);
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') show(current - 1);
    if (event.key === 'Home') show(0);
    if (event.key === 'End') show(pages.length - 1);
  });
  book.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, {passive:true});
  book.addEventListener('touchend', event => {
    const delta = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 55) show(current + (delta < 0 ? 1 : -1));
  }, {passive:true});
  document.getElementById('year').textContent = new Date().getFullYear();
  render();
})();