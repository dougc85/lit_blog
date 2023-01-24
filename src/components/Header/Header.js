import React, { } from 'react';
import './Header.css';

import { Link, Outlet } from 'react-router-dom';

function Header() {

  return (
    <>
      <header className="Header">
        <h1><Link to="/">Doug reads books.</Link></h1>
      </header>
      <Outlet />
    </>
  )
}



export default Header;