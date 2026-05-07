import React from 'react'
import "../style/form.scss"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const {handleLogin,loading}= useAuth()
    const navigate = useNavigate()
    if(loading){
      return(
       <main>
         <h1>Loading.......</h1>
       </main>
      )
    }
    async function handleSubmit(e){
      e.preventDefault()
      handleLogin(username,password)
      .then(()=>{
        console.log("login sucessfull")
         navigate('/')
      })
      
    }


  return (
      <main>
        <div className="form-container">
          <h1>login</h1>
          <form onSubmit={handleSubmit}>

            <input
            onInput={(e)=>{setUsername(e.target.value)}}
             type="text" 
              name='username'
               placeholder='Enter you name' />

            <input
            onInput={(e)=>{setPassword(e.target.value)}}
             type="password"
              name="password" 
              placeholder='Enter the password'/>
            <button type='submit'>Login</button>
          </form>
             <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
      </main>
  )
}

export default Login
