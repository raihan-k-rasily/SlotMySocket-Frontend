import { Route, Routes } from 'react-router-dom'

import Home from './users/pages/Home'
import Auth from './pages/Auth'
import PNF from './pages/PNF'
import Preloader from './components/Preloader'

import Profile from './users/pages/Profile'
import Stations from './users/pages/Stations'
import Contact from './users/pages/Contact'



function App() {

  return (
    <>
      <Routes>

          <Route path='' element={<Home/>}/>
          <Route path='*' element={<PNF/>}/>

          <Route path='login' element={<Auth/>}/>
          <Route path='register' element={<Auth register/>}/>

          {/* USERS */}
          <Route path='profile' element={<Profile/>}/>
          <Route path='stations' element={<Stations/>}/>
          <Route path='contact' element={<Contact/>}/>

      </Routes>
    </>
  )
}

export default App
