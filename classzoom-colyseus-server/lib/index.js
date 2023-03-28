"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Arena from "@colyseus/arena";
const express_1 = __importDefault(require("express"));
const monitor_1 = require("@colyseus/monitor");
const colyseus_1 = require("colyseus");
const http_1 = require("http");
const ws_transport_1 = require("@colyseus/ws-transport");
const MySchool_1 = require("./rooms/MySchool");
const gamePort = 4001;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)();
const gameServer = new colyseus_1.Server({
    transport: new ws_transport_1.WebSocketTransport({
        server, // provide the custom server for `WebSocketTransport`
    }),
});
gameServer.define('my_school', MySchool_1.MySchool);
app.use('/colyseus', (0, monitor_1.monitor)());
app.get("/", (req, res) => {
    res.send("It's time to kick ass and chew bubblegum!");
});
gameServer.listen(gamePort);
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
