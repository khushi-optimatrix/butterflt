import React, { useEffect, useState } from 'react'
import Header from './Header.jsx'
function Dashboard() {
    const[username,setUsername]=useState('Guest');
    useEffect(()=>{
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

    },[username])
  return (
    <>
    <Header/>
    <div className='rightpage'><div>Welcome, {username}!</div></div>
    


    </>
  )
}

export default Dashboard