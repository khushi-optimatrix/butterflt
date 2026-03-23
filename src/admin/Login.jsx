import React from 'react'
import './admin.css'
import { useForm } from 'react-hook-form'
import axios from 'axios';

function Login() {
    const {register, handleSubmit,formState: { errors }}=useForm();
    const Submit = async (data) => {
        try{
            const res = await axios.post(`http://localhost:5000/api/auth`, {
            username: data.username,
            password: data.password
        });
        sessionStorage.setItem('userId', res.data.userId);
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('token', res.data.token);
        window.location.href = '/admin/home';
            
        }catch(err){
            console.error('Login error:', err.response ? err.response.data : err.message);
        }
    }


  return (
    <div className='loginpage'>
        <div className='loginbox'>
            <div className='logindetail'>
                <div><img src='/logo.png' alt='logo'/></div>
                <div className='logintitle' >Login</div>
                <form onSubmit={handleSubmit(Submit)}>
                <div className='filed_group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='Username' className='inputbox' {...register('username', { required: "Username is required" })}/>
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className='filed_group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder='Password' className='inputbox' {...register('password', { required: "Password is required" })}/>
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <button type="submit">Login</button>
                </form>

            </div>

        </div>

    </div>
  )
}

export default Login