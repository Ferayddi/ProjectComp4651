import {Outlet, Link, useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Footer from '../General/components/Footer.jsx';
import useAuth from '../../Hook/isAuthenticated.jsx';
import LogoutIcon from '../../assets/logout.png'
import LoginIcon from '../../assets/login.png'
import secureLocalStorage from "react-secure-storage";
import text_logo from "../../assets/text_logo.png";
import './Layout.css'
import menu_icon from "../../assets/menu_icon.png";
import {useEffect, useState} from "react";

const Layout = () => {
    const isAuthenticated = useAuth();
    let navigate = useNavigate();

    const handleLogout = () => {
        secureLocalStorage.removeItem('accessToken')
        secureLocalStorage.removeItem('userName')
        navigate("/");
        window.location.reload();
    };

    const handleLogin = () => {
        navigate("/login");
        window.location.reload();
    }

    const [mobileMenu, setMobileMenu] = useState(false)
    const toggleMenu = () => {
        mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', ()=> {
            if(window.scrollY > 50)  setMobileMenu(false);
        })
    }, []);

    return (
        <div className="w-full">
            <nav className="flex flex-row text-xl w-full items-center gap-8">
                <img src = {text_logo} alt="" className='logo'></img>
                <ul className={mobileMenu ? 'hide-mobile-menu':''}>
                    <li>
                        <Link className="text-white" to="/">
                            <Typography variant="h5" gutterBottom>
                                Home
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        <Link className="text-white" to="/app">
                            <Typography variant="h5" gutterBottom>
                                App
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        <Link className="text-white" to="/crawl">
                            <Typography variant="h5" gutterBottom>
                                Crawl
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        <Link className="text-white" to="/team">
                            <Typography variant="h5" gutterBottom>
                                Our team
                            </Typography>
                        </Link>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            <button className="text-black flex items-center"  onClick={handleLogout}>
                                <img src={LogoutIcon} alt="Logout" className="icon mr-2" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <button className="text-black flex items-center" onClick={handleLogin}>
                                <img src={LoginIcon} alt="Login" className="icon mr-2" />
                                <span>Login</span>
                            </button>
                        )}
                    </li>
                </ul>
                <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenu}></img>
            </nav>
            <main>
                <Outlet />
            </main>

            <Footer valueOf={false}/>
        </div>
    )
}

export default Layout