import './style.css';
import {React} from 'react';
import { useField } from "formik";
//import { useMediaQuery } from "react-responsive";

export default function LoginInput({ placeholder, type, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div className="input_wrap">
            <input 
            type = {type}  
            placeholder={placeholder} {...field}
            onChange={props.onChange}
            />

        </div>
  )
}
