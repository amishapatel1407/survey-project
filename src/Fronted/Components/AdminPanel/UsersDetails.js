import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './UsersDetails.css'
import { PlaceorderImg, editIcon } from '../../../images/index'
import AdduserForm from './Adduser/AdduserForm'
import Edituser from './Edituser/Edituser'
import { deleteIcon } from '../../../images/index'
import { DeleteUserAction } from '../../../Redux/Action/DeleteUserAction'
import { useEffect } from 'react'
export default function UsersDetails() {
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const [showedit, setShowEdit] = useState(false)
    const userLists = useSelector((state) => state?.USerListReducer)
    console.log("data====>", userLists?.UserList);
    console.log("FailedFormData", userLists?.FailedFormData);
    const userlist1 = userLists?.UserList.filter((fdata) => fdata.role !== 'admin')
    console.log("userlist1", userlist1);

    const handlesubmit = (values) => {
        console.log("vaalues------>", values);
    }

    const HandleDeleteuser = (id) => {
        const deleteconfirmBox = window.confirm(' Are  you sure want delete?')
        if (deleteconfirmBox === true) {
            dispatch(DeleteUserAction(id))
            window.location.reload()

        }
    }


    const closeModel = () => {

        setshow(false)
    }

    return (
        <div >
            <div className={show || showedit ? 'btn1' : 'btn'}>
                <button disabled={showedit} onClick={() => setshow(true)}> {`+`} Add new </button>
            </div>
            {show ? <AdduserForm show={show} setshow={setshow} onsubmit={handlesubmit} userlist1={userlist1} /> : ''}
            {showedit ? <Edituser setShowEdit={setShowEdit} showedit={showedit} /> : ''}
            {window.scroll(0, 0)}

            <div onClick={closeModel} className={show || showedit ? 'adminpannelwrapper1' : 'adminpannelwrapper'}>

                {userlist1?.map((udata) => (
                    <div class="card">
                        <div className='userimages'>
                            {udata?.image_src ?
                                <img src={`http://localhost:4000/${udata?.image_src}`} alt='' style={{ width: '80px', height: '80px' }} /> :
                                <img src={PlaceorderImg} alt='' style={{ width: '80px', height: '80px' }} />}
                        </div>
                        <div class="container">
                            <div className='name'>
                                <h4 ><b>{udata.name}</b></h4>
                            </div>
                            <div className='footer'>

                                {udata.reporting_person_name == null ?
                                    <div className='role'>

                                        <b>{udata.role
                                        }</b>
                                    </div> : <div className='role'>
                                        <p>Reporting to</p>
                                        <b>{udata.reporting_person_name
                                        }</b>
                                    </div>
                                }


                                <div className='editicon' >
                                    <button style={{
                                        backgroundColor: 'white',
                                        border: 'hidden'
                                    }
                                    } onClick={() => setShowEdit(udata)} disabled={show}>

                                        <img src={editIcon} alt='edit' />
                                    </button >

                                </div>
                                <button className='deleteicon'
                                    style={{
                                        backgroundColor: 'white',
                                        border: 'hidden'
                                    }}
                                    onClick={() => HandleDeleteuser(udata.id)}>
                                    <img src={deleteIcon} alt="deleteicon" />
                                </button>

                            </div>
                        </div>
                    </div>


                )
                )}
            </div>
        </div>

    )
}
