import React, { useEffect, useState } from 'react'
import './Survey.css'
import Footer from '../Footer/Footer'
import { righticon } from '../../../images/index'
import { GetSurveyData, SelectedData } from '../../../Redux/Action/SurveyData'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SubmitData } from '../../../Redux/Action/SurveyData'

export default function Survey(props) {
    const { setIsLoggedIn } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(1)
    const [test, setTest] = useState(null)
    const [review, setReview] = useState(null)
    const [ansData, setAnsData] = useState([])
    const [ans, setAns] = useState(null)
    const [changebgcolor, setChangebgcolor] = useState(false)
    const [wuuid, setWuuid] = useState(null)
    const surveydata = useSelector((state) => state?.SurveyDataReducer?.surveydata)
    console.log("  surveydata===========>", surveydata);
    const allsurveydata = useSelector((state) => state?.SurveyDataReducer)
    const login = allsurveydata?.Loginresponce
    console.log("login=>", login);
    const uuid = login?.uuid


    if (uuid) {
        localStorage.setItem('login_data', JSON.stringify(login))
    }
    const login_data = JSON.parse(localStorage.getItem('login_data'))
    console.log("logindta", login_data);


    useEffect(() => {

        dispatch(GetSurveyData(login_data?.uuid))
    }, [login_data?.uuid])


    const element = [{ ans: '1' },
    { ans: '2' },
    { ans: '3' },
    { ans: '4' },
    { ans: '5' },
    { ans: '6' },
    { ans: '7' },
    { ans: '8' },
    { ans: '9' },
    { ans: '10' }
    ]




    const date = new Date()
    const formattedDate = date.toLocaleDateString("en", {
        month: "long",
        year: "numeric"
    })

    const handleToggle = (id) => {
        // setExpanded(id)
        console.log("sdata_survey_id", id);
        setTest(id)

    }
    const setcolor = (ansId, qId, sId, e) => {
        console.log("ansId", ansId, 'qId', qId, 'sId', sId,)

        setAns(e.target.value)

        let existingAns = ansData.filter((ans) => ans.qid === qId);
        if (existingAns.length > 0) {
            existingAns.forEach((f) => {
                let ansDataInd = ansData.findIndex((e) => e.qid === f.qid);
                ansData[ansDataInd].ans = ansId;
            });
            setAnsData([...ansData]);
        } else {
            ansData.length === 0
                ? setAnsData([{ qid: qId, ans: ansId, sId: sId }])
                : setAnsData((ansData) => [...ansData, { qid: qId, ans: ansId, sId: sId }]);
        }

    }
    const SaveData = (SurveyId) => {
        console.log("Ansdataaaaaaaaa", ansData, 'comment', review, "Survey_Id", SurveyId);
        dispatch(SelectedData({
            AnsData: ansData,
            comment: review,
            Survey_Id: SurveyId

        }))
        console.log(" login_data?.uuid===>", login_data?.uuid);
        dispatch(SubmitData({
            uuid: login_data?.uuid,
            wuuid: wuuid,
            surveydata: surveydata
        }))


        setTest(SurveyId)
        let ref = SurveyId + 1
        console.log("ref==>", ref);

        setExpanded(ref)
        setReview('')
        setChangebgcolor(!changebgcolor)



    }
    console.log("expanded=>", expanded);

    const reviewHandlechange = (e) => {
        console.log("e.target.value", e.target.value);
        setReview(e.target.value)


    }
    const handleChange = (e) => {
        setWuuid(e.target.value)
        console.log("amisha");
        dispatch(GetSurveyData(
            login_data?.uuid,
            e.target.value
        ))
        setAnsData([])
        setExpanded(1)
    }

    const handleMysurvey = (uuid) => {
        console.log("may surveyid", uuid);
        dispatch(GetSurveyData(uuid))
    }

    const logoutbtn = () => {

        const isallowed1 = window.localStorage.getItem("Isallowed")
        console.log("isallowed1======>", !!isallowed1);
        setIsLoggedIn(null)
        // window.localStorage.clear()
        if (!!isallowed1) {
            navigate('/home')
        }
    }
    return (

        <div className='contentwrapper'>

            <div>
                <div className='display-month'>
                    <h1>{formattedDate}</h1>
                </div>


                <div className='workerList'>
                    <button className='mysurvey' onClick={() => handleMysurvey(login_data?.uuid)}>My survey</button>
                    <select onChange={handleChange} >
                        <option >select From dropdwon</option>
                        {login_data?.worker_data?.map((wdata) => (

                            <option value={wdata.id}  >{wdata.name}</option>
                        ))}
                    </select>
                </div>
                {surveydata?.map((sdata, id) => (
                    <>

                        <button key={id} className={expanded < sdata.survey_id ? 'survey2' : 'survey1'} style={expanded - 1 < sdata.survey_id ? { backgroundColor: '#1A1A1A' } : { backgroundColor: '#11963E', border: ' 1px solid #11963E' }}
                            disabled={expanded < sdata.survey_id}
                            onClick={() => handleToggle(sdata.survey_id)}>
                            <div className='imgage'>
                                <img className='righticon' alt='righticon' src={righticon}></img>
                                <span>{sdata.title}   </span>
                            </div>
                            <div>
                                {expanded - 1 < sdata.survey_id ?
                                    <button className='savebtn' disabled={ansData.length < 5 || !review || (
                                        expanded > sdata.survey_id || expanded < sdata.survey_id)} onClick={() => SaveData(sdata.survey_id)}>Save</button> : <button className='savebtn' disabled={ansData.length < 5 || !review || (
                                            expanded > sdata.survey_id || expanded < sdata.survey_id)} onClick={() => SaveData(sdata.survey_id)}>Saved</button>
                                }
                            </div>
                        </button>
                        <div>
                            {expanded === sdata.survey_id ? <div className='quations'>
                                {sdata?.question?.map((Quetion, qId) => {

                                    return (
                                        <div >
                                            <div>
                                                <h4>{Quetion.question} </h4>
                                            </div>

                                            <div className='rate'>


                                                {element?.map((data, ansId) => {
                                                    let isactive = ansData.filter((qa) => qa.qid === Quetion.qid);
                                                    if (ansData.length === 5 && test === sdata.survey_id - 1) {
                                                        setAnsData([])
                                                        setTest(null)
                                                    }
                                                    let ansactive;

                                                    if (element.ans) {

                                                        ansactive = ansId <= element.ans ? "active" : "";

                                                    }

                                                    else
                                                        if (isactive.length > 0) {
                                                            ansactive =
                                                                ansId <= isactive[0].ans ? "active" : "";
                                                        }


                                                        else {
                                                            ansactive = ansId < Quetion.ans ? "active" : "";
                                                        }


                                                    return (

                                                        <div className='rating'>

                                                            <label >

                                                                <div className={`ratingblock ${ansId <= 3
                                                                    ? "red"
                                                                    : ansId >= 4 &&
                                                                        ansId <= 6
                                                                        ? "yellow"
                                                                        : "green "
                                                                    } ${ansactive}`}>

                                                                    <input type='radio' name={Quetion.qid} value={data.ans} onChange={(e) => setcolor(ansId, Quetion.qid, id, e)} />{data.ans}
                                                                </div>

                                                            </label>
                                                        </div>
                                                    )
                                                })}

                                                {console.log("sdatasdata.comment", sdata.comment)}
                                            </div>
                                        </div>
                                    )
                                })}
                                <div>
                                    <h4>Your review
                                    </h4>
                                </div>
                                <div className='review'>
                                    <textarea
                                        id='comment1'
                                        name='comment'
                                        key={sdata.comment}

                                        defaultValue={sdata.comment}
                                        onChange={reviewHandlechange}
                                    />
                                </div>


                            </div>
                                : ''}
                        </div>
                    </>

                ))}

                <Footer ansData={ansData} review={review} wuuid={wuuid} uuid={login_data?.uuid} />
            </div>
        </div>
    )
}
