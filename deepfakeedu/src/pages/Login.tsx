import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  return (<>
    <Navbar />
    <div className="antialiased">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="space-y-5">
          <h1 className="text-center font-bold text-6xl">
            Welcome Back!
          </h1>
          <p className="text-center">
            Please log in to continue.
          </p>
          <div className='w-full text-center'>
            <form className='space-y-4'>
              <div>
                <label className='block text-2xl font-semibold' htmlFor='email'>Email:</label>
                <input type='email' id='email' className='w-2/5 rounded-full p-2 border border-gray-300' required />
              </div>
              <div>
                <label className='block text-2xl font-semibold' htmlFor='password'>Password:</label>
                <input type='password' id='password' className='w-2/5 rounded-full p-2 border border-gray-300' required />
              </div>
              <Button onClick={() => navigate("/generative-media-question")} className='rounded-full w-1/5 bg-[#5AE579] hover:bg-[#5AE579] hover:shadow-lg hover:shadow-[#5AE579] transition duration-300'>Log In</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default LoginPage
