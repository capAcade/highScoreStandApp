import css from './score.css';
console.log('hey')

var activePlayersList = document.querySelector('#activePlayersList');
var currentData = document.querySelector('#currentData');
var statusSocket = document.querySelector('#statusSocket');

const url = 'ws://localhost:8081/'
const connection = new WebSocket(url)

let ranking;
let activePlayers;



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

        ranking.slice(0, 10).forEach((element, index) => {

            currentData.innerHTML = currentData.innerHTML +
                ` <li><div class="ranking"><p>${index + 1}</p></div><span class="container"><p class="playername"> ${element.nickName}</p><p class="dots">...............................................................................................................</p><p class="playerscore"> ${element.score} </p></span></li>`

        });
        
        let nickname = ranking[0].nickName;
        var score = parseInt(ranking[0].score);
        var highscore = localStorage.getItem("highscore");
        
        if (score > highscore) {
            alert('new winner' + nickname + score + highscore);
            localStorage.setItem("highscore", score);
        } else {
            console.log('no changes');

        }

        activePlayers.forEach((element, index) => {
            activePlayersList.innerHTML = activePlayersList.innerHTML +
                `<li><div class="ranking"><p>${index + 1}</p></div><p class="playername">${element.player.nickName}</p><p class="dots">...............................................................................................................</p><p class="playerscore"> ${element.player.score}</p></li>`
        });
    }
};