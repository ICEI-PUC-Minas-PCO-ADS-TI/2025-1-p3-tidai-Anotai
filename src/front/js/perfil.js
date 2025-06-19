// --- Carregar dados do perfil ---
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado.');
    window.location.href = 'login.html';
    return;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const idPerfil = payload.id;

  const urlParams = new URLSearchParams(window.location.search);
  const atualizado = urlParams.get('atualizado');

  fetch(`/perfil/${idPerfil}?t=${Date.now()}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao buscar perfil");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("nome").textContent = `${data.nome} ${data.sobrenome}`;
      document.getElementById("nome-perfil").textContent = `@${data.nome_perfil}`;
      document.getElementById("descricao").textContent = data.descricao;
      document.querySelector("#sobre-mim p").textContent = data.sobre_mim;

      const imgPerfil = document.querySelector("#img-perfil img");
      imgPerfil.src = data.url_image_perfil ? `/uploads/${data.url_image_perfil}` : "#";

      const wallpaperImg = document.querySelector("#papel-parede img");
      wallpaperImg.src = data.url_wallpaper ? `/uploads/${data.url_wallpaper}` : "#";

      const redes = document.querySelectorAll("#redes-sociais .redes");
      redes[0].querySelector("p").textContent = data.url_instagram || "";
      redes[1].querySelector("p").textContent = data.url_github || "";
      redes[2].querySelector("p").textContent = data.url_linkedin || "";
    })
    .catch(error => {
      console.error("Erro ao carregar perfil:", error);
    });

  // --- Redirecionar para editar perfil ---
  const btnEditar = document.getElementById("btn-editar-perfil");
  if (btnEditar) {
    btnEditar.addEventListener("click", () => {
      window.location.href = "criar-perfil.html?editar=true";
    });
  }
});

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

// --- Troca de papel de parede (visualização local) ---
const uploadWallpaper = document.getElementById("upload-wallpaper");
if (uploadWallpaper) {
  uploadWallpaper.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.querySelector("#papel-parede img");
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

function carregarPlaylistsPublicadas() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const payload = JSON.parse(atob(token.split('.')[1]));
  const idPerfil = payload.id;

  fetch(`/perfil/perfil/${idPerfil}/playlists`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Erro ao buscar playlists');
      }
      return res.json();
    })
    .then(playlists => {
      const container = document.getElementById('playlists');
      container.innerHTML = '';
      playlists.forEach(playlist => {
        const div = document.createElement('div');
        div.className = 'playlists-metas';
        div.innerHTML = `
        <div class="img-metas">
          <img src="${playlist.url_imagem_playlist ? `/uploads/${playlist.url_imagem_playlist}` : '#'}" alt>
        </div>
        <div class="detalhes-metas">
          <div class="txt-metas">
            <h4>${playlist.nome_playlist}</h4>
            <hr>
            <p>${playlist.descricao_playlist}</p>
          </div>
          <div class="perfil-metas">
            <div class="perfil">
              <img src="${playlist.url_image_perfil ? `/uploads/${playlist.url_image_perfil}` : '#'}" alt>
              <p id="nome-perfil">@${playlist.nome_perfil}</p>
            </div>
            <div class="estrelas">
              ${gerarEstrelas(playlist.avaliacao || 0)}
            </div>
          </div>
        </div>
      `;

        // 🔗 Redirecionar ao clicar na playlist
        div.addEventListener('click', () => {
          window.location.href = `playlist.html?id=${playlist.id_playlist}`;
        });

        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar playlists publicadas:', err);
    });
}

function gerarEstrelas(nota) {
  let estrelas = '';
  for (let i = 1; i <= 5; i++) {
    estrelas += `<i class="bi ${i <= nota ? 'bi-star-fill' : 'bi-star'}"></i>`;
  }
  return estrelas;
}

document.addEventListener('DOMContentLoaded', carregarPlaylistsPublicadas);