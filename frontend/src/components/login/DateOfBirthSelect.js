import React from 'react';
import { monthEnum } from "../../utils/const";
import { useMediaViews } from '../../utils/customHooks/mediaViews';
export default function DateOfBirthSelect(props){
    const {bYear, bMonth, handleInputChange, dateError } = props;
    const yearTemp = new Date().getFullYear();
    const years = Array.from(new Array(108),(val, index)=> yearTemp - index);
    const months = Array.from(Array(12), (val, index) => 1 + index );
    const monthFromNumb = (index) => {
        return monthEnum[index] ? monthEnum[index] : "not found";
    }
    const getDays = () => {
        return new Date(bYear, bMonth, 0).getDate();
    };
    const [ desktopView ] = useMediaViews();
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
    return(
        <div className="reg_col">
            <div className="reg_line_header">
                Date of birth <i className="info_icon"> </i>
            </div>
            <div className="reg_grid"
                style={{ marginBottom: `${dateError && !desktopView ? "90px" : "0"}` }}
            >
                <select name="bDay" value={props.bDay}
                onChange={handleInputChange}>
                    {   days.map((day, i) => (
                        <option value={day} key={i}>
                            {day}    
                        </option>
                    ))
                        
                    }
                </select>
                <select name="bMonth" value={props.bMonth}
                onChange={handleInputChange}>
                    {
                        months.map((month, i) => (
                            <option value={parseInt(month)} key={i}>{ monthFromNumb(month)}</option>
                        ))
                    }
                </select>
                <select name="bYear" value={props.bYear}
                onChange={handleInputChange}>
                    {
                        years.map((year, i) =>(
                            <option value={year}
                            key={i}>{year} </option>
                        ))
                    }
                </select>
                {
                    dateError && <div className={ !desktopView ? "input_error" : "input_error input_error_select_large"}  >
                        <div className={!desktopView ? "error_arrow_bottom" : "error_arrow_left"}></div>
                        {dateError} 
                    </div>
                }
            </div>
        </div>
    )
}