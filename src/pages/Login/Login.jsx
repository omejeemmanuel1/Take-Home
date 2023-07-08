import React from 'react'
import LoginForm from '../../components/Login/LoginForm';
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

const Login = () => {
  return (
    <div>
        <Header />
        <LoginForm/>
        <Footer />
    </div>
  )
}

export default Login