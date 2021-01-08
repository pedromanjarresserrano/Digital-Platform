const socketIo = require("socket.io");
let socketServer = {};
let interval;
const serverIO = {};
module.exports = {
    init: function(app) {
        console.log("Init socket");

        const server = require('http').Server(app);
        serverIO.io = socketIo(server, {
            cors: {
                origin: '*',
            }
        });
        server.listen(3001);

        serverIO.io.on("connection", (socket) => {
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
    },
    socketServer,
    serverIO
}