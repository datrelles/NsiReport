import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Nav } from './components/common/navbar/Nav'
import { Footer } from './components/common/footer/Footer'
import { Routes } from './routes/routes'
function App() {
  return (
    <>
      <Routes />
    </>
  )
}

export default App
