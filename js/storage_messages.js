//Armazenamento de Mensagens de Contatos

function updateMessages(messages) {
    var messageCount = document.getElementById('message-count');
    messageCount.innerText = messages.length;
    var currentCount = parseInt(messageCount.innerText);
    messageCount.classList.toggle('message-count--positive', currentCount > 0);
}

function getMessages() {
    var messages = localStorage.getItem('contactMessages');
    if (messages) {
        return JSON.parse(messages);
    } else {
        return [];
    }
}

function storeMessage(message) {
    var messages = getMessages();
    messages.push(message);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    updateMessages(messages);
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var formData = { name, email, message };

    storeMessage(formData);

    document.getElementById('contact-form').reset();
    $('#success-modal').modal('show');

});

// Exibir as mensagens ao carregar a página

var storedMessages = getMessages();
updateMessages(storedMessages);
