import React from 'react'
import { Outlet, Link } from 'react-router-dom';


const Layout = () => {
  return (
    <div>
        <div className="w-full bg-gray">
            <nav className="flex flex-row w-full justify-content-end gap-2">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </nav>
        </div>
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout