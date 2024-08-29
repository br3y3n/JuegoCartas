import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Presala from '../Pages/Presala'
import { LoginRegister } from '../Pages/LoginRegister'
import Dashboard from '../Pages/Dashboard'
export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/login' element={<LoginRegister/>}/>
            <Route path='/presala' element={<Presala/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
