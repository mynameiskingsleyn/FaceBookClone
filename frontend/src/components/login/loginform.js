
import React, {useState} from 'react';
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from '../inputs/loginInput';
import * as Yup from 'yup';


const loginInfo = {
    email: "",
    password:""
};
export default function Loginform() {
    const [login, setLogin] = useState(loginInfo);
    const {email, password } = login;

    const handleLoginChange = (e) => {
        const {name, value } = e.target;
        setLogin({...login, [name]: value});
    }
    const loginvalidation = Yup.object({
        email:Yup.string().required("Email address is required")
        .email("Email must be valid!").max(100),
        password: Yup.string().required()
    })
  return (
    <div className="login_wrap">
                <div className="login_1">
                <img src="../../icons/facebook.svg" alt="" />
                    <span>
                    Facebook helps you connect and share with the people in your life.
                    </span>
                </div>
                <div className="login_2">
                    <div className="login_2_wrap">
                        <Formik
                            enableReinitialize
                            initialValues={{
                                email,
                                password
                              }}
                              validationSchema={loginvalidation}
                        >
                            {(formik) => (
                                <Form>
                                    <LoginInput type="text" name="email"
                                    placeholder="Email address or Phone number
                                    "
                                    onChange={handleLoginChange}/> 
                                    <LoginInput type="password" name="password"
                                    placeholder="password"
                                    onChange={handleLoginChange}
                                    bottom
                                    /> 
                                <button type="submit" className="blue_btn">
                                        Log In
                                    </button>
                                </Form>                         
                            )}
                        </Formik>
                        <Link to="/forgot" className="forgot_password"> Forgot password </Link>
                        <div className="sign_splitter"></div>
                        <button className="blue_btn open_signup"> Create Account </button>
                    </div>
                    <Link to="/" className="sign_extra">
                    <b>Create a Page</b> for a celebrity, brand or business.
                    </Link>

            </div>
    </div>
  )
}