import React from 'react'
import './admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
function Header() {
  return (
    <>
    <div className='topbar'>
        <div className='topbar-title'>User List</div>
    </div>
    <div className='sidebar'>
        <div className='sidelogo'><img src="/logo.png" height={"50px"} alt="Logo" /><span>Butterfly</span></div>
        <div className='sidemenu'>
            <div className='menulist '><FontAwesomeIcon icon={faTachometerAlt} size="lg" /><span>Dashboard</span></div>
            <div className='menulist active'><FontAwesomeIcon icon={faUserCircle} size="lg" /><span>Users</span></div>
        </div>
    </div>
    </>
  )
}

export default Header 