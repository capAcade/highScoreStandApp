import 'colors';
import Filter from 'bad-words';
import xss from 'xss';

import Xpress from './apiRoutes/xress';
import WebS from './wsRoutes/wsr';
import Player from './player';
import storage from './storage';

const filter = new Filter({ placeHolder: 'x' });
let activePlayers = [];
let ranking = storage.getHighScores();

console.log(',.-~*´¨¯¨`*·~-.¸-(Booting_up_the_awsomeness)-,.-~*´¨¯¨`*·~-.¸'.yellow);
console.log(`
    ******                    ****     ****                   
   **////**           ****** /**/**   **/**                   
  **    //   ******  /**///**/**//** ** /**  ******   ******* 
 /**        //////** /**  /**/** //***  /** //////** //**///**
 /**         ******* /****** /**  //*   /**  *******  /**  /**
 //**    ** **////** /**///  /**   /    /** **////**  /**  /**
  //****** //********/**     /**        /**//******** ***  /**
   //////   //////// //      //         //  //////// ///   // 
`.rainbow);

const config = {
    portWebApi: 8080,
    portSockets: 8081
};

//not used but needed to start frontend
const app = new Xpress(config);
const wsApp = new WebS(config);

const updateRanking = function () {

    //wsApp.broadCastToClients({ ranking, activePlayers });
};



const updateNickName = ((ws, oldNickName, newNickName) => {
    const nickNameChanged = oldNickName === newNickName;
    ws.send(`{ "eventName": "addNewPlayer", "nickname": "${newNickName}", "b": ${nickNameChanged}}`);
});

wsApp.onEvent('addNewPlayer', (data, ws) => {
    let nickName = xss(filter.clean(data.player.nickName));
    let exists = activePlayers.filter(element => element.player.nickName === nickName).length !== 0;
    while (exists) {
      nickName += activePlayers.length;
      exists = activePlayers.filter(element => element.player.nickName === nickName).length !== 0;
    }
    if (nickName !== data.player.nickName) {
      updateNickName(ws, data.player.nickName, nickName);
    }
    const player = new Player(nickName, xss(data.player.fullName), xss(data.player.email));
    storage.savePlayer(player);
    activePlayers.push({ player, ws});
    ranking.push(player);
    //updateRanking();
});

wsApp.onEvent('updateNickName', (data, ws) => {
    const players = activePlayers.filter(element => element.player.nickName === data.player.oldNickName);
    let ShouldUpdateRanking = false;
    if (players.length) {
        players[0].player.nickName = data.player.newNickName;
        updateNickName(players[0].ws, data.player.oldNickName, data.player.newNickName);
    } else {
        const player = ranking.filter(element => element.nickName === data.player.oldNickName)[0];
        player.nickName = data.player.newNickName;
    }
    //updateRanking();
});

wsApp.onEvent('updatePlayerScore', (data, ws) => {
    const players = activePlayers.filter(element => element.player.nickName === data.player.nickName);
    if (players.length) {
        players[0].player.score = data.player.score;
        //updateRanking();
    } else {
        console.log(`Player ${data.player.nickName} not found, something went wrong`.bgWhite.red);
    }
});

wsApp.onEvent('refresh', (data, ws) => {
    //updateRanking();
});

wsApp.onEvent('startGame', (data, ws) => {
    wsApp.broadCastToClients({ eventName: 'startGame' });
});

wsApp.onEvent('resetGame', (data, ws) => {
    wsApp.broadCastToClients({ eventName: 'resetGame' });
    activePlayers.forEach(({player, ws})=>{ws.close()});
    activePlayers = [];
    //updateRanking();
});

wsApp.onEvent('playerGameOver', (data, ws) =>{
    let player = activePlayers.filter(element => element.player.nickName === data.player.nickName)[0].player;
    player.status = 'GAMEOVER';
    ws.send(JSON.stringify(data));
    //updateRanking();
});

setInterval(function(){
    ranking.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();
    storage.saveHighScores(ranking);


    activePlayers.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();
    // basically remove the websocket from the object else parse.json go's nuts
    let datah = activePlayers.map(x => x.player )
    wsApp.broadCastToClients({ ranking, activePlayers: datah });
}, 1000);
