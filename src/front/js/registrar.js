document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value;
  const senha = document.querySelector('input[name="senha"]').value;
  const confirmarSenha = document.querySelector('input[name="confirmar-senha"]').value;

  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    const resposta = await fetch('http://localhost:3000/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Usuário registrado com sucesso!');
      window.location.href = 'Entrar.html';
    } else {
      alert(dados.mensagem || 'Erro ao registrar');
    }
  } catch (erro) {
    alert('Erro ao conectar com o servidor.');
  }
});