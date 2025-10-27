const fmt = (n) => {
  try { return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  catch { return Number(n).toFixed(2); }
}

/* ---------- Tema (claro/escuro) ---------- */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const updateThemeButton = () => {
    const dark = document.body.classList.contains('theme-dark');
    themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
    themeToggle.textContent = dark ? '☀️Day' : '🌙Night';
  };
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    updateThemeButton();
  });
  updateThemeButton();
}


const produtosData = [
  { id: 'vela-aromatica-aurora', nome: 'Vela Aromática Aurora', preco: 29.90, categoria: 'Decoração', img: 'PPD.jpg', desc: 'Vela premium com aroma de jasmim e cera vegetal.' },
  { id: 'colar-lua-serena', nome: 'Colar Lua Serena', preco: 149.00, categoria: 'Acessórios', img: 'PPD.jpg', desc: 'Pingente em prata com banho dourado.' },
  { id: 'kit-ritual-flores', nome: 'Kit Ritual Flores', preco: 89.50, categoria: 'Bem-estar', img: 'PPD.jpg', desc: 'Incenso, óleo essencial e pedra energética.' },
  { id: 'capa-almofada-pastel', nome: 'Capa de Almofada Pastel', preco: 59.90, categoria: 'Casa', img: 'PPD.jpg', desc: 'Linho misto com estampa suave.' },
  { id: 'cha-sereno', nome: 'Chá Sereno', preco: 24.00, categoria: 'Alimentos', img: 'PPD.jpg', desc: 'Mistura de ervas relaxantes — 50g.' },
  { id: 'manta-aurora', nome: 'Manta Aurora', preco: 219.90, categoria: 'Casa', img: 'PPD.jpg', desc: 'Manta de lã leve, acabamento premium.' },
  { id: 'copo-termico-elegance', nome: 'Copo Térmico Elegance', preco: 79.90, categoria: 'Utensílios', img: 'PPD.jpg', desc: 'Aço inox com isolamento.' },
  { id: 'incenso-artesanal', nome: 'Incenso Artesanal', preco: 15.00, categoria: 'Bem-estar', img: 'PPD.jpg', desc: 'Fragrâncias naturais, longa duração.' },
  { id: 'velas-duo', nome: 'Velas Decorativas Duo', preco: 49.00, categoria: 'Decoração', img: 'PPD.jpg', desc: 'Conjunto com duas velas em tons pastel.' },
  { id: 'sabonete-floral', nome: 'Sabonete Líquido Floral', preco: 32.00, categoria: 'Higiene', img: 'PPD.jpg', desc: 'Fórmula suave com óleos naturais.' },
  { id: 'porta-joias-minimal', nome: 'Porta-Jóias Minimal', preco: 129.00, categoria: 'Acessórios', img: 'PPD.jpg', desc: 'Design clean em MDF.' },
  { id: 'agenda-2025-premium', nome: 'Agenda 2025 Premium', preco: 65.00, categoria: 'Papelaria', img: 'PPD.jpg', desc: 'Capa dura, folhas premium.' }
];


const productsContainer = document.getElementById('products-list');
const resultsCount = document.getElementById('results-count');

function renderProdutos(lista) {
  if (!productsContainer) return;
  productsContainer.innerHTML = '';
  lista.forEach(p => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('role', 'listitem');
    article.setAttribute('data-name', p.nome);
    article.setAttribute('data-price', p.preco);
    article.setAttribute('data-category', p.categoria);
    article.id = p.id;

    article.innerHTML = `
      <img src="${p.img}" alt="${p.nome}">
      <div class="card-body">
        <h3 class="product-name">${p.nome}</h3>
        <p class="product-category">${p.categoria}</p>
        <p class="product-desc">${p.desc}</p>
        <div class="card-footer">
          <span class="price">R$ ${fmt(p.preco)}</span>
          <a class="btn small" href="produtos.html#${p.id}">Ver</a>
        </div>
      </div>
    `;
    productsContainer.appendChild(article);
  });
  if (resultsCount) resultsCount.innerHTML = `Mostrando <strong>${lista.length}</strong> ${lista.length === 1 ? 'produto' : 'produtos'}`;
}

/* Inicializa */
renderProdutos(produtosData);

/* ---------- Busca e Ordenação ---------- */
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');

function aplicarFiltroOrdenacao() {
  const termo = searchInput ? searchInput.value.trim().toLowerCase() : '';
  let filtrados = produtosData.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.categoria.toLowerCase().includes(termo) ||
    p.desc.toLowerCase().includes(termo)
  );

  if (sortSelect) {
    const mode = sortSelect.value;
    if (mode === 'price-asc') filtrados.sort((a,b)=>a.preco-b.preco);
    if (mode === 'price-desc') filtrados.sort((a,b)=>b.preco-a.preco);
    if (mode === 'name-asc') filtrados.sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
    if (mode === 'name-desc') filtrados.sort((a,b)=>b.nome.localeCompare(a.nome,'pt-BR'));
  }

  renderProdutos(filtrados);
}

if (searchInput) searchInput.addEventListener('input', aplicarFiltroOrdenacao);
if (sortSelect) sortSelect.addEventListener('change', aplicarFiltroOrdenacao);

/* ---------- FAQ (perguntas frequentes) ---------- */
const faqItems = document.querySelectorAll('.faq-item');
const faqOpenAll = document.getElementById('faq-open-all');
const faqCloseAll = document.getElementById('faq-close-all');
const faqCounter = document.getElementById('faq-counter');

function updateFaqCounter() {
  if (!faqCounter) return;
  const abertas = Array.from(faqItems).filter(it => it.classList.contains('open')).length;
  faqCounter.textContent = `${abertas} ${abertas === 1 ? 'aberta' : 'abertas'}`;
}

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  if (!btn || !answer) return;

  answer.style.display = 'none';
  btn.setAttribute('aria-expanded', 'false');

  const toggle = () => {
    const isOpen = item.classList.toggle('open');
    answer.style.display = isOpen ? 'block' : 'none';
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const ikon = btn.querySelector('.toggle-icon');
    if (ikon) ikon.textContent = isOpen ? '−' : '+';
    updateFaqCounter();
  };

  btn.addEventListener('click', toggle);
  btn.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); toggle(); } });
});

if (faqOpenAll) faqOpenAll.addEventListener('click', () => {
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    item.classList.add('open');
    answer.style.display = 'block';
    btn.setAttribute('aria-expanded','true');
    const ikon = btn.querySelector('.toggle-icon'); if (ikon) ikon.textContent='−';
  });
  updateFaqCounter();
});

if (faqCloseAll) faqCloseAll.addEventListener('click', () => {
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    item.classList.remove('open');
    answer.style.display = 'none';
    btn.setAttribute('aria-expanded','false');
    const ikon = btn.querySelector('.toggle-icon'); if (ikon) ikon.textContent='+';
  });
  updateFaqCounter();
});

updateFaqCounter();
