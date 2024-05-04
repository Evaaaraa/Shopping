import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import  Home from './pages/Home'
import Nav from './components/nav.jsx'
import Details from './pages/Details.jsx'
import Cart from './pages/Cart.jsx'

function App() {
  const[search,setSearch]=useState("")
  const[count,setCount]=useState(0)

  return (
    <>
      <BrowserRouter>
      <Nav setSearch={setSearch} cnt={count}/>

        <Routes>
          <Route path='/' element={<Home search={search}/>}/>
          <Route path='/details/:id' element={<Details setcnt={setCount} cnt={count}/>}/>
          <Route path='/cart' element={<Cart setcnt={setCount} cnt={count}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
