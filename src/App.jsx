import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Companymain from './components/Company Login-Register/Companymain'
import Railwaymain from './components/Railway Login-Register/Railwaymain'
import Landing from './components/Landing Page/Landing'
// import MapComponent from './components/Map API/Mapper'
// import Rakeanimation from './components/Visualizer/Rakeanimation'
import CompanyDashboard from './components/Dashboard/companyDashboard'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/companymain' element={<Companymain />}></Route>
      <Route path='/railwaymain' element={<Railwaymain />}></Route>
      {/* <Route path='/map' element={<MapComponent />}></Route> */}
      {/* <Route path='/rake' element={<Rakeanimation />}></Route> */}
      <Route path='/cdash' element={<CompanyDashboard />}></Route> 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
