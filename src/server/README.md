# API server

This is kinda the rest contract how to send and recieve data from the backend trough websockets

## Add new Player

This will create a new player and add the player to ranking list and current player list.

* Expected format is JSON

example Object:

```javascript
{
    "eventName": "addNewPlayer",
    "player": {
        "nickName": "pokeMaster",
        "fullName": "ash ketchum",
        "email": "ash.ketchum@gmail.com"
    }
}
```

Example front end call

```javascript
var data = {
    "eventName": "addNewPlayer",
    "player": {
        "nickName": "pokeMaster",
        "fullName": "ash ketchum",
        "email": "ash.ketchum@gmail.com"
    }
};
connection.send(JSON.stringify(data));
```

## Update player score

This will update the score of the current player if in the current player list. This will also broadcast to all connected clients the latest ranking.

* Expected format is JSON
* score comes in the format number!

example Object:

```javascript
{
    "eventName": "updatePlayerScore",
    "player": {
        "nickName": "pokeMaster",
        "score": 800
    }
}
```

Example front end call

```javascript
var data = {
    "eventName": "updatePlayerScore",
    "player": {
        "nickName": "pokeMaster",
        "score": 800
    }
};
connection.send(JSON.stringify(data));
```
