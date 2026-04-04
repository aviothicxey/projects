import React, { useState } from 'react'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext'
function Signup() {
  const [show, setShow] = useState(false)
  let {serverUrl} = useContext(authDataContext)
  const navigate = useNavigate()

  let[firstName, setFirstName] = useState("")
  let[lastName, setLastName] = useState("")
  let[username, setUsername] = useState("")
  let[email, setEmail] = useState("")
  let[password, setPassword] = useState("")
 
  const handleSignUp = async() =>{
    try{

      const result = await axios.post(serverUrl + "/api/auth/signup",{
        firstName,
        lastName,
        username,
        email,
        password
        
      })

    }catch(err){

    }
  }

  return (
    <div className='w-full h-screen bg-[#c4d6e6] flex flex-col items-center justify-start gap-[10px]'>
      
      {/* LOGO */}
      <div className='p-[30px] lg:p-[35px] w-full h-[80px] flex items-center'>
        <img src={logo} alt="logo" />
      </div>

      {/* FORM */}
      <form className='w-[90%] max-w-[400px] h-[600px] shadow-xl flex flex-col justify-center gap-[10px] p-[20px] rounded-md bg-[#e6ecef]'>
        
        <h1 className='text-gray-800 text-[30px] font-semibold mb-[20px]'>
          Sign Up
        </h1>

        {/* INPUTS */}
        <input 
          type="text" 
          placeholder='First Name' 
          required 
          className='w-full h-[50px] border border-gray-400 bg-white text-gray-800 text-[18px] px-[20px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition '
          value={firstName} onchange={(e) => setFirstName(e.target.value)}
        />

        <input 
          type="text" 
          placeholder='Last Name' 
          required 
          className='w-full h-[50px] border border-gray-400 bg-white text-gray-800 text-[18px] px-[20px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
          value={lastName} onchange={(e) => setLastName(e.target.value)}
        />

        <input 
          type="text" 
          placeholder='Username' 
          required 
          className='w-full h-[50px] border border-gray-400 bg-white text-gray-800 text-[18px] px-[20px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
          value={username} onchange={(e) => setUsername(e.target.value)}
        />

        <input 
          type="email" 
          placeholder='Email' 
          required 
          className='w-full h-[50px] border border-gray-400 bg-white text-gray-800 text-[18px] px-[20px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
          value={email} onchange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD WITH TOGGLE */}
        <div className='w-full h-[50px] relative'>
          
          <input 
            type={show ? "text" : "password"} 
            placeholder='Password' 
            required 
            className='w-full h-full border border-gray-400 bg-white text-gray-800 text-[18px] px-[20px] pr-[70px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
            value={password} onchange={(e) => setPassword(e.target.value)}
          />

          <span 
            onClick={() => setShow(prev => !prev)}
            className='absolute right-[15px] top-[50%] translate-y-[-50%] text-blue-600 cursor-pointer font-medium'
          >
            {show ? "Hide" : "Show"}
          </span>

        </div>

        {/* BUTTON */}
        <button 
          type="submit"
          className='w-full h-[50px] rounded-full bg-blue-600 mt-[60px] text-white text-[18px] font-semibold hover:bg-blue-700 transition'
        >
          Sign Up
        </button>
        <p className='text-center cursor-pointer'>Already have an account? <span className='text-blue-600 ' 
        onClick={() => navigate("/login")}
        >Sign In</span> </p>

      </form>

    </div>
  )
}

export default Signup