import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

// import Layout from './Components/Layout/Layout.jsx';
// Import the components you will route to
import HomePage from './Components/Home/HomePage.jsx';
import LoginPage from './Components/Login/LoginPage.jsx';
import RegisterPage from './Components/Register/RegisterPage.jsx'
import AppPage from './AppPage/AppPage.jsx';
import TeamPage from './Team/TeamPage.jsx';
import Nav from './Components/NavBar/NavBar.jsx'
import useAuth from './Hook/isAuthenticated.jsx';


function App() {
    const isAuthenticated = useAuth();


    return (
        <Router>
            {isAuthenticated && <Nav />}
            <Routes>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login"  element={isAuthenticated ? <Navigate to="/" /> : <LoginPage/>} />
                <Route
                    path="/"
                    element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/app" element={<AppPage />} />
            </Routes>
        </Router>
    );
}

export default App
