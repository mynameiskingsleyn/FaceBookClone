import './style.css';
import React from 'react';
import { useField, ErrorMessage } from "formik";
import { useMediaViews } from '../../../utils/customHooks/mediaViews';

export default function RegisterInput({ placeholder, type, bottom, ...props }) {
    const [field, meta] = useField(props);
    
    const [mobileView, tabletView, desktopView] = useMediaViews();
    const text1 = desktopView && field.name === "first_name";
    const text2 = desktopView && field.name === "last_name";
    return (
        <div className="input_wrap register_input_wrap">
            <input className={meta.touched && meta.error ? 'input_error_border' : ''}
            style={{
                whidth:`${
                    mobileView && (field.name === "first_name" || field.name === "last_name")
                    ? "100%"
                    : mobileView && (field.name === "email" || field.name === "password")
                    ? "370px"
                    : "300px"
                }`
            }}
            type = {type}  
            placeholder={placeholder} {...field}
            onChange={props.onChange}
            />
            {meta.touched && meta.error && (
            <i className='error_icon'></i>
            )}
            {
                meta.touched && meta.error && (
                <div className={desktopView ? "input_error input_error_desktop" : "input_error"}
                    style={{ transform: "tranlateY(2px)", left: `${text1 ? "" : text2 ? "107%" : ""}`}}
                    >
                    { meta.touched && meta.error  && <ErrorMessage name={field.name} />}
                    { meta.touched && meta.error  &&  (
                        <div className={
                            (mobileView || tabletView) ? "error_arrow_bottom" : 
                             desktopView && field.name==="last_name" ? "error_arrow_right" : "error_arrow_left"
                            
                        
                        }> </div>
                    )}
                </div> 
                )
            }

        </div>
  )
}
