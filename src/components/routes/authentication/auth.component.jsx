import React from 'react'
import './auth.styles.scss'
import SignUpForm from '../../sign-up-form/sign-up.component'
import SignInForm from '../sign-in/signin.component'

const Auth = () => {
  return (
    <div className='auth-container'>
      <SignInForm/>
      <SignUpForm/>
    </div>
  )
}

export default Auth
