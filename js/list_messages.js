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
    var alertMessagesTitle = document.getElementById('modal-title');
    var alertMessagesText = document.getElementById('modal-text');
    alertMessagesTitle.innerHTML = "Mensagens Deletadas";
    alertMessagesText.innerHTML = "Todas as mensagens foram deletadas com sucesso!"
    localStorage.removeItem('contactMessages')
    $('#modal-alert').modal('show');
    displayMessages();

}

// Função para deletar uma mensagem
function deleteMessage(index) {
    var messages = getMessages();
    var alertMessagesTitle = document.getElementById('modal-title');
    var alertMessagesText = document.getElementById('modal-text');
    messages.splice(index, 1);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    alertMessagesTitle.innerHTML = "Mensagem Deletada";
    alertMessagesText.innerHTML = "Mensagem deletada com sucesso!"
    $('#modal-alert').modal('show');
    displayMessages();

}

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
              <i class="fas fa-trash delete-button" onclick="deleteMessage(${index})"></i>
            `;
            messageList.appendChild(messageItem);
        });
    }
}

//Evento de clicar no botão de limpar mensagens
document.getElementById('clear-messages').addEventListener('click', function () {
    var messages = getMessages();
    if (messages.length > 0) {
        clearMessages();
    } else {
        var alertMessagesHeader = document.getElementById('modal-header');
        var alertMessagesTitle = document.getElementById('modal-title');
        var alertMessagesText = document.getElementById('modal-text');
        alertMessagesHeader.style.backgroundColor = "#EEAD2D"
        alertMessagesTitle.innerHTML = "Nenhuma Mensagem";
        alertMessagesText.innerHTML = "Não há mensagem para deletar!"
        $('#modal-alert').modal('show');
    }
});

// Exibir as mensagens ao carregar a página
displayMessages();


//Tentativa de recarregar a página em todos os navegadores quando retornar pelo botão de voltar
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        location.reload();
    }
});
