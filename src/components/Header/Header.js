import React, { useContext } from 'react';
import './Header.css';
import AuthContext from '../../context/auth-context';

import { Link, Outlet, useNavigate } from 'react-router-dom';

function Header() {

  const {
    authObject,
    setAuthObject
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignout = () => {
    setAuthObject(null);
    navigate('/admin/signin');
  }

  return (
    <>
      <header className="Header text-start">
        <div className="filter">
        </div>
        <div className="above-filter">
          <h1 className="display-2 "><Link className="link-dark" to="/"><strong>Doug reads books.</strong></Link></h1>
          {authObject && authObject.userId === process.env.REACT_APP_USER_ID && (
            <>
              <Link to="/admin/addpost">New Post</Link>
              <button onClick={handleSignout}>Sign Out</button>
            </>
          )}
        </div>
      </header>
      <body className="py-4">
        <Outlet />
      </body>
    </>
  )
}



export default Header;