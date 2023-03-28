// import Arena from "@colyseus/arena";
import express from 'express';
import { monitor } from "@colyseus/monitor";
import { Server } from 'colyseus';
import { createServer } from 'http';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { MySchool } from "./rooms/MySchool";

const gamePort = 2657;

const app = express();

const server = createServer();
const gameServer = new Server({
  transport: new WebSocketTransport({
    server, // provide the custom server for `WebSocketTransport`
  }),
});
gameServer.define('my_school', MySchool);
app.use('/colyseus', monitor());

app.get("/", (req, res) => {
              res.send("It's time to kick ass and chew bubblegum!");
          });

gameServer.listen(gamePort, "0.0.0.0");

// export default Arena({
//     getId: () => "Your Colyseus App",

//     initializeGameServer: (gameServer) => {
//         /**
//          * Define your room handlers:
//          */
//         gameServer.define('my_school', MySchool);

//     },

//     initializeExpress: (app) => {
//         /**
//          * Bind your custom express routes here:
//          */
//         

//         /**
//          * Bind @colyseus/monitor
//          * It is recommended to protect this route with a password.
//          * Read more: https://docs.colyseus.io/tools/monitor/
//          */
//         app.use("/colyseus", monitor());
//     },


//     beforeListen: () => {
//         /**
//          * Before before gameServer.listen() is called.
//          */
//     }
// });