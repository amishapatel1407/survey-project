import React from "react";
import { useSelector } from "react-redux";
import { Navigator, useNavigate } from "react-router-dom";
import { SurveryIcon, UserIcon, logout } from '../../../images/index'
import './Header.css'
function Header(props) {
    const { setIsLoggedIn } = props
    const navigate = useNavigate()
    const login = useSelector((state) => state?.SurveyDataReducer?.Loginresponce)
    const surveydata = useSelector((state) => state?.SurveyDataReducer?.surveydata)
    const login_data = JSON.parse(localStorage.getItem('login_data'))
    console.log("logindta", login_data);
    const admin1 = localStorage.getItem('AdminPage')
    console.log("admin1", admin1);

    const handleLogout = () => {
        const confirmBox = window.confirm('Are you sure  want  logout')
        if (confirmBox === true) {
            setIsLoggedIn(null)
            navigate('/')
            localStorage.clear()
            window.location.reload()
        }
        console.log("logout");
    }
    return (
        <div className="headerWrapper">
            <div className="header">
                <div className="content">
                    <img src={SurveryIcon} height={50}></img>
                    <h1>Survey</h1>
                </div>
                {!surveydata?.length > 0 ?
                    <div className="usericonwrapper">
                        <div className="rightmenu">
                            {admin1 ?
                                <>
                                    <span style={{ marginRight: 10 }}>LogOut</span>
                                    <img src={logout} alt='logout' className="logout" onClick={handleLogout}></img>
                                </>
                                : ''}
                        </div>
                    </div> : <div className="usericonwrapper">
                        <div className="rightmenu">
                            <span>hello {login_data?.name}</span>
                            <img src={UserIcon} alt="usericon" className="usericon"></img>
                            <span style={{ marginRight: 10 }}>LogOut</span>
                            <img src={logout} alt='logout' className="logout" onClick={handleLogout}></img>
                        </div>
                    </div>
                }


            </div>
        </div>
    )

}
export default Header