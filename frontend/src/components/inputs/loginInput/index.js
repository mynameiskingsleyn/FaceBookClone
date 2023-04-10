import './style.css';
import React from 'react';
import { useField, ErrorMessage } from "formik";
import { useMediaQuery } from "react-responsive";

export default function LoginInput({ placeholder, type, bottom, ...props }) {
    const [field, meta] = useField(props);
    const desktopView = useMediaQuery(
        {query:"(min-width: 850px)",}
    );
    return (
        <div className="input_wrap">
            {
                meta.touched && meta.error && !bottom && (
                <div className=
                {desktopView ? "input_error input_error_desktop" : "input_error"} style={{
                    transform: "translateY(5px)"
                }}>
                    { meta.touched && meta.error  && <ErrorMessage name={field.name} />}
                    { 
                    meta.touched && meta.error  &&  (
                        <div className={desktopView ? "error_arrow_left" :"error_arrow_top"}> </div>
                    )
                    }
                </div> 
                )
            }
            
            
        
            <input className={meta.touched && meta.error ? 'input_error_border' : ''}
            type = {type}  
            placeholder={placeholder} {...field}
            onChange={props.onChange}
            />
            {meta.touched && meta.error && (
            <i className='error_icon' style={{top: `${!bottom && !desktopView ? "62%" : "16px"}`}}></i>
            )}
            {
                meta.touched && meta.error && bottom && (
                <div className={desktopView ? "input_error input_error_desktop" : "input_error"}>
                    { meta.touched && meta.error  && <ErrorMessage name={field.name} />}
                    { meta.touched && meta.error  &&  (
                        <div className={desktopView ? "error_arrow_left" : "error_arrow_bottom"}> </div>
                    )}
                </div> 
                )
            }

        </div>
  )
}
