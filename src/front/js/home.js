const container = document.querySelector('.destaques');

const totalCards = container.querySelectorAll('.play-destaque').length;
const cardsPerPage = 3;
const cardWidth = 420;
const gap = 20;
const scrollAmount = (cardWidth + gap) * cardsPerPage;
const totalPages = Math.ceil(totalCards / cardsPerPage);

let currentPage = 0;

function goToPage(page) {
    const clampedPage = Math.max(0, Math.min(page, totalPages - 1));
    currentPage = clampedPage;
    container.scrollTo({ left: scrollAmount * clampedPage, behavior: 'smooth' });
}

// Auto-scroll
setInterval(() => {
    const nextPage = (currentPage + 1) % totalPages;
    goToPage(nextPage);
}, 3000);

//range input

const range = document.getElementById('meuRange');
    const rangeValue = document.getElementById('rangeValue');
    const valoresPossiveis = [1,2,3,4,5,6,7,8,9,10];

    function updateRange() {
      const min = Number(range.min);
      const max = Number(range.max);
      const val = Number(range.value);

      // Calcula a posição real da bolinha
      const percent = (val - min) / (max - min);

      // Pega a largura real do range
      const rangeWidth = range.offsetWidth;
      const thumbWidth = 20; // Aproximadamente o tamanho da bolinha no navegador padrão
      const offset = percent * (rangeWidth - thumbWidth) + (thumbWidth / 2);

      // Atualiza o texto e a posição
      rangeValue.textContent = valoresPossiveis[val];
      rangeValue.style.left = `${offset}px`;
    }

    // Inicializa
    updateRange();

    // Atualiza enquanto desliza
    range.addEventListener('input', updateRange);
    window.addEventListener('resize', updateRange); // Também atualiza se a tela mudar