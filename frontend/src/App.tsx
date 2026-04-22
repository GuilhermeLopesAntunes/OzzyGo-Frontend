import './App.css'
import { Routes, Route } from 'react-router-dom'

import RegisterPage from './features/Register/RegisterPage'
import InitialPage from './features/InitialPage/InitialPage'
import HomePage from './features/HomePage/HomePage'
import MainLayout from './MainLayout'
import StorePage from './features/Store/StorePage'

function App() {
  return (
    <>
      {/* Se precisar de um wrapper global, coloque aqui FORA do <Routes> */}
      <Routes>
        {/* Rotas sem a Bottom Nav */}
        <Route path='/' element={<InitialPage />}/>
        <Route path='/registro' element={<RegisterPage />}/>
        
        {/* Rotas COM a Bottom Nav (agrupadas no MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path='/pagina-inicial' element={<HomePage />}/>
          <Route path='/loja' element={<StorePage />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App