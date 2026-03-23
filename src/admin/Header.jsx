import React,{useState,useEffect} from 'react'
import './admin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
function Header() {
  const[username,setUsername]=useState('Guest');
      useEffect(()=>{
          const storedUsername = sessionStorage.getItem('username');
          if (storedUsername) {
              setUsername(storedUsername);
          }
  
      },[username])
  return (
    <>
    <div className='topbar'>
        <div className='topbar-title'>User List</div>
        <div className='topbar-user'>
          <div><FontAwesomeIcon icon={faUserCircle} size="lg" />{username}</div>
          <button className='logout-btn' onClick={()=>{ sessionStorage.clear(); window.location.href='/admin';}}>Logout</button>
        </div>
        
    </div>
    <div className='sidebar'>
        <div className='sidelogo'><img src="/logo.png" height={"50px"} alt="Logo" /><span>Butterfly</span></div>
        <div className='sidemenu'>
            <NavLink 
            to="/admin/home" 
            className={({ isActive }) => isActive ? 'menulist active' : 'menulist'}
          >
            <FontAwesomeIcon icon={faTachometerAlt} size="lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => isActive ? 'menulist active' : 'menulist'}
          >
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
            <span>Users</span>
          </NavLink>
        </div>
    </div>

    </>
  )
}

export default Header 