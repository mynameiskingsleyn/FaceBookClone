
import React, {useState} from 'react';
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from '../inputs/loginInput';
import * as Yup from 'yup';
import DotLoader from  "react-spinners/DotLoader";
import axios from "axios";
import {useDispatch} from 'react-redux';
import Cookies from "js-cookie";
import {useNavigate } from "react-router-dom";


const loginInfo = {
    email: "",
    password:""
};
export default function Loginform({setVisible}) {
    const [login, setLogin] = useState(loginInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email, password} = login;

    const handleLoginChange = (e) => {
        const {name, value } = e.target;
        setLogin({...login, [name]: value});
    }
    const loginvalidation = Yup.object({
        email:Yup.string().required("Email address is required")
        .email("Email must be valid!").max(100),
        password: Yup.string().required()
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const loginSubmit = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                email, password
            });
            setError("");
            if (data) { 
                dispatch({
                    type: "LOGIN",
                    payload: data
                });
                Cookies.set('user', JSON.stringify(data));
                navigate("/");
            } 
        }catch (error) {
            let message = error.message;
            if (error.response) {
                message = error.response.data.message;
            }
            setLoading(false);
            setError(message);
        }
    }
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
                              onSubmit = {() => {
                                loginSubmit();
                              }}
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
                                    <DotLoader
                                    color="#1876f2"
                                    loading={loading}
                                    size={30}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    />
                                    {error && <div className="error_text"> {error} </div>}   
                                    <button type="submit" className="blue_btn">
                                                    Log In
                                    </button>
                                </Form>                         
                            )}
                        </Formik>
                        <Link to="/forgot" className="forgot_password"> Forgot password </Link>
                        <div className="sign_splitter"></div>
                        <button className="blue_btn open_signup"
                        onClick={() => setVisible((prevState) => !prevState) }> Create Account </button>
                    </div>
                    <Link to="/" className="sign_extra">
                    <b>Create a Page</b> for a celebrity, brand or business.
                    </Link>

            </div>
    </div>
  )
}
