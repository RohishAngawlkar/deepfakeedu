import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const handleNextClick = () => {
    navigate("/generative-media-question")
  }
  return (
    <div>
      <Button onClick={handleNextClick}>Next</Button>
    </div>
  )
}

export default Login
