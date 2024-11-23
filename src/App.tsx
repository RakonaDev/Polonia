
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { InicioLayout } from './layouts/Inicio.layout'

function App() {

  return (
    <>
      <Header />
      <div className='w-full h-24'></div>
      <Routes>

        <Route path="/" element={ <InicioLayout /> } />
      </Routes>
    </>
  )
}

export default App
