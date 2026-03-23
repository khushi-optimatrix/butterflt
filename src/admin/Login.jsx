import React from 'react'
import './admin.css'

function Login() {
  return (
    <div className='loginpage'>
        <div className='loginbox'>
            <div className='logindetail'>
                <div><img src='/logo.png' alt='logo'/></div>
                <div className='logintitle'>Login</div>
                <div className='filed_group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='Username' className='inputbox' />
                </div>
                <div className='filed_group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password' className='inputbox' />
                </div>
                <button>Login</button>

            </div>

        </div>

    </div>
  )
}

export default Login