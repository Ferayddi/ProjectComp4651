import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from 'react-auth-kit';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

import Layout from './Layout/Layout.jsx';
// Import the components you will route to
import Navbar from "./Components/NavBar/NavBar.jsx";
import HomePage from './Home/HomePage.jsx';
import LoginPage from './Login/LoginPage.jsx';
import createStore from "react-auth-kit/createStore";



function App() {

    const store = createStore({
        authName:'_auth',
        authType:'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: false,
    });

  return (
      <AuthProvider store={store}>
          <Router>
              {!useIsAuthenticated && <Navbar />}
              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  {/*<Route path="/" element={<Layout />}>*/}
                  <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path="/" element={<HomePage />} />
                  </Route>
                  {/*</Route>*/}
              </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App
