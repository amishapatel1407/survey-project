import React, { useEffect, useState } from 'react'
import './Login.css'
import { SurveyLogin } from '../../../images/index'
import { LoginApi } from '../../../Redux/Action/SurveyData'
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';

export default function Login(props) {
    const { setIsLoggedIn, isLoggedIn, isAllowed } = props
    const allsurveydata = useSelector((state) => state?.SurveyDataReducer)
    const loading = allsurveydata?.loading
    const logindata = allsurveydata?.Loginresponce


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)

    const data = {
        email: email,
        password: pass
    }

    const handlesubmit = () => {
        console.log("loginpage");
        const allowed = true
        localStorage.setItem('Isallowed', allowed)
        const admin = 'Admin'
        localStorage.setItem('AdminPage', admin)

        localStorage.setItem('data', JSON.stringify({
            id: '1',
            name: 'robin',
            permissions: ['analyze'],
            roles: ['admin'],
        }))
        localStorage.setItem('email', email)
        const data1 = JSON.parse(localStorage.getItem('data'))
        window.scroll(0, 0)
        console.log("login");
        setIsLoggedIn(data1)
        dispatch(LoginApi(data
        ))


    }
    const isallowed1 = localStorage.getItem("Isallowed")
    const admin1 = localStorage.getItem('AdminPage')

    useEffect(() => {
        console.log("logindata============>", logindata);
        if (logindata.email === email && logindata.role_id === 2) {

            toast.classList.add("active");
            progress.classList.add("active");
            setTimeout(() => {
                toast.classList.remove("active");
            }, 1000)

            setTimeout(() => {
                progress.classList.remove("active");
            }, 1000)
            setTimeout(() => {
                if (isallowed1) {

                    navigate('/home')
                }

            }, 1000)
        }

        else if (logindata.role_id === 1) {
     
            if (admin1) {
                navigate('/adminpage')
            }
        }
        else if (allsurveydata?.FailedLogin?.message) {
            window.localStorage.clear()
            setTimeout(() => {
                if (admin1) {
                    navigate('/')

                }
            }, 1000);

            failedtoast.classList.add("active");
            redprogress.classList.add("active");

            setTimeout(() => {
                failedtoast.classList.remove("active");
            }, 5000)

            setTimeout(() => {
                redprogress.classList.remove("active");
            }, 5300)

        }


    }, [allsurveydata, isallowed1])

    useEffect(() => {
        if (isallowed1) {
            navigate('/home')

        }
        if (admin1) {
            navigate('/adminpage')
        }
    }, [])

    var toast = document.querySelector(".toast");
    var progress = document.querySelector(".progress");
    var failedtoast = document.querySelector('.failedtoast')
    var redprogress = document.querySelector('.redprogress')


    const closetoast = () => {
        toast.classList.remove("active");

        setTimeout(() => {
            progress.classList.remove("active");
        }, 1000)
    }

    const closefailedtoast = () => {
        failedtoast.classList.remove("active");

        setTimeout(() => {
            redprogress.classList.remove("active");
        }, 1000)
    }

    return (
        <div>

            <div className="toast">
                <div className="toast-content">
                    <i className="uil uil-check toast-check"></i>
                    <div className="message">
                        <span className="message-text text-1">Success</span>
                        <span className="message-text text-2">Your Login Successfully</span>
                    </div>
                </div>
                <button style={{ border: 'none', backgroundColor: 'white' }} onClick={closetoast} className="uil uil-multiply toast-close">X</button>
                <div className="progress"></div>
            </div>



            <div className="failedtoast">
                <div className="failedtoast-content">
                    <i className="uil uil-check failed-toast-check"></i>
                    <div className="message">
                        <span className="message-text text-1">{allsurveydata?.FailedLogin?.status}</span>
                        <span className="message-text text-2">{allsurveydata?.FailedLogin?.message}</span>
                    </div>
                </div>
                <button style={{ border: 'none', backgroundColor: 'white' }} onClick={closefailedtoast} className="uil uil-multiply toast-close">X</button>
                <div className="redprogress"></div>
            </div>





            <div className='logingpage'>
                <h2>Login</h2>
                <div className='loginform'>

                    <label htmlFor="" ><h4>Email:</h4> </label>

                    <input type="text" id='email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor=""><h4>Password:</h4> </label>

                    <input type="password" id='pass' onChange={(e) => setPass(e.target.value)} />
                    <div style={{ marginTop: 30, fontSize: 20, display: 'flex', justifyContent: "space-between" }}>
                        <div>
                            <a href='' >Reset password</a>
                        </div>
                        <div>
                            <a href='/registration' >Sign Up</a>
                        </div>
                    </div>
                    <div className='loginbtn'>
                        <button onClick={handlesubmit}>Login</button>
                    </div>
                </div>

            </div>
            <div className='surveyimage'>
                <img src={SurveyLogin} alt="Surveyimage" />
            </div>
        </div>
    )
}
