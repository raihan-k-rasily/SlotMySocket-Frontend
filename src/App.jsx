import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
useEffect

import Home from './users/pages/Home'
import Auth from './pages/Auth'
import PNF from './pages/PNF'
import Preloader from './components/Preloader'

import Profile from './users/pages/Profile'
import Stations from './users/pages/Stations'
import Contact from './users/pages/Contact'

import AdminHome from './admin/pages/AdminHome'
import AdminVerification from './admin/pages/AdminVerification'
import AdminView from './admin/pages/AdminView'
import AdminSettings from './admin/pages/AdminSettings'





function App() {
  // for loading animation preloading
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 2000)
  }, [])

  return (
    <>
      <Routes>

        <Route path='' element={isLoading ? <Home /> : <Preloader />} />
        <Route path='*' element={<PNF />} />

        <Route path='login' element={<Auth />} />
        <Route path='userregister' element={<Auth userRegister />} />
        <Route path='ownerregister' element={<Auth ownerRegister />} />

        {/* USERS */}
        <Route path='profile' element={<Profile />} />
        <Route path='stations' element={<Stations />} />
        <Route path='contact' element={<Contact />} />

        
        {/* ADMIN */}
        <Route path='adminhome' element={<AdminHome />} />
        <Route path='adminverification' element={<AdminVerification />} />
        <Route path='adminview' element={<AdminView />} />
        <Route path='adminsettings' element={<AdminSettings />} />

      </Routes>
    </>
  )
}

export default App
