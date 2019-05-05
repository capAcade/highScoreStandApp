const config = {
    portWebApi: 8080,
    portSockets: 8081
}
import Xpress from './apiRoutes/xress'
import WebS from './wsRoutes/wsr'
import Player from './player'

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
   \x1b[0m`)

const app = new Xpress(config); 
const wsApp = new WebS(config);

const updateRanking = function(){
    ranking.sort(function (a, b) {
        return a.score - b.score;
      }).reverse();
    wsApp.broadCastToClients(ranking);
};

wsApp.onEvent('kaas', (data) =>{
    console.log('het werkt!', data)
});

wsApp.onEvent('addNewPlayer', (data, ws) =>{
    let plyr = new Player(data.player.nickName,data.player.fullName,data.player.email);
    activePlayers.push({
        player: plyr,
        ws: ws
    });
    ranking.push(plyr);
    ws.send('added player');
});

wsApp.onEvent('updatePlayerScore', (data, ws) =>{
    let player = activePlayers.filter(element => element.player.nickName === data.player.nickName)[0].player;
    player.score = data.player.score;
    updateRanking();
});
