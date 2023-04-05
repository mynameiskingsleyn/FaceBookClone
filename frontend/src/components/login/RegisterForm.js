import React, {useState} from 'react';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import RegisterInput from "../inputs/registerInput";
import {signUpAge, monthEnum } from "../../utils/const";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from  "react-spinners/DotLoader";


const userInfo = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

export default function RegisterForm() {
    
    const [user, setUser] = useState(userInfo);

    const {
        first_name, last_name, email, password, bYear, bMonth, bDay, gender
    } = user;


    const handleInputChange = (e) => {
        const {name, value} = e.target; 
        setUser({ ...user, [name]: value});
    }

    
   
    const registrationValidation = Yup.object({
        first_name: Yup.string().required('first name is required')
            .min(2, "First name must be between 2 and 16 characters")
            .max(6,"First name must be between 2 and 16 characters")
            .matches(/^[aA-zZ]+$/, "Numbers, spaces and special charachters is not allowed."),
        last_name: Yup.string().required('last name is required')
            .min(2, "last name must be between 2 and 16 characters")
            .max(6,"Last name must be between 2 and 16 characters")
            .matches(/^[aA-zZ]+$/, "Numbers, spaces and special charachters is not allowed."),
        email: Yup.string().required("You'l need this for loging.")
            .email("Enter a valid email address"),
        password: Yup.string().required("password is required")
            .min(6,"Password must be atleast 6 characters long")
            .max(12,"Password must be less than or equal to 12 characters or special characters")
    })
    
    const [dateError, setDateError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const registerSubmit = async () => {
        try {

        } catch (error) {

        }
    }
  return (
    <div className="blur"> 
        <div className="register">
            <div className="register_header">
                <i className="exit_icon"></i>
                <span>Sign Up</span>
                <span>it's quick and easy</span>
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                  first_name,
                  last_name,
                  email,
                  password,
                  bYear,
                  bMonth,
                  bDay,
                  gender,
                }}
                validationSchema = {registrationValidation}
                onSubmit = { () => {
                    
                    
                    let currentDate = new Date();
                    let pickedDate = new Date(bYear, bMonth-1, bDay);
                    let minAge = new Date(1970 + signUpAge.min, 0, 1);
                    let maxAge = new Date(1970 + signUpAge.max, 0, 1);
                    if(currentDate - pickedDate < minAge ) {
                        setDateError(`It looks like you entered a wrong date!! must be atleast ${signUpAge.min} to use app`);
                    }else if(currentDate - pickedDate > maxAge ) {
                        setDateError(`It looks like you entered a wrong date!! must be less than ${signUpAge.max + 1} to use app`);
                    } else{
                        setDateError("");
                    }

                    if( gender ==="") {
                        setGenderError(
                            "Please choose a gender. You can change who can see this later."
                          );
                    } else {
                        setGenderError("");
                    }
                    if (dateError.length < 1 && genderError.length < 1) {
                        registerSubmit();
                    }
                    console.log(pickedDate);
                }}
             >
                {
                    (formik) => (
                        <Form className="register_form">
                            <div className="reg_line">  
                                <RegisterInput 
                                    type="text"
                                    placeholder="First name"
                                    name="first_name"
                                    onChange={handleInputChange}
                                />
                                <RegisterInput
                                    type="text"
                                    placeholder="Lastname"
                                    name="last_name"
                                    onChange={handleInputChange}
                                    />
                            </div>
                            <div className="reg_line">
                                <RegisterInput
                                type="text"
                                placeholder="Mobile number or email address"
                                name="email"
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="reg_line">
                                <RegisterInput
                                type="password"
                                placeholder="New password"
                                name="password"
                                onChange={handleInputChange}
                                />
                            </div>
                            <DateOfBirthSelect 
                                bMonth={bMonth}
                                bDay={bDay}
                                bYear={bYear}
                                handleInputChange={handleInputChange}
                                dateError={dateError} />
                            <GenderSelect 
                                 handleInputChange={handleInputChange}
                                 genderError={genderError}
                            />
                            <div className="reg_infos">
                                By clicking Sign Up, you agree to our{" "}
                                <span>Terms, Data Policy &nbsp;</span>
                                and <span>Cookie Policy.</span> You may receive SMS
                                notifications from us and can opt out at any time.
                            </div>
                            <div className="reg_btn_wrapper">
                                <button className="blue_btn open_signup" 
                                type="submit"> 
                                    Sign Up 
                                </button>
                            </div>
                            <DotLoader
                                color="#1876f2"
                                loading={loading}
                                size={30}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                            {error && <div className="error_text"> {error} </div>}
                            {success && <div className="success_text"> {success} </div>}
                        </Form>
                    )   
                }
            </Formik>
        </div>    
    </div>
  )
}
