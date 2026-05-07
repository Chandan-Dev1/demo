import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const {loading,handleRegister }=useAuth()

    const navigate = useNavigate()

    if(loading){
      return(
        <main>
          <h1>Loading....</h1>
        </main>
      )
    }

    async function handleSubmit(e) {
      e.preventDefault()
      await handleRegister(username,email,password)
        .then(()=>{
          console.log("user register successfully ")
        })
        navigate("/login")
    }
    
  return (
   <main>
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
        onInput={(e)=>{setUsername(e.target.value)}}
        type="text" 
        name='username' 
        placeholder='Enter the Username' />

        <input
        onInput={(e)=>{setEmail(e.target.value)}}
         type="email" 
         name='email' 
         placeholder='Enter the Email' />

        <input
        onInput={(e)=>{setPassword(e.target.value)}}
         type="password"
          name='password' 
          placeholder='Enter the Password' />
        <button type='submit'>Register</button>
      </form>
     <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
    </div>
   </main> 
  )
}

export default Register
