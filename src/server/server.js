import 'colors';
import Filter from 'bad-words';

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
    ranking.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();
    storage.saveHighScores(ranking);

    activePlayers.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();
    wsApp.broadCastToClients({ ranking, activePlayers });
};

wsApp.onEvent('addNewPlayer', (data, ws) => {
    let player = new Player(filter.clean(data.player.nickName), data.player.fullName, data.player.email);
    storage.savePlayer(player);
    activePlayers.push({ player, ws});
    console.log('ranking', ranking, typeof ranking)
    ranking.push(player);
    updateRanking();
});

wsApp.onEvent('updatePlayerScore', (data, ws) => {
    let player = activePlayers.filter(element => element.player.nickName === data.player.nickName)[0].player;
    player.score = data.player.score;
    updateRanking();
});

wsApp.onEvent('refresh', (data, ws) => {
    updateRanking();
});

wsApp.onEvent('startGame', (data, ws) => {
    wsApp.broadCastToClients({ eventName: 'startGame' });
});

wsApp.onEvent('resetGame', (data, ws) => {
    activePlayers = [];
    wsApp.broadCastToClients({ eventName: 'resetGame' });
    updateRanking();
});
