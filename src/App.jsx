import Companymain from "./components/Company Login-Register/Companymain";
import Railwaymain from "./components/Railway Login-Register/Railwaymain";
import Map from "./components/Map";
import Landing from "./components/Landing Page/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapComponent from './components/Map API/Mapper'
// import Rakeanimation from './components/Visualizer/Rakeanimation'
import CompanyDashboard from './components/Dashboard/companyDashboard'
import RailwayDashboard from "./components/Dashboard/railwayDashboard";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/companymain' element={<Companymain />}></Route>
      <Route path='/railwaymain' element={<Railwaymain />}></Route>
      <Route path="/map" element={<Map />}></Route>
      <Route path='/rmap' element={<MapComponent />}></Route>
      {/* <Route path='/rake' element={<Rakeanimation />}></Route> */}
      <Route path='/cdash' element={<CompanyDashboard />}></Route> 
      <Route path='/rdash' element={<RailwayDashboard />}></Route> 

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
