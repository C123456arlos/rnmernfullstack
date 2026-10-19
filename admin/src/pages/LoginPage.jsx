import { SignIn, UserButton } from '@clerk/clerk-react'
import React from 'react'

function LoginPage() {
  return (
      <div className='h-screen flex justify-center items-center'>
      <SignIn></SignIn>
    </div>
  )
}

export default LoginPage