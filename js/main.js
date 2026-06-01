/* ============================================================
   MAIN.JS — Lógica de UI · Biblioteca Universal 2026
   ──────────────────────────────────────────────────────────
   Requiere data.js cargado antes en el HTML.
   01. Estado de la aplicación
   02. Render de cards
   03. IntersectionObserver
   04. Lightbox
   05. Filtros y búsqueda
   06. Navbar (hamburguesa + dropdown + scroll)
   07. Cursor personalizado
   08. Parallax del header
   09. Init
   ============================================================ */


/* ── 01. ESTADO ─────────────────────────────────────────── */
let searchTerm   = '';
let activeFilter = 'all';
let activeSort   = 'default';


/* ── 02. RENDER DE CARDS ────────────────────────────────── */
function renderBooks(books) {
  const grid  = document.getElementById('booksGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultsCount');

  if (!grid) return;
  grid.innerHTML = '';

  if (books.length === 0) {
    if (empty) empty.style.display = 'block';
    if (count) count.textContent   = 'Sin resultados';
    return;
  }

  if (empty) empty.style.display = 'none';
  if (count) count.textContent   = `Mostrando ${books.length} obra${books.length !== 1 ? 's' : ''}`;

  books.forEach((book, i) => {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.id = book.id;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `${book.title} — ${book.author}. Hacer clic para ver sinopsis.`);
    card.style.transitionDelay = `${(i % 8) * 50}ms`;

    card.innerHTML = `
      <!-- Portada de libro — ${book.title} -->
      <!-- Tamaño recomendado: 400×600 px | Proporción: 2:3 -->
      <!-- Para imagen propia: editá el campo cover en js/data.js -->
      <!-- Ruta sugerida: img/portadas/${book.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')}.jpg -->
      <div class="card-img-wrap">
        <img
          class="card-img"
          src="${book.cover}"
          alt="Portada de ${book.title}"
          loading="lazy"
        />
        <div class="card-year-badge">${formatYear(book.year)}</div>
        <div class="card-rank" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
      </div>
      <div class="card-body">
        <div class="card-author">${book.author}</div>
        <h2 class="card-title">${book.title}</h2>
        <div class="card-stars">
          ${renderStars(book.rating)}
          <span class="card-rating-num" aria-label="Puntuación ${book.rating.toFixed(1)} de 5">${book.rating.toFixed(1)}</span>
        </div>
        <div class="card-divider" aria-hidden="true"></div>
        <p class="card-synopsis">${book.synopsis}</p>
        <span class="card-cta" aria-hidden="true">Leer sinopsis completa →</span>
      </div>
    `;

    card.addEventListener('click',   ()  => openLightbox(book));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(book); }
    });

    grid.appendChild(card);
  });

  observeCards();
}


/* ── 03. INTERSECTIONOBSERVER ───────────────────────────── */
function observeCards() {
  const cards = document.querySelectorAll('.book-card:not(.visible), .author-card:not(.visible), .tl-item:not(.visible)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  cards.forEach(card => io.observe(card));
}


/* ── 04. LIGHTBOX ───────────────────────────────────────── */
function openLightbox(book) {
  const lb   = document.getElementById('lightbox');
  const body = document.getElementById('lightboxBody');
  if (!lb || !body) return;

  body.innerHTML = `
    <div class="lb-cover">
      <img
        src="${book.cover}"
        alt="Portada de ${book.title}"
      />
    </div>
    <div class="lb-info">
      <div class="lb-label">Clásico de la Literatura Universal</div>
      <h2 class="lb-title">${book.title}</h2>
      <p class="lb-author">por ${book.author}</p>
      <div class="lb-meta">
        <div class="lb-meta-item">
          <span class="lb-meta-key">Año</span>
          <span class="lb-meta-val">${formatYear(book.year)}</span>
        </div>
        <div class="lb-meta-item">
          <span class="lb-meta-key">Puntuación</span>
          <div class="lb-stars">
            ${renderStars(book.rating, true)}
            <span class="lb-rating-num">${book.rating.toFixed(1)} / 5</span>
          </div>
        </div>
      </div>
      <div class="lb-synopsis-title">Sinopsis</div>
      <p class="lb-synopsis">${book.synopsis}</p>
    </div>
  `;

  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose')?.focus();
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
document.getElementById('lightboxBackdrop')?.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


/* ── 05. FILTROS Y BÚSQUEDA ─────────────────────────────── */
function applyFilters() {
  let filtered = [...BOOKS];

  if (searchTerm) {
    const t = searchTerm.toLowerCase();
    filtered = filtered.filter(b =>
      b.title.toLowerCase().includes(t)  ||
      b.author.toLowerCase().includes(t) ||
      String(b.year).includes(t)
    );
  }

  if (activeFilter === 'high')    filtered = filtered.filter(b => b.rating >= 4.8);
  if (activeFilter === 'ancient') filtered = filtered.filter(b => b.era === 'ancient');
  if (activeFilter === 'modern')  filtered = filtered.filter(b => b.era === 'modern');

  switch (activeSort) {
    case 'year-asc':  filtered.sort((a, b) => a.year - b.year);                      break;
    case 'year-desc': filtered.sort((a, b) => b.year - a.year);                      break;
    case 'rating':    filtered.sort((a, b) => b.rating - a.rating);                  break;
    case 'alpha':     filtered.sort((a, b) => a.title.localeCompare(b.title, 'es')); break;
  }

  renderBooks(filtered);
}

const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim();
    searchClear?.classList.toggle('visible', searchTerm.length > 0);
    applyFilters();
  });
}

if (searchClear) {
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchTerm = '';
    searchClear.classList.remove('visible');
    searchInput.focus();
    applyFilters();
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});

const sortSelect = document.getElementById('sortSelect');
if (sortSelect) {
  sortSelect.addEventListener('change', e => {
    activeSort = e.target.value;
    applyFilters();
  });
}

window.resetFilters = function () {
  if (searchInput) searchInput.value = '';
  searchTerm   = '';
  activeFilter = 'all';
  activeSort   = 'default';
  searchClear?.classList.remove('visible');
  if (sortSelect) sortSelect.value = 'default';
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
  applyFilters();
};


/* ── 06. NAVBAR ─────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navList   = document.getElementById('navList');
const navbar    = document.getElementById('navbar');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('open', isOpen);
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    const link     = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;

    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const isOpen = item.classList.toggle('open');
        link.setAttribute('aria-expanded', isOpen);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !navToggle.contains(e.target)) {
      navList.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}


/* ── 07. CURSOR PERSONALIZADO ───────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animFollower() {
    fx += (mx - fx) * 0.11;
    fy += (my - fy) * 0.11;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  })();
}


/* ── 08. PARALLAX DEL HEADER ────────────────────────────── */
const headerBg = document.getElementById('headerBg');

if (headerBg) {
  window.addEventListener('scroll', () => {
    headerBg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
  }, { passive: true });
}


/* ── 09. INIT ───────────────────────────────────────────── */
// Si existe el grid principal, renderizar libros
if (document.getElementById('booksGrid')) {
  renderBooks(BOOKS);
}

// Observer general para elementos con animación
observeCards();
