const socketIo = require("socket.io");
var socketServer = {};
let interval;

module.exports = {
    init: function (app) {
        console.log("Init socket");

        const server = require('http').Server(app);
        const io = socketIo(server);
        server.listen(3001);

        io.on("connection", (socket) => {
            socketServer["socket"] = socket;
            console.log("New client connected");
            /*  if (interval) {
                  clearInterval(interval);
              }*/
            //  interval = setInterval(() => getApiAndEmit(socketServer), 1000);
            socketServer.socket.on("disconnect", () => {
                console.log("Client disconnected");
                clearInterval(interval);
            });
        });


        const getApiAndEmit = socket => {
            const response = new Date();
            // Emitting a new message. Will be consumed by the client

            socket.emit("FromAPI", response);
        };
    }
    , socketServer
}