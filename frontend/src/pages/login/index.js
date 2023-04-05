import './style.css';
import React from 'react';
import Loginform from "../../components/login/loginform";
import RegisterForm from "../../components/login/RegisterForm";
import Footer from "../../components/login/Footer";

export default function Login() {
    
  return (
    <div className="login">
        <div className="login_wrapper">
             <Loginform />
             <RegisterForm />
            <Footer />
            
            
        </div>
    </div>
  )
}
