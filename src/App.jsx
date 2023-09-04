import Companymain from './components/Company Login-Register/Companymain'
import Railwaymain from './components/Railway Login-Register/Railwaymain'
import Landing from './components/Landing Page/Landing'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/companymain' element={<Companymain />}></Route>
      <Route path='/railwaymain' element={<Railwaymain />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
