import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CountryPage from './pages/CountryPage'
import Cart from './pages/Cart'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <Home check={darkMode} change={() => setDarkMode(!darkMode)} />
          }
        />
        <Route path="/countries/:country" element={<CountryPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </ThemeProvider>
  )
}
