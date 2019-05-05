# highScoreStandApp

This is a small application that will keep track of the higscores of the people playing the space invaders game.

## How to develop?

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