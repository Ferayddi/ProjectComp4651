import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

// import Layout from './Components/Layout/Layout.jsx';
// Import the components you will route to
import HomePage from './Components/Home/HomePage.jsx';
import LoginPage from './Components/Login/LoginPage.jsx';
import RegisterPage from './Components/Register/RegisterPage.jsx'
import AppPage from './Components/AppPage/AppPage.jsx';
import TeamPage from './Components/Team/TeamPage.jsx';
import useAuth from './Hook/isAuthenticated.jsx';
import Layout from './Components/Layout/Layout.jsx';
import CrawlPage from './Components/Crawl/CrawlPage.jsx';


function App() {
    const isAuthenticated = useAuth();


    return (
        <Router>
            <Routes>
                 <Route path="/register" element={<RegisterPage/>}/>
                 {/*<Route path="/login"  element={<LoginPage/>} />*/}
                 <Route path="/login"  element={isAuthenticated ? <Navigate to="/" /> : <LoginPage/>} />
                 <Route path="/" element={<Layout />} >
                     <Route path="/" element={<HomePage />} />
                     <Route
                         path="/app"
                         element={isAuthenticated ? <AppPage /> : <Navigate to="/login" />}
                     />
                    <Route path="/team" element={<TeamPage />} />
                     <Route path="/crawl" element={<CrawlPage />} />
                    {/*<Route path="/app" element={<AppPage />} />*/}
                 </Route>
                {/*<Route path="/" element={<Layout />} >*/}
                {/*    <Route path="/" element={<HomePage />} />*/}
                {/*    <Route path="/team" element={<TeamPage />} />*/}
                {/*    <Route path="/app" element={<AppPage />} />*/}
                {/*</Route>*/}
            </Routes>
        </Router>
    );
}

export default App
