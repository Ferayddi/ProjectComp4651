import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Footer from '../General/components/Footer.jsx';

const Layout = () => {
  return (
    <div className="w-full">
        <div className="w-full py-5 px-8 bg-black">
            <nav className="flex flex-row text-xl w-full justify-start gap-8">
                <Link className="text-white" to="/">
                    <Typography variant="h5" gutterBottom>
                        Home
                    </Typography>
                </Link>
                <Link className="text-white" to="/app">
                    <Typography variant="h5" gutterBottom>
                        App
                    </Typography>
                </Link>
                <Link className="text-white" to="/team">
                    <Typography variant="h5" gutterBottom>
                        Our team
                    </Typography>
                </Link>
            </nav>
        </div>
        <main className="">
            <Outlet />
        </main>
        
        <Footer valueOf={false}/>
    </div>
  )
}

export default Layout