import './NavBar.css'
import text_logo from '../../assets/text_logo.png'
import menu_icon from '../../assets/menu_icon.png'
import {useEffect, useState} from "react";

const Navbar = () => {
    const [sticky, setSticky] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', ()=> {
            window.scrollY > 50 ? setSticky(true) : setSticky(false);
        })
    }, []);

    const [mobileMenu, setMobileMenu] = useState(false)
    const toggleMenu = () => {
        mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
    }

    return (
        <nav className={`${sticky? 'dark-nav' : ''}`}>
            <img src = {text_logo} alt="" className='logo'></img>
            <ul className={mobileMenu?'hide-mobile-menu':''}>
                <li>Home</li>
                <li>Collect Data</li>
                <li>Perform cluster analysis</li>
                <li>Retrieve results</li>
                <li><button className="btn">Contact us</button></li>
            </ul>
            <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenu}></img>
        </nav>
    )
}

export default Navbar