document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const senha = document.querySelector('input[name="senha"]').value;

  try {
    const resposta = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      localStorage.setItem('token', dados.token);

      // Decodifica o token para obter o ID do usuário
      const payload = JSON.parse(atob(dados.token.split('.')[1]));
      const idUsuario = payload.id;

      // Verifica se o perfil já existe
      const perfilResp = await fetch(`http://localhost:3000/perfil/${idUsuario}`, {
        headers: {
          'Authorization': `Bearer ${dados.token}`
        }
      });

      if (perfilResp.ok) {
        // Perfil existe → redireciona para a home
        window.location.href = 'home.html';
      } else {
        // Perfil não existe → redireciona para criar perfil
        window.location.href = 'criar-perfil.html';
      }
    } else {
      alert(dados.mensagem || 'Erro ao fazer login.');
    }
  } catch (erro) {
    alert('Erro ao conectar com o servidor.');
  }
});