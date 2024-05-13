import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import createStore from "react-auth-kit/createStore";
import AuthProvider from 'react-auth-kit';

import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

// import Layout from './Components/Layout/Layout.jsx';
// Import the components you will route to
import HomePage from './Components/Home/HomePage.jsx';
import LoginPage from './Components/Login/LoginPage.jsx';

const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
});

function App() {


  return (
      <>
          <Router>
              <AuthProvider store={store} fallbackPath='/login'>
                  <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      {/*<Route path="/" element={<HomePage />} />*/}
                      {/*<Route path="/" element={<Layout />}>*/}
                      <Route element={<AuthOutlet fallbackPath='/login' />}>
                          <Route path="/" element={<HomePage />} />
                      </Route>
                      {/*</Route>*/}
                  </Routes>
              </AuthProvider>
          </Router>
      </>
  );
}

export default App
