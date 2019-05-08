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

    saveHighScores(highScores) {
        fs.writeFileSync(highScoresFile, JSON.stringify(highScores));
    }

    getHighScores() {
        if (fs.existsSync(highScoresFile)) {
            console.log('test');
            const data = fs.readFileSync(highScoresFile, 'utf8');
console.log(data, JSON.parse(data));
            return data ? JSON.parse(data) : [];
        } else {
            return [];
        }
    }
}

export default new Storage();
