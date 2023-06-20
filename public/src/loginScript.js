fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ username: 'usuariodemo', password: 'senhademo' }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        // Exibir mensagem de erro em um popup
        alert(data.error);
      } else {
        // Autenticação bem-sucedida
        alert(data.message);
        // Continuar com outras ações necessárias
      }
    })
    .catch(error => {
      console.error('Erro:', error);
    });

    
    module.exports()