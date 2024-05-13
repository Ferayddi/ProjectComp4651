import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

import Layout from './Components/Layout/Layout.jsx';
// Import the components you will route to
import Navbar from "./Components/NavBar/NavBar.jsx";
import HomePage from './Components/Home/HomePage.jsx';
import LoginPage from './Components/Login/LoginPage.jsx';



function App() {

    // const isAuthenticated = useIsAuthenticated();


  return (
          <Router>
              {/*{!isAuthenticated() && <Navbar />}*/}
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  {/*<Route path="/" element={<Layout />}>*/}
                  <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path="/" element={<HomePage />} />
                  </Route>
                  {/*</Route>*/}
              </Routes>
          </Router>
  );
}

export default App
