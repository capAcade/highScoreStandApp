
var resetGameButton = document.querySelector('#resetGame');
var startGameButton = document.querySelector('#startGame');
var sendEvent = document.querySelector('#sendEvent');

var activePlayersList = document.querySelector('#activePlayersList');
var currentData = document.querySelector('#currentData');
var eventObject = document.querySelector('#eventObject');
var statusSocket = document.querySelector('#statusSocket');

const url = 'ws://localhost:8081/'
const connection = new WebSocket(url)

var ranking;
var activePlayers;

connection.onopen = () => {
  console.log('open');
  statusSocket.innerHTML = 'open';
}

connection.onerror = error => {
  statusSocket.innerHTML = 'error';
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = e => {
    let data = JSON.parse(e.data);
    console.log(data);
    ranking = data.ranking;
    activePlayers = data.activePlayers;

    currentData.innerHTML ='';
    activePlayersList.innerHTML = '';

    ranking.forEach(element => {
        currentData.innerHTML = currentData.innerHTML + `<li>nickname: ${element.nickName} score: ${element.score} email: ${element.email}</li>` 
    });

    activePlayers.forEach(element => {
        activePlayersList.innerHTML = activePlayersList.innerHTML + `<li>nickname: ${element.player.nickName} score: ${element.player.score} email: ${element.player.email}</li>`
    });
}

sendEvent.addEventListener("click", function(e){
    e.preventDefault();
    connection.send(eventObject.value);
});

startGameButton.addEventListener("click", function(e){
    e.preventDefault();
    connection.send('{"eventName": "startGame"}');
});

resetGameButton.addEventListener("click", function(e){
    e.preventDefault();
    connection.send('{"eventName": "resetGame"}');
});
