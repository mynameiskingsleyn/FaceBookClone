import './style.css';
import React, {useState} from 'react';
import Loginform from "../../components/login/loginform";
import RegisterForm from "../../components/login/RegisterForm";
import Footer from "../../components/login/Footer";

export default function Login() {
    const [visible, setVisible] = useState(false);
  return (
    <div className="login">
        <div className="login_wrapper">
             <Loginform setVisible = {setVisible}/>
             { visible && <RegisterForm setVisible = {setVisible} />}
            <Footer /> 
            
            
        </div>
    </div>
  )
}
