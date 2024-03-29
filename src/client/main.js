var svModule = document.querySelectorAll('[sv-module]');
var svClick = document.querySelectorAll('[sv-click]');

var activePlayersList = document.querySelector('#activePlayersList');
var currentData = document.querySelector('#currentData');

var statusSocket = document.querySelector('#statusSocket');

const url = 'ws://localhost:8081/';
const connection = new WebSocket(url);
console.log(connection)
var ranking;
var activePlayers;
var dataModel = {};
var clickHandlers = {};
var paused = false;

var audio = new Audio('/assets/Superhero_violin.ogg');


connection.onopen = () => {
    console.log('open');
    connection.send('{"eventName": "refresh"}');
    statusSocket.innerHTML = 'open';
};

connection.onerror = error => {
    statusSocket.innerHTML = 'error';
    console.log(`WebSocket error: ${error}`)
};

connection.onclose = function(event) {
  statusSocket.innerHTML = 'CLOSED!!!';
  document.querySelector('body').style['background-color'] ='red';
  console.log(`WebSocket CLOSED: ${event}`)
};

connection.onmessage = e => {
    let data = JSON.parse(e.data);
    if (data && data.ranking && data.activePlayers && !paused) {
      window.document.querySelector('#status').innerHTML ='false';
        ranking = data.ranking;
        activePlayers = data.activePlayers;

        currentData.innerHTML = '';
        activePlayersList.innerHTML = '';
        playerSelect.innerHTML = '<option disabled selected value> -- select an option -- </option>';

        ranking.forEach((element) => {
            currentData.innerHTML = currentData.innerHTML +
                `<li onclick="selectNickName('${element.nickName}')">nickName: ${element.nickName} score: ${element.score} email: ${element.email}</li>`
        });

        activePlayers.forEach((element) => {
          console.log(element)
            activePlayersList.innerHTML = activePlayersList.innerHTML +
                `<li onclick="selectNickName('${element.nickName}')">nickName: ${element.nickName} score: ${element.score} email: ${element.email}</li>`
            playerSelect.innerHTML = playerSelect.innerHTML +
                `<option value="${element.nickName}">${element.nickName}</option>`;
        });
    }
    else {
      window.document.querySelector('#status').innerHTML='true';
    }
};

clickHandlers.togglePause = function (e) {
  paused = !paused;
};

clickHandlers.startGame = function (e) {
    connection.send('{"eventName": "startGame"}');
    setTimeout(function(){
        audio.play();
    }, 3000)
};

clickHandlers.resetGame = function (e) {
    connection.send('{"eventName": "resetGame"}');
};

clickHandlers.updateScore = function (e) {
    if (dataModel.selectNickName && dataModel.score) {
        connection.send(`{"eventName": "updatePlayerScore", "player": {"nickName": "${dataModel.selectNickName}", "score":${dataModel.score} }}`);
    }
};

clickHandlers.updateNickname = function (e) {
    if (dataModel.selectNickName && dataModel.nickName) {
        connection.send(`{"eventName": "updateNickName", "player": {"oldNickName": "${dataModel.selectNickName}", "newNickName": "${dataModel.nickName}" }}`);
    }
};

clickHandlers.addPokeMaster = function (e) {
    connection.send('{"eventName": "addNewPlayer", "player": {"nickName": "pokeMaster","fullName": "ash ketchum", "email": "ash.ketchum@gmail.com"}}');
};

clickHandlers.addMashdamman = function (e) {
    connection.send('{"eventName": "addNewPlayer", "player": {"nickName": "mashdamman","fullName": "molly malone", "email": "molly.malone@gmail.com"}}');
};

clickHandlers.addBugganator = function (e) {
    connection.send('{"eventName": "addNewPlayer", "player": {"nickName": "bugganator","fullName": "natalia zwamata", "email": "natalia.zwamata@gmail.com"}}');
};

clickHandlers.addSamuraiJack = function (e) {
    connection.send('{"eventName": "addNewPlayer", "player": {"nickName": "samurai jack","fullName": "hosi san", "email": "hosi.san@gmail.com"}}');
};

clickHandlers.submitNewPlayer = function (e) {
    connection.send(`{"eventName": "addNewPlayer", "player": {"nickName": "${dataModel.nickName}","fullName": "${dataModel.fullName}", "email": "${dataModel.email}"}}`);
};

selectNickName = function (nickName) {
    playerSelect.value = nickName;
    dataModel.selectNickName = nickName;
};

var inputHandler = function (e) {
    dataModel[e.target.getAttribute('sv-module')] = e.target.value;
};

var clickHandler = function (e) {
    e.preventDefault();
    clickHandlers[e.target.getAttribute('sv-click')]();
};

svModule.forEach(function (element) {
    element.oninput = inputHandler
});

svClick.forEach(function (element) {
    element.addEventListener('click', clickHandlers[element.getAttribute('sv-click')])
});
