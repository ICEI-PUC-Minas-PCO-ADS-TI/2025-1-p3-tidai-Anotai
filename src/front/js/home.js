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

//range input

const range = document.getElementById("meuRange");
const rangeValue = document.getElementById("rangeValue");
const valoresPossiveis = [1, 5, 10];

function updateRange() {
  const min = Number(range.min);
  const max = Number(range.max);
  const val = Number(range.value);

  // Calcula a posição real da bolinha
  const percent = (val - min) / (max - min);

  // Pega a largura real do range
  const rangeWidth = range.offsetWidth;
  const thumbWidth = 20; // Aproximadamente o tamanho da bolinha no navegador padrão
  const offset = percent * (rangeWidth - thumbWidth) + thumbWidth / 2;

  // Atualiza o texto e a posição
  rangeValue.textContent = valoresPossiveis[val];
  rangeValue.style.left = `${offset}px`;
}

// Inicializa
updateRange();

// Atualiza enquanto desliza
range.addEventListener("input", updateRange);
window.addEventListener("resize", updateRange); // Também atualiza se a tela mudar

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

//TAGS

const tagInput = document.getElementById("tagInput");
const addTagBtn = document.getElementById("addTagBtn");
const tagsContainer = document.getElementById("tags-container");

// Função para criar a tag
function criarTag(texto) {
  const novaTag = document.createElement("span");
  novaTag.className = "tag";
  novaTag.innerHTML = `${texto} <i class="remove-tag bi bi-x"></i>`;
  tagsContainer.appendChild(novaTag);
}

// Evento ao clicar no ícone "+"
addTagBtn.addEventListener("click", () => {
  const texto = tagInput.value.trim();
  if (texto !== "") {
    criarTag(texto);
    tagInput.value = "";
  }
});

// Evento ao pressionar Enter
tagInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTagBtn.click();
  }
});

// Evento de remover a tag ao clicar no "x"
tagsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-tag")) {
    event.target.parentElement.remove();
  }
});

//CATEGORIA

const categoriaInput = document.getElementById("categoriaInput");
const addCategoriaBtn = document.getElementById("addCategoriaBtn");
const categoriasContainer = document.getElementById("categorias-container");
const MAX_CATEGORIA_LENGTH = 15;

function criarCategoria(texto) {
  const textoFinal =
    texto.length > MAX_CATEGORIA_LENGTH
      ? texto.slice(0, MAX_CATEGORIA_LENGTH) + "…"
      : texto;

  const novaCategoria = document.createElement("span");
  novaCategoria.className = "tag";
  novaCategoria.innerHTML = `${textoFinal} <i class="remove-categoria bi bi-x"></i>`;
  categoriasContainer.appendChild(novaCategoria);
}

// Clique no ícone "+"
addCategoriaBtn.addEventListener("click", () => {
  const texto = categoriaInput.value.trim();
  if (texto) {
    criarCategoria(texto);
    categoriaInput.value = "";
  }
});

// Pressionar Enter
categoriaInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addCategoriaBtn.click();
  }
});

// Remoção da categoria
categoriasContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-categoria")) {
    event.target.parentElement.remove();
  }
});

async function carregarTodasPlaylists() {
  try {
    const response = await fetch("/playlists/destaques");
    const playlists = await response.json();

    const container = document.getElementById("container3");
    container.innerHTML = ""; // limpa conteúdo anterior

    playlists.forEach((playlist) => {
      const card = document.createElement("div");
      card.className = "playlists-metas";
      card.innerHTML = `
    <div class="img-metas">
      <img src="${playlist.url_imagem_playlist ? `/uploads/${playlist.url_imagem_playlist}` : "#"}" alt="Imagem da playlist">
    </div>
    <div class="detalhes-metas">
      <div class="txt-metas">
        <h4>${playlist.nome_playlist}</h4>
        <hr>
        <p>${playlist.descricao_playlist}</p>
      </div>
      <div class="perfil-metas">
        <div class="perfil">
          <img src="${playlist.url_image_perfil ? `/uploads/${playlist.url_image_perfil}` : "#"}" alt="Imagem do perfil">
          <p id="nome-perfil">@${playlist.nome_usuario ?? "Usuário"}</p>
        </div> 
        <div class="estrelas">
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
        </div>
      </div>
    </div>
  `;

      // ✅ Redirecionamento ao clicar no card
      card.addEventListener("click", () => {
        window.location.href = `playlist.html?id=${playlist.id_playlist}`;
      });

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar playlists:", error);
  }
}

function gerarEstrelas(nota) {
  let estrelas = '';
  for (let i = 1; i <= 5; i++) {
    estrelas += `<i class="bi ${i <= nota ? 'bi-star-fill' : 'bi-star'}"></i>`;
  }
  return estrelas;
}

document.addEventListener("DOMContentLoaded", carregarTodasPlaylists);
