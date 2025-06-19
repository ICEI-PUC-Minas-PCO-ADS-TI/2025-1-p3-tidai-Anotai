document.getElementById('btn-enviar').addEventListener('click', async () => {
  const formData = new FormData();
  formData.append('primeiroNome', document.querySelector('[name="primeiro-nome"]').value);
  formData.append('segundoNome', document.querySelector('[name="segundo-nome"]').value);
  formData.append('nome_perfil', document.querySelector('[name="nome_perfil"]').value);
  formData.append('descricao', document.querySelector('[name="descricao"]').value);
  formData.append('sobreMim', document.querySelector('[name="sobre-mim"]').value);
  formData.append('instagram', document.querySelector('[name="instagram"]').value);
  formData.append('linkedin', document.querySelector('[name="linkedin"]').value);
  formData.append('github', document.querySelector('[name="github"]').value);
  formData.append('imagemPerfil', document.getElementById('upload-perfil').files[0]);
  formData.append('wallpaper', document.getElementById('upload-wallpaper').files[0]);

  const token = localStorage.getItem('token');

  try {
    const resposta = await fetch('http://localhost:3000/perfil', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const resultado = await resposta.json();
    alert(resultado.mensagem);

    if (resposta.ok) {
      window.location.href = '../home.html?atualizado=true';
    }
  } catch (erro) {
    alert('Erro ao enviar dados do perfil.');
  }
});

// Troca de imagem de perfil
const uploadPerfil = document.getElementById("upload-perfil");
const imgPerfilPreview = document.getElementById("img-perfil-preview");
if (uploadPerfil) {
  uploadPerfil.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgPerfilPreview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 100%;">`;
      };
      reader.readAsDataURL(file);
    }
  });
}

// Troca de papel de parede
const uploadWallpaper = document.getElementById("upload-wallpaper");
const wallpaperPreview = document.getElementById("wallpaper-preview");
if (uploadWallpaper) {
  uploadWallpaper.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        wallpaperPreview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
      };
      reader.readAsDataURL(file);
    }
  });
}
