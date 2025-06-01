import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/weather';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
