const express = require('express'),
  { Server } = require("socket.io"),
  http = require('http'),
  cors = require('cors'),
  app = express()

//Helper functions
const { addUser, removeUser, getUser, getUsersInRoom} = require("./users")

//Seteo de puerto para deploy y dev
const PORT = process.env.PORT || 5000

const mainRouter = require('./routers/mainRouter')

//Creación de server basado en websockets junto con sus respectivas opciones de cors
const server = http.createServer(app)
const corsOpts = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports : ['websocket', "polling"],
    credentials: true
  },allowEIO3: true
}

const io = new Server(server,corsOpts)

app.use(mainRouter)

//Conexión con los websockets del cliente
io.on('connection', (socket) => {
  //Como primer parámetro del método "socket.on" se emplea el alias enviado desde el lado del cliente  para recibir los eventos, el segundo será un callback que contendrá los argumentos enviados por el cliente dentro de un objeto literal, también enviados desde el lado del cliente. El tercer parámetro es un callback handler que dispondrá de los errores que puedan surgir
  socket.on("join", ({name,room}, cb) => {
    const { error, user } = addUser({id: socket.id , name, room})

    //Error handler
    if(error) return cb(error)

    //Se envían eventos al client side con simples mensaje de bienvenida
    socket.emit("message", { user: "", text: `${user.name}, bienvenid@ a la sala ${user.room}`})
    socket.broadcast.to(user.room).emit("message", { user:"admin", text: `${user.name}, ¡se ha unido al chat!`})

    //El método "socket.join" nos permite ingresar un usuario en determinada sala
    socket.join(user.room)

    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room)})

    cb()
  } )

  //Creación de instancias para los eventos generados por los usuarios para enviarlos al backend
  socket.on("sendMessage", (message,cb) => {
    const user = getUser(socket.id)

    io.to(user.room).emit("message", { user: user.name, text: message})
    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room)})

    cb()
  })

  //Desconexión con los websockets del cliente
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if(user) {
      io.to(user.room).emit("message", { user: "", text: `El usuario: ${user.name} se ha desconectado`})
    }
  })
})

//Inicio de server
server.listen(PORT, () => console.log('Server corriendo'))

//Cors
app.use(cors())
