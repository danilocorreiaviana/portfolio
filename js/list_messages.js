//Listar mensagens

// Função para obter as mensagens armazenadas
function getMessages() {
    var messages = localStorage.getItem('contactMessages');
    if (messages) {
        return JSON.parse(messages);
    } else {
        return [];
    }
}

// Função para limpar todas as mensagens
function clearMessages() {
    localStorage.removeItem('contactMessages');
    displayMessages();
}

document.getElementById('clear-messages').addEventListener('click', function () {
    clearMessages();
});

// Função para exibir as mensagens
function displayMessages() {
    var messages = getMessages();

    var messageList = document.getElementById('message-list');
    messageList.innerHTML = '';

    if (messages.length === 0) {
        var noMessagesItem = document.createElement('li');
        noMessagesItem.innerText = 'Nenhuma mensagem recebida.';
        noMessagesItem.style.textAlign = "center"
        noMessagesItem.classList.add("lead")
        messageList.appendChild(noMessagesItem);
    } else {
        messages.forEach(function (message, index) {
            var messageItem = document.createElement('li');
            messageItem.classList.add('message-item');
            messageItem.innerHTML = `
              <strong>Nome:</strong> ${message.name}<br>
              <strong>E-mail:</strong> ${message.email}<br>
              <strong>Mensagem:</strong> ${message.message}
            `;
            messageList.appendChild(messageItem);
        });
    }
}

// Exibir as mensagens ao carregar a página
displayMessages();