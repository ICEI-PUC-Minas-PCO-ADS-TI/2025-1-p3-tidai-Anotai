const searchIcon = document.getElementById("search-toggle");
const pesquisaDiv = document.getElementById("pesquisa");

searchIcon.addEventListener("click", () => {
  pesquisaDiv.classList.toggle("active");
});

//CARROSSEL
const container = document.querySelector(".destaques");

const totalCards = container.querySelectorAll(".play-destaque").length;
const cardsPerPage = 3;
const cardWidth = 420;
const gap = 20;
const scrollAmount = (cardWidth + gap) * cardsPerPage;
const totalPages = Math.ceil(totalCards / cardsPerPage);

let currentPage = 0;

function goToPage(page) {
  const clampedPage = Math.max(0, Math.min(page, totalPages - 1));
  currentPage = clampedPage;
  container.scrollTo({ left: scrollAmount * clampedPage, behavior: "smooth" });
}

// Auto-scroll
setInterval(() => {
  const nextPage = (currentPage + 1) % totalPages;
  goToPage(nextPage);
}, 3000);

// --- Avaliação por estrelas ---
const estrelas = document.querySelectorAll(".estrelas-avaliacao i");
let notaSelecionada = 0;

estrelas.forEach((estrela) => {
  estrela.addEventListener("click", () => {
    notaSelecionada = parseInt(estrela.getAttribute("data-value"));
    atualizarEstrelas(notaSelecionada);
  });

  estrela.addEventListener("mouseover", () => {
    const valor = parseInt(estrela.getAttribute("data-value"));
    atualizarEstrelas(valor);
  });

  estrela.addEventListener("mouseout", () => {
    atualizarEstrelas(notaSelecionada);
  });
});

function atualizarEstrelas(nota) {
  estrelas.forEach((estrela) => {
    const valor = parseInt(estrela.getAttribute("data-value"));
    if (valor <= nota) {
      estrela.classList.remove("bi-star");
      estrela.classList.add("bi-star-fill");
    } else {
      estrela.classList.remove("bi-star-fill");
      estrela.classList.add("bi-star");
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  try {
    // Buscar dados da playlist
    const res = await fetch(`/playlists/${id}`);
    const playlist = await res.json();

    document.getElementById('nome').textContent = playlist.nome_playlist;
    document.querySelector('#img-playlist img').src = `/uploads/${playlist.url_imagem_playlist}`;
    document.querySelector('#perfil img').src = `/uploads/${playlist.url_image_perfil}`;
    document.querySelector('#perfil p').textContent = `@${playlist.nome_usuario}`;
    document.querySelector('#publicacao span').textContent = playlist.data_criacao ?? 'Data não disponível';

    // Buscar metas da playlist
    const metasContainer = document.getElementById('container-baixo');
    const resMetas = await fetch(`/playlists/${id}/metas`);
    const metas = await resMetas.json();

    metas.forEach((meta, index) => {
      const div = document.createElement('div');
      div.className = 'metas';
      div.innerHTML = `
    <div class="titulo">
      <p>${index + 1}</p>
      <div class="img-meta">
        <img src="${meta.url_imagem_meta ? `/uploads/${meta.url_imagem_meta}` : '#'}" alt>
      </div>
      <p>${meta.nome_meta}</p>
    </div>
    <div id="descricao">
      <p>${meta.descricao_meta}</p>
    </div>
    <div id="status">
      <label class="check-checkbox meta-check">
        <input type="checkbox" class="meta-done">
        <span class="icon">
          <i class="bi bi-check-circle"></i>
          <i class="bi bi-check-circle-fill"></i>
        </span>
      </label>
    </div>
  `;

      // ✅ Redirecionar ao clicar na meta
      div.addEventListener('click', () => {
        window.location.href = `meta.html?id=${meta.id_metas}`;
      });

      metasContainer.appendChild(div);
    });
  } catch (err) {
    console.error('Erro ao carregar playlist ou metas:', err);
  }
});
