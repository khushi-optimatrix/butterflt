
import { Link } from 'react-router-dom'

import './App.css'
function Navigation() {
  return (
    <>
    
      <nav style={{ marginBottom: "0px",textAlign: "center" }}>
        <div><img src='/logo.png' alt='logo'/></div>
        <div><Link to="/">Home</Link> 
        <div className="dropdown">
          <span className="dropbtn">About ▾</span>
          <div className="dropdown-content">
            <Link to="/about/company">Company</Link>
            <Link to="/about/team">Team</Link>
            <Link to="/about/contact">Contact</Link>
          </div>
        </div>
        <Link to="/products">Products</Link></div>
        
      </nav>
      
    
   </>
  )
}

export default Navigation

