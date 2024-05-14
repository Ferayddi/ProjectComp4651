import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Footer from '../General/components/Footer.jsx';

const Layout = () => {
  return (
    <div className="w-full">
        <div className="w-full py-5 px-8 bg-our-blue">
            <nav className="flex flex-row text-xl w-full justify-content-end gap-8">
                <Link className="text-black" to="/">
                    <Typography variant="h5" gutterBottom>
                        Home
                    </Typography>
                </Link>
                <Link className="text-black" to="/app">
                    <Typography variant="h5" gutterBottom>
                        App page
                    </Typography>
                </Link>
                <Link className="text-black" to="/team">
                    <Typography variant="h5" gutterBottom>
                        Our team
                    </Typography>
                </Link>
            </nav>
        </div>
        <main className="">
            <Outlet />
        </main>
        
        <Footer />
    </div>
  )
}

export default Layout