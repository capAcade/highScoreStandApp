# highScoreStandApp

This is a small application that will keep track of the higscores of the people playing the space invaders game.

## How to develop

If you wan to develop on this application first install all dependencies by doing the command `npm i`.

### run complete application

```cli
npm run serve
```

This will run the application on port 8080 for the front end and the apiRest calls on 8081 the websockets will be listening.  

just browse to http://localhost:8080 and you will see the page.

### run backend watch mode

this will not compile the front end

```cli
npm run watch:ba
```

### run front end watch mode

this will not compile the front end

```cli
npm run watch:fe
```

### run only build

This will compile the backend or front end

```cli
npm run build:fe
npm run build:ba
```

### TODO

What to do:

| Task                                                                               | Who is onit?  | Done                   |
| ---------------------------------------------------------------------------------- |:-------------:| :---------------------:|
| making front end score board                                                       | Esther        |                        |
| Making front end filling in player info                                            | Karin         |                        |
| Making backend for saving data can be just json file                               | Serge         | :white_check_mark:     |
| Adding Space invaders game + sending score updates to ba                           | Sven          | :white_check_mark:     |
| game over functionality ws needs to be closed and removed from active player list  | Sven          | :white_check_mark:     |
| Create admin dashboard to follow players+ranking and start game                    | Sven          | :white_check_mark:     |
| load JSON file on startup with stub data/ or actual saved data                     | Serge         | :white_check_mark:     |
| Keep websocket connections alive functionality                                     | Sven          | :white_check_mark:     |
| Add configuration for dashboard and admin dashboard                                | Serge         | :white_check_mark:     |
| Check for duplicate active nicknames                                               | Serge         | :white_check_mark:     |
