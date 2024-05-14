import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './Layout/Layout.jsx';
// Import the components you will route to
import HomePage from './Home/HomePage.jsx';
import AppPage from './AppPage/AppPage.jsx';
import TeamPage from './Team/TeamPage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      {/* <div> */}
        {/* Set up the Routes for your application */}
        <Routes>
          <Route path="/" element={<Layout />}>
          {/* Route for the HomePage component */}
            <Route path="/" element={<HomePage />} />

            {/* Route for the Login component */}
            <Route path="/app" element={<AppPage />} />

            {/* Route for the Team component */}
            <Route path="/team" element={<TeamPage />} />
          </Route>
        </Routes>
      {/* </div> */}
    </Router>
  );

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl" >Vite + React</h1>
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
      </p>
    </>
  )
}

export default App
