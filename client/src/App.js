import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Join from "./components/Join/Join"
import Chat from "./components/Chat/Chat"

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' exact={true} element={<Join/>} />
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </React.Fragment>
  )
}

export default App
