
import { useMediaViews } from '../../utils/customHooks/mediaViews';
export default function GenderSelect ({ handleInputChange, genderError }) {

    const [mobileView, tabletView, desktopView] = useMediaViews();
    return (
        <div className="reg_col">
            <div className="reg_line_header">
                    Gender <i className="info_icon"></i>
            </div>
            <div className="reg_grid"
            style={{ marginBottom: `${ genderError && !desktopView ? "90px" : "0"}` }}>
                <label htmlFor="male">
                    Male 
                    <input type="radio" name="gender" id="male" value="male" 
                    onChange={handleInputChange} 
                    />
                </label>
                <label htmlFor="female">
                    Female 
                    <input type="radio" name="gender" id="female" value="female" 
                    onChange={handleInputChange} 
                    />
                </label>
                <label htmlFor="custom">
                    Custom 
                    <input type="radio" name="gender" id="custom" value="custom" 
                    onChange={handleInputChange} 
                    />
                </label>
                {
                    genderError && <div className={ !desktopView ? "input_error" : "input_error input_error_select_large"} >
                        <div className={!desktopView ? "error_arrow_bottom" : "error_arrow_left"}></div>
                        {genderError} 
                        </div>
                }
            </div>
        </div>
    )
}