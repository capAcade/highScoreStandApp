var svModule = document.querySelectorAll('[sv-module]');
var svClick = document.querySelectorAll('[sv-click]');

var activePlayersList = document.querySelector('#activePlayersList');
var currentData = document.querySelector('#currentData');

var statusSocket = document.querySelector('#statusSocket');

const url = 'ws://localhost:8081/'
const connection = new WebSocket(url)

var ranking;
var activePlayers;
var dataModel = {};
var clickHandlers = {}

connection.onopen = () => {
    console.log('open');
    connection.send('{"eventName": "refresh"}');
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

    currentData.innerHTML = '';
    activePlayersList.innerHTML = '';
    playerSelect.innerHTML = '';

    ranking.forEach((element, index) => {
        currentData.innerHTML = currentData.innerHTML +
            `<li>nickname: ${element.nickName} score: ${element.score} email: ${element.email}</li>`
        playerSelect.innerHTML = playerSelect.innerHTML +
            `<option ${index === 0 ? 'selected ' : '' }value="${element.nickName}">${element.nickName}</option>`;
    });

    activePlayers.forEach(element => {
        activePlayersList.innerHTML = activePlayersList.innerHTML +
            `<li>nickname: ${element.player.nickName} score: ${element.player.score} email: ${element.player.email}</li>`
    });
}

clickHandlers.startGame = function (e) {
    connection.send('{"eventName": "startGame"}');
}

clickHandlers.resetGame = function (e) {
    connection.send('{"eventName": "resetGame"}');
}

clickHandlers.updateScore = function (e) {
    connection.send(
        `{"eventName": "updatePlayerScore", "player": {"nickName": "${dataModel.selectNickname}", "score":${dataModel.score} }}`
        );
}

clickHandlers.addPokeMaster = function (e) {
    connection.send(
        '{"eventName": "addNewPlayer", "player": {"nickName": "pokeMaster","fullName": "ash ketchum", "email": "ash.ketchum@gmail.com"}}'
        );
}

clickHandlers.addMashdamman = function (e) {
    connection.send(
        '{"eventName": "addNewPlayer", "player": {"nickName": "mashdamman","fullName": "molly malone", "email": "molly.malone@gmail.com"}}'
        );
}
clickHandlers.addBugganator = function (e) {
    connection.send(
        '{"eventName": "addNewPlayer", "player": {"nickName": "bugganator","fullName": "natalia zwamata", "email": "natalia.zwamata@gmail.com"}}'
        );
}

clickHandlers.addSamuraiJack = function (e) {
    connection.send(
        '{"eventName": "addNewPlayer", "player": {"nickName": "samurai jack","fullName": "hosi san", "email": "hosi.san@gmail.com"}}'
        );
}

clickHandlers.submitNewPlayer = function (e) {
    connection.send(
        `{"eventName": "addNewPlayer", "player": {"nickName": "${dataModel.nickName}","fullName": "${dataModel.fullName}", "email": "${dataModel.email}"}}`
        );
}

var inputHandler = function (e) {
    dataModel[e.target.getAttribute('sv-module')] = e.target.value;
}

var clickHandler = function (e) {
    e.preventDefault();
    clickHandlers[e.target.getAttribute('sv-click')]();
}

svModule.forEach(function (element) {
    element.oninput = inputHandler
})

svClick.forEach(function (element) {
    element.addEventListener("click", clickHandlers[element.getAttribute('sv-click')])
})