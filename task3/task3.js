const wsUri = "ws://echo-ws-service.herokuapp.com";

const btnSend = document.querySelector('.btn-send'); // для отправления сообщения
const btnLocation = document.querySelector('.btn-geo'); // для отправления гео-локации
const chatNode = document.querySelector('.chat-container'); // для вставки сообщения

// WebSocket connection
let websocket;

websocket = new WebSocket(wsUri);
websocket.onopen = function(evt) {
    console.log("CONNECTED");
};
websocket.onerror = function(evt) {
    console.log("error" + evt.data);
};
websocket.binaryType = 'arraybuffer';
websocket.onmessage = function(evt) {
    //console.log(evt.data);
    // Я искал, как можно еще запретить сообщения в ответ на запрос гео-локации, но додумался только до этого
    if (!(evt.data.includes('class="geo"'))) chatNode.innerHTML += `<span class="server-sent-message">${evt.data}</span>`; // Сообщение от сервера
};

// Обработчик кнопки "Отправить"
btnSend.addEventListener('click', () => {

    const userMessage = document.getElementById('userMessage').value;

    writeUserMessage(userMessage);

});

// Отправление сообщения
function writeUserMessage(message) {
    let messageText = '';
    messageText += `<span class="user-sent-message">${message}</span>`;
    chatNode.innerHTML += messageText;
    websocket.send(message); // Отправляет сообщение на сервер
}

// Обработчик кнопки "Гео-локация"
btnLocation.addEventListener('click', () => {

    navigator.geolocation.getCurrentPosition(getUserLocation, error);

});

const error = () => {
    alert('Невозможно получить ваше местоположение');
}

// Отправление гео-локации
const getUserLocation = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    let userLocation = '';

    userLocation += `<a class="geo" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}"
        target="_blank">Гео-локация</a>`;
    
    chatNode.innerHTML += userLocation;
    websocket.send(userLocation);
}