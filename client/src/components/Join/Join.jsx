import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import "./Join.css"

function Join() {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Únete</h1>
        <input
          type="text"
          placeholder="Nombre"
          className="joinInput"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sala"
          className="joinInput mt-20"
          onChange={(e) => setRoom(e.target.value)}
        />
        {/* Se añaden parámetros a la query string mediante el uso de los "?", posteriormente se agregan más datos al endpoint mediante los "&" */}
        <NavLink
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            Unirse al chat
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default Join
