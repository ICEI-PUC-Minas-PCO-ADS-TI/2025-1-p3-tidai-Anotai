document.addEventListener('DOMContentLoaded', async () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    console.error('ID da meta não encontrado na URL');
    return;
  }
  try {
    const res = await fetch(`/metas/${id}`);
    const meta = await res.json();

    document.getElementById('nome').textContent = meta.nome_meta;
    document.querySelector('#img-playlist img').src = `/uploads/${meta.url_imagem_meta}`;
    document.querySelector('#perfil p').textContent = `@${meta.nome_usuario ?? 'Usuário'}`;
    document.querySelector('#perfil .img-perfil img').src = `/uploads/${meta.url_image_perfil}`;
    document.getElementById('publicacao').textContent = `Prioridade: ${meta.prioridade_meta}`;
    document.querySelector('#container-meio p').textContent = meta.descricao_meta;

    // Se houver arquivos, você pode renderizá-los aqui também
  } catch (err) {
    console.error('Erro ao carregar meta:', err);
  }
});
