const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require('http');
const routers = require("./src/routes/index");

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();

 
});
app.use(cors());

//Importo las rutas
app.use("/", routers);

const io = require("socket.io")(server, {
  cors: {
      origin: '*',
    }
});

io.on('connection',(socket) =>{
    console.log('[Server] We have new connection !!!');
    socket.on('conectado',(data)=>{
        console.log(data)
    });

    socket.on('like',(data)=>{
        console.log(data)
        io.emit('liked', {
            
            type: 2,
            user: data.user,
            userID: data.userID,
            publication: data.publication,
            userPublicationId: data.userPublicationId
            
        })
    });

    socket.on('disconnect',()=>{
        console.log("El usuario se a desconectado")
    });
});

module.exports = {
    server
};
