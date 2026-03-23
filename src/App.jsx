import Login from './admin/Login.jsx'
import  Navigation from './Navigation.jsx'
import React, { useEffect ,useState } from 'react'
import Loaderpage from './Loaderpage.jsx'
import { Route,Routes ,useLocation} from 'react-router-dom'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Useradmin from './admin/Useradmin.jsx' 
import './App.css'

function App() {
  const[loading,setLoading]=useState(true)
  const location = useLocation();

  useEffect(()=>{ 
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])
if (loading) return <Loaderpage />;
const show_nav = !location.pathname.startsWith("/admin"); 
  return (
    <>
    {show_nav && <Navigation/>}
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/about/company" element={<About/>} />
        <Route path="/about/team" element={<About/>} />
        <Route path="/about/contact" element={<About/>} />
        

        <Route path="/" element={<h1>Our Products</h1>} />

        {/* for admin */}
        <Route path="/admin" element={<Login/>} />
        <Route path="/admin/users" element={<Useradmin/>} />



      </Routes>
    
    </>
  )
}

export default App
