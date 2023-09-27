import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import PersistLogin from './components/Auth/PersistLogin'
import PrivateRoute from './components/Auth/PrivateRoute'
import SpotifyCallback from './components/Auth/SpotifyCallback'
import StravaCallback from './components/Auth/StravaCallback'
import Navigation from './components/Navigation'
import { AuthProvider } from './context.js/AuthProvider'
import useAuth from './hooks/useAuth'
import Authentication from './pages/Authentication'
import Highlight from './pages/Highlight'
import Home from './pages/Home'
import Profile from './pages/Profile'


const App = () => {

  const { auth } = useAuth()

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route element={<PersistLogin />}>
            <Route path="/" element={<PrivateRoute><NavLayout /></PrivateRoute>}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="highlight/:highlight_id" element={<Highlight />} />
            </Route>
          </Route>

          <Route path="/auth" element={<Authentication />} />
          <Route path="/spotify-callback" element={<SpotifyCallback />} />
          <Route path="/strava-callback" element={<StravaCallback />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

const NavLayout = () => {
  return (
    <>
      <Navigation />
      <div className="py-5 my-2">
        <Outlet />
      </div>
    </>
  )
}

export default App