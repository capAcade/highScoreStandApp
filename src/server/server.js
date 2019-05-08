import Xpress from './apiRoutes/xress'
import WebS from './wsRoutes/wsr'
import Player from './player'
import Filter from 'bad-words'

const filter = new Filter({ placeHolder: 'x'});
let activePlayers = [];
let ranking = [];

console.log(' \x1b[33m ,.-~*´¨¯¨`*·~-.¸-(Booting_up_the_awsomeness)-,.-~*´¨¯¨`*·~-.¸ \x1b[0m')
console.log(` \x1b[34m
    ******                    ****     ****                   
   **////**           ****** /**/**   **/**                   
  **    //   ******  /**///**/**//** ** /**  ******   ******* 
 /**        //////** /**  /**/** //***  /** //////** //**///**
 /**         ******* /****** /**  //*   /**  *******  /**  /**
 //**    ** **////** /**///  /**   /    /** **////**  /**  /**
  //****** //********/**     /**        /**//******** ***  /**
   //////   //////// //      //         //  //////// ///   // 
   \x1b[0m`);


const config = {
    portWebApi: 8080,
    portSockets: 8081
}

//not used but needed to start frontend
const app = new Xpress(config); 
const wsApp = new WebS(config);

const updateRanking = function(){
    ranking.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();

    activePlayers.sort(function (a, b) {
        return a.score - b.score;
    }).reverse();
    wsApp.broadCastToClients({ranking: ranking, activePlayers: activePlayers});
};

wsApp.onEvent('addNewPlayer', (data, ws) =>{
    let plyr = new Player(filter.clean(data.player.nickName),data.player.fullName,data.player.email);
    activePlayers.push({
        player: plyr,
        ws: ws
    });
    ranking.push(plyr);
    updateRanking();
   
});

wsApp.onEvent('updatePlayerScore', (data, ws) =>{
    let player = activePlayers.filter(element => element.player.nickName === data.player.nickName)[0].player;
    player.score = data.player.score;
    updateRanking();
});

wsApp.onEvent('startGame', (data, ws) =>{
    wsApp.broadCastToClients({eventName: 'startGame'});
});

wsApp.onEvent('resetGame', (data, ws) =>{
    activePlayers = [];
    wsApp.broadCastToClients({eventName: 'resetGame'});
    updateRanking();
});

wsApp.onEvent('playerGameOver', (data, ws) =>{
    let player = activePlayers.filter(element => element.player.nickName === data.player.nickName)[0].player;
    player.status = 'GAMEOVER';
    ws.close();
    updateRanking();
});
