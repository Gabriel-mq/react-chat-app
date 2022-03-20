import React, { useState, useEffect } from 'react'
//"queryString" es un módulo que nos permite recuperar información de determinado endpoint
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from "../Messages/Messages"
import TextContainer from '../TextContainer/TextContainer'

import "./Chat.css"

let socket

function Chat() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState('')
  const ENDPOINT = 'https://react-chat-mq.herokuapp.com/' /* localhost:5000 */

  //el hook "useLocation" deriva de react-router-dom. Es un componente que nos permite manipular los datos provenientes de los endpoints
  const loc = useLocation()

  useEffect(() => {
    const { name, room } = queryString.parse(loc.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    //"socket.emit()" nos permite enviar eventos desde el lado del cliente al servidor y viceversa, utilizando instancias derivadas de los websockets. Este método recibe 2 argumentos, el primero será el "alias" del evento a enviar con el cuál será referido en el server/client side. El segundo argumento contendrá toda la carga útil que se desee enviar
    socket.emit('join', { name, room }, () => {})

    //Para finalizar la desconexión del usuario (una vez cierre la aplicación) se desmonta el componente haciendo uso de la keyword "return", pero no solamente se desmontará el componente sino que también se desconectará el websocket que el usuario esté utilizando en ese mismo momento empleando los métodos "socket.emit()" que a su vez envía el evento "disconnect". Posteriormente se usa el método "socket.off()" para la correcta y completa desconexión
    return () => {
      socket.emit('disconnect')

      socket.off()
    }
  }, [ENDPOINT, loc.search])

  //Segundo useEffect encargado de manipular los mensajes enviados desde el backend
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""))
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  )
}

export default Chat
