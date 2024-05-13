import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';


const Layout = () => {
  return (
    <div className="w-full">
        <div className="w-full bg-gray">
            <nav className="flex flex-row text-xl w-full justify-content-end gap-8">
                <Link to="/">
                    <Typography variant="h5" gutterBottom>
                        Home
                    </Typography>
                </Link>
                <Link to="/login">
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                </Link>
            </nav>
        </div>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout