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
    alertMessagesText.innerHTML = "Todas as mensagens foram deletadas com sucesso!";
    localStorage.removeItem('contactMessages');
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
    alertMessagesText.innerHTML = "Mensagem deletada com sucesso!";
    $('#modal-alert').modal('show');
    displayMessages();

}

// Função para exibir as mensagens
function displayMessages() {
    var messages = getMessages();
    var clearMessages = document.getElementById('clear-messages-button');
    var messageList = document.getElementById('message-list');
    messageList.innerHTML = '';

    if (messages.length === 0) {
        clearMessages.style.display = "none";
        var noMessagesItem = document.createElement('li');
        var noMessagesImg = document.createElement('li');
        noMessagesItem.innerText = 'Nenhuma mensagem recebida.';
        noMessagesImg.innerHTML = '<i class="fas fa-comment-slash"></i>';
        noMessagesItem.classList.add("lead");
        noMessagesImg.style.fontSize = "50px";
        messageList.appendChild(noMessagesImg);
        messageList.appendChild(noMessagesItem);
        messageList.style.textAlign = "center";
        messageList.style.color = "skyblue";

    } else {
        clearMessages.style.display = "block";
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
    clearMessages();
});

// Exibir as mensagens ao carregar a página
displayMessages();