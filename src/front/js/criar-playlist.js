document.addEventListener('DOMContentLoaded', () => {
  // Preencher campos com dados salvos
  const dados = JSON.parse(localStorage.getItem('playlist_data'));
  if (dados) {
    document.querySelector('[name="nome-playlist"]').value = dados.nome;
    document.querySelector('[name="descricao"]').value = dados.descricao;

    const selecionar = (id, valor) => {
      const container = document.getElementById(id);
      const tags = container.querySelectorAll('.cat-tag');
      tags.forEach(tag => {
        if (tag.textContent.trim().toLowerCase() === valor.toLowerCase()) {
          tag.classList.add('selecionado');
        }
      });
    };

    selecionar('categoria-lista', dados.categoria);
    selecionar('tags-lista', dados.tag);
    selecionar('prioridade-lista', dados.prioridade);
  }

  ativarSelecao('categoria-lista');
  ativarSelecao('tags-lista');
  ativarSelecao('prioridade-lista');
  ativarSelecaoModalPrioridade('prioridade-meta-lista');
  renderizarMetas();

  // Mostrar imagem da playlist ao selecionar
  const inputImagem = document.getElementById('upload-foto');
  const imgPreview = document.querySelector('#img-perfil img');
  inputImagem.addEventListener('change', () => {
    const file = inputImagem.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
});

function ativarSelecao(containerId) {
  const container = document.getElementById(containerId);
  const itens = container.querySelectorAll('.cat-tag');
  itens.forEach(item => {
    item.addEventListener('click', () => {
      itens.forEach(el => el.classList.remove('selecionado'));
      item.classList.add('selecionado');
    });
  });
}

document.querySelector('.submit.publicar').addEventListener('click', () => {
  enviarPlaylist();
});

async function enviarPlaylist() {
  const formData = new FormData();
  formData.append('nome_playlist', document.querySelector('[name="nome-playlist"]').value);
  formData.append('descricao_playlist', document.querySelector('[name="descricao"]').value);
  formData.append('categoria_playlist', document.querySelector('#categoria-lista .cat-tag.selecionado')?.textContent.trim() || '');
  formData.append('tag_playlist', document.querySelector('#tags-lista .cat-tag.selecionado')?.textContent.trim() || '');
  formData.append('prioridade', document.querySelector('#prioridade-lista .cat-tag.selecionado')?.textContent.trim().toLowerCase() || '');
  formData.append('data_conclusao', new Date().toISOString().slice(0, 10).replace(/-/g, ''));
  formData.append('imagem', document.getElementById('upload-foto').files[0]);

  const token = localStorage.getItem('token');

  try {
    const res = await fetch('http://localhost:3000/playlists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
    const data = await res.json();
    alert(data.mensagem || 'Playlist criada com sucesso!');

    const id_playlist = data.id_playlist;
    const metas = JSON.parse(localStorage.getItem('metas_temp')) || [];

    for (const meta of metas) {
      const formDataMeta = new FormData();
      formDataMeta.append('id_playlist', id_playlist);
      formDataMeta.append('nome_meta', meta.nome);
      formDataMeta.append('descricao_meta', meta.descricao);
      formDataMeta.append('prioridade_meta', meta.prioridade);

      if (meta.imagemBase64) {
        const byteString = atob(meta.imagemBase64.split(',')[1]);
        const mimeString = meta.imagemBase64.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        formDataMeta.append('imagem_meta', blob, 'imagem_meta.png');
      }

      if (meta.arquivosBase64 && meta.arquivosBase64.length > 0) {
        meta.arquivosBase64.forEach((arquivo, index) => {
          const byteString = atob(arquivo.base64.split(',')[1]);
          const mimeString = arquivo.base64.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          formDataMeta.append('arquivos', blob, arquivo.nome);
        });
      }

      await fetch('/metas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataMeta
      });
    }

    localStorage.removeItem('metas_temp');
    window.location.href = 'home.html';

  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor.');
  }
}

// Modal de metas
const modal = document.getElementById('modal-meta');

// Abrir e fechar modal
document.getElementById('abrir-modal-meta').onclick = () => modal.style.display = 'block';
document.querySelector('.fechar-modal').onclick = () => modal.style.display = 'none';
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = 'none';
};

// Variável para armazenar a prioridade selecionada da meta
let prioridadeSelecionada = '';

// Ativar seleção de prioridade dentro do modal
function ativarSelecaoModalPrioridade(containerId) {
  const container = document.getElementById(containerId);
  const itens = container.querySelectorAll('.cat-tag');
  itens.forEach(item => {
    item.addEventListener('click', () => {
      itens.forEach(el => el.classList.remove('selecionado'));
      item.classList.add('selecionado');
      prioridadeSelecionada = item.textContent.trim().toLowerCase();
    });
  });
}

// Chamar a função após o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  ativarSelecaoModalPrioridade('prioridade-meta-lista');
});

// Salvar meta
document.getElementById('salvar-meta').addEventListener('click', () => {
  const nome = document.getElementById('nome-meta').value;
  const descricao = document.getElementById('descricao-meta').value;
  const imagem = document.getElementById('imagem-meta').files[0];
  const arquivos = document.getElementById('arquivos-meta').files;

  if (!nome || !descricao || !prioridadeSelecionada) {
    alert('Preencha todos os campos da meta.');
    return;
  }

  // Verificar tamanho da imagem (limite: 2MB)
  if (imagem && imagem.size > 2 * 1024 * 1024) {
    alert('A imagem da meta é muito grande. O tamanho máximo permitido é 2MB.');
    return;
  }

  // Verificar tamanho de cada arquivo (limite: 2MB por arquivo)
  for (let i = 0; i < arquivos.length; i++) {
    if (arquivos[i].size > 2 * 1024 * 1024) {
      alert(`O arquivo "${arquivos[i].name}" é muito grande. O tamanho máximo permitido é 2MB.`);
      return;
    }
  }

  const meta = {
    nome,
    descricao,
    prioridade: prioridadeSelecionada,
    imagemBase64: '',
    arquivosBase64: []
  };

  const readerImagem = new FileReader();
  readerImagem.onload = function (e) {
    meta.imagemBase64 = e.target.result;

    const arquivosPromises = Array.from(arquivos).map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function (e) {
          resolve({ nome: file.name, base64: e.target.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(arquivosPromises).then(results => {
      meta.arquivosBase64 = results;
      const metas = JSON.parse(localStorage.getItem('metas_temp')) || [];
      metas.push(meta);
      localStorage.setItem('metas_temp', JSON.stringify(metas));
      renderizarMetas();
      modal.style.display = 'none';
    });
  };

  if (imagem) {
    readerImagem.readAsDataURL(imagem);
  } else {
    readerImagem.onload({ target: { result: '' } });
  }
});

// Função para verificar se há metas e mostrar/ocultar a mensagem
function checkMetas() {
  const metas = JSON.parse(localStorage.getItem('metas_temp')) || [];
  const noMetasMessage = document.getElementById('no-metas-message');
  if (metas.length === 0) {
    noMetasMessage.style.display = 'block';
  } else {
    noMetasMessage.style.display = 'none';
  }
}

// Botão adicional para criar metas
document.getElementById('create-meta-button').addEventListener('click', () => {
  document.getElementById('modal-meta').style.display = 'block';
});

// Atualizar a função renderizarMetas para chamar checkMetas
function renderizarMetas() {
  const container = document.getElementById('container-metas');
  container.innerHTML = '';
  const metas = JSON.parse(localStorage.getItem('metas_temp')) || [];

  metas.forEach((meta, index) => {
    const div = document.createElement('div');
    div.className = 'meta-item';
    div.innerHTML = `
      <div class="meta-num">${index + 1}</div>
      <div class="meta-img">
        <img src="${meta.imagemBase64 || '#'}" alt="Imagem da Meta">
      </div>
      <div class="meta-info">
        <h4>${meta.nome}</h4>
        <p>${meta.descricao}</p>
      </div>
      <div class="meta-delete" title="Excluir meta">
        <i class="bi bi-trash-fill"></i>
      </div>
    `;
    div.querySelector('.meta-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      metas.splice(index, 1);
      localStorage.setItem('metas_temp', JSON.stringify(metas));
      renderizarMetas();
    });
    div.addEventListener('click', () => {
      document.getElementById('nome-meta').value = meta.nome;
      document.getElementById('descricao-meta').value = meta.descricao;
      const prioridadeTags = document.querySelectorAll('#prioridade-meta-lista .cat-tag');
      prioridadeTags.forEach(tag => {
        tag.classList.remove('selecionado');
        if (tag.textContent.trim().toLowerCase() === meta.prioridade) {
          tag.classList.add('selecionado');
          prioridadeSelecionada = meta.prioridade;
        }
      });
      metas.splice(index, 1);
      localStorage.setItem('metas_temp', JSON.stringify(metas));
      renderizarMetas();
      modal.style.display = 'block';
    });
    container.appendChild(div);
  });

  checkMetas(); // <-- chamada adicionada aqui
}

// Chamada inicial
document.addEventListener('DOMContentLoaded', () => {
  checkMetas();
});
