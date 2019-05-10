import css from './score.css';
console.log('hey')

var activePlayersList = document.querySelector('#activePlayersList');
var currentData = document.querySelector('#currentData');
var statusSocket = document.querySelector('#statusSocket');

const url = 'ws://localhost:8081/'
const connection = new WebSocket(url)

var ranking;
var activePlayers;


connection.onopen = () => {
    console.log('open');
    connection.send('{"eventName": "refresh"}');
}

connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
}

connection.onmessage = e => {
    let data = JSON.parse(e.data);
    console.log(data);
    if (data && data.ranking && data.activePlayers) {
        ranking = data.ranking;
        activePlayers = data.activePlayers;

        currentData.innerHTML = '';
        activePlayersList.innerHTML = '';

        ranking.forEach((element, index) => {
            currentData.innerHTML = currentData.innerHTML +
                ` <li><p class="playername"> ${element.nickName} </p><p class="playerscore"> ${element.score} </p></li>`
        });

        activePlayers.forEach(element => {
            activePlayersList.innerHTML = activePlayersList.innerHTML +
                `<li><p class="playername">${element.player.nickName}</p><p class="playerscore"> ${element.player.score}</p></li>`
        });
    }
}