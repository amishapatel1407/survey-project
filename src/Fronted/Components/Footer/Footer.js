import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { SubmitData } from '../../../Redux/Action/SurveyData'
import { useNavigate } from 'react-router-dom';
import './Footer.css'

export default function Footer(props) {
  const { ansData, review, wuuid, uuid } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()


  console.log("ansdatalength");
  const surveydata = useSelector((state) => state?.SurveyDataReducer?.surveydata)
  console.log("footersurveydata".surveydata);
  // const uuid = useSelector((state) => state?.SurveyDataReducer?.Loginresponce?.uuid)
  // console.log("uuid=>",uuid);

  const finish = () => {
    console.log("finished", surveydata);
    alert("Finished")
    dispatch(SubmitData({
      uuid: uuid,
      wuuid: wuuid,
      surveydata: surveydata
    }))
    navigate('/login')
    // window.location.reload(false)  


  }


  return (
    <div className='footerwrapper'>
      <div className='finish'>
        <button disabled={ansData.length < 5} onClick={finish}>Finish</button>
      </div>

    </div>
  )
}
