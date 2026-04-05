// File: frontend/src/pages/Login.jsx
import React, { useState } from 'react'
import logo from "../assets/logo.svg"
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Login() {
  const [show, setShow] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + "/api/auth/login", {
        email,
        password
      }, { withCredentials: true })

      console.log(result.data)
      setError("")
      setLoading(false)
      setEmail("")
      setPassword("")
      navigate("/")

    } catch (err) {
      const errData = err?.response?.data?.message

      if (Array.isArray(errData)) {
        setError(errData.map(e => e.msg).join(", "))
      } else {
        setError(errData || "Something went wrong, try again later")
      }

      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen bg-[#c4d6e6] flex flex-col items-center justify-start gap-[10px]'>

      {/* LOGO */}
      <div className='p-[30px] lg:p-[35px] w-full h-[80px] flex items-center'>
        <img src={logo} alt="logo" />
      </div>

      {/* FORM CENTERED IN REMAINING SPACE */}
      <div className='flex-1 w-full flex items-center justify-center'>
        <form
          className='w-[90%] max-w-[400px] shadow-xl flex flex-col justify-center gap-[10px] p-[20px] rounded-md bg-[#e6ecef]'
          onSubmit={handleLogin}
        >
          <h1 className='text-gray-800 text-[30px] font-semibold mb-[20px]'>
            Sign In
          </h1>

          {/* EMAIL */}
          <input
            type="email"
            placeholder='Email'
            required
            className='w-full h-[50px] border border-gray-400 bg-white text-gray-800 text-[18px] px-[20px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
            value={email} onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD WITH TOGGLE */}
          <div className='w-full h-[50px] relative'>
            <input
              type={show ? "text" : "password"}
              placeholder='Password'
              required
              className='w-full h-full border border-gray-400 bg-white text-gray-800 text-[18px] px-[20px] pr-[70px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShow(prev => !prev)}
              className='absolute right-[15px] top-[50%] translate-y-[-50%] text-blue-600 cursor-pointer font-medium'
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {/* ERROR */}
          {error && <p className='text-red-500 text-sm'>{error}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            className='w-full h-[50px] rounded-full bg-blue-600 mt-[40px] text-white text-[18px] font-semibold hover:bg-blue-700 transition'
            disabled={loading}
          >
            {loading ? "loading :)" : "Sign In"}
          </button>

          <p className='text-center cursor-pointer'>
            Don't have an account?{" "}
            <span className='text-blue-600' onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>

        </form>
      </div>

    </div>
  )
}

export default Login