import { useState } from 'react'

import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'

import AllTodos from './pages/all'
import CompletedTasks from './pages/complete'
import PendingTasks from './pages/pending'
import Profile from './pages/Profile'


function App() {


  return (
    
    <>
      <Header/>

      <Routes>
        <Route path='/' element={<AllTodos/>}/>
        <Route path='completed' element={<CompletedTasks />} />
        <Route path='pending' element={<PendingTasks />}/>
        <Route path='me' element={<Profile />}/>



      </Routes>
    </>
  )
}

export default App
