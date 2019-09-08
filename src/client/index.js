import css from './score.css';
console.log('hey');

var activePlayersList = document.querySelector('#activePlayersList');
var currentData = document.querySelector('#currentData');
var statusSocket = document.querySelector('#statusSocket');

const wsUrl = `ws://${window.location.hostname}:8081/`;
const connection = new WebSocket(wsUrl);

let ranking;
let activePlayers;
let highscore;

connection.onopen = () => {
    console.log('open');
    connection.send('{"eventName": "refresh"}');
};

connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
};

connection.onmessage = e => {
    let data = JSON.parse(e.data);
    console.log(data);
    if (data && data.ranking && data.activePlayers) {
        ranking = data.ranking;
        activePlayers = data.activePlayers;
        if (!highscore) {
            highscore = parseInt(ranking[0].score);
        }

        currentData.innerHTML = '';
        activePlayersList.innerHTML = '';

        ranking.slice(0, 10).forEach((element, index) => {
            currentData.innerHTML = currentData.innerHTML +
                `<li><div class="ranking"><p>${index + 1}</p></div><span class="container"><p class="playername"> ${element.nickName}</p><p class="dots">...............................................................................................................</p><p class="playerscore"> ${element.score} </p></span></li>`;
        });

        let isNewHighscore = parseInt(ranking[0].score) > highscore;
        let element = document.getElementById("alert");

        if (isNewHighscore) {
            element.classList.add("doshow");
            setTimeout(function () {
                element.classList.remove("doshow");
            }, 5000);
            highscore = parseInt(ranking[0].score);
        }

        activePlayers.forEach((element, index) => {
            activePlayersList.innerHTML = activePlayersList.innerHTML +
                `<li><div class="ranking"><p>${index + 1}</p></div><span class="container"><p class="playername">${element.player.nickName}</p><p class="dots">...............................................................................................................</p><p class="playerscore"> ${element.player.score}</p></span></li>`;
        });
    }
};