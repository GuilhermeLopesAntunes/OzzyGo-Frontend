
import './App.css'
import { Routes, Route } from 'react-router-dom'

import RegisterPage from './features/Register/RegisterPage'
import InitialPage from './features/InitialPage/InitialPage'
import HomePage from './features/HomePage/HomePage'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element = {<InitialPage />}/>
        <Route path='/registro' element={<RegisterPage />}/>
        <Route path='/pagina-inicial' element={<HomePage />}/>
      </Routes>
    </>
  )
}

export default App
