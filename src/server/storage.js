import fs from 'fs';
const playersFile = 'players.txt';
const highScoresFile = 'highscores.json';

class Storage {
    constructor() {
        this.highScores = {};
        if (fs.existsSync(highScoresFile)) {
            this.highScores = fs.readFileSync(highScoresFile)
        }
    }

    savePlayer(player) {
        fs.appendFileSync(playersFile, `${JSON.stringify(player)}\r\n`);
    }

    saveHighScores() {

    }

    getHighScores() {

    }
}

export default new Storage();
