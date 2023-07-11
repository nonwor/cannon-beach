import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavigateBar from './components/navbar/index.jsx'
import {Route, Routes } from 'react-router-dom';

//Import pages
import Home from './pages/home'
import Upload from './pages/upload'
import Analysis from './pages/analysis'
import LoginSignup from './pages/login_signup'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <NavigateBar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/analysis' element={<Analysis/>}/>
        <Route path='/loginsignup' element={<LoginSignup/>}/>
        <Route path='/*' element={<Home/>}/>
      </Routes>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
