import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import SubmitEditForm from './SubmitEditForm'
import { PlaceorderImg } from '../../../../images';
import Editvalidate from './EditFormvalidation';
export default function Edituser(props) {

    const userLists = useSelector((state) => state?.USerListReducer)
    const userlist1 = userLists?.UserList.filter((fdata) => fdata.role !== 'admin')
    const { setShowEdit, showedit } = props
    const Editdata = showedit
    const [file, setFile] = useState()
    console.log("file======>", file);
    const [error, setError] = useState(false)
    const imageupload = React.createRef(null)
    const uploadedimg = React.createRef(null)
    const { values, handleOnchange, handlesubmit, errors, isSubmitting } = SubmitEditForm(Editdata, file, setShowEdit, Editvalidate)

    console.log("values===============>", values);


    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                setShowEdit(false)
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])




    const Handleimagechange = (e) => {
        console.log(e.target.files);
        const imagefile = e.target.files[0]
        // setFile(imagefile)
        console.log("imagefile", imagefile);
        if (!imagefile) {
            setError(true);
            setError("Please select image.");
            // setFile(null)
            return false;
        }

        if (imagefile?.size > 375000) {
            setError('select valid size of image')
            setFile(null)
            return false

        }


        if (!imagefile?.name.match(/\.(jpg|jpeg|png)$/)) {
            setError('Please select valid image type')
            setFile(null)
            return false

        }

        else {
            setError(false)
        }
        if (imagefile) {
            const reader = new FileReader();
            const { current } = uploadedimg;
            current.file = imagefile;
            reader.onload = (e) => {
                current.src = e.target.result;


            };
            reader.readAsDataURL(imagefile);
        }
        setFile(imagefile)


    }

    return (
        <div>
            <div className='form-popup' id='form'>
                <h4 className="adduser-text">Edit user</h4>
                <hr />
                <div className='upload-img-file'>
                    <label htmlFor="file">
                        <div className="add-media" >
                            <i className="plus icon"></i>
                            <input ref={imageupload} type="file" id="file" name='image_src' style={{ display: 'none' }} accept="image/*" onChange={Handleimagechange} />
                            {values.image_src ?
                                (<img ref={uploadedimg} src={file ? file : `http://localhost:4000/${values?.image_src}`} alt="" style={{ width: '80px', height: '80px' }} />) :

                                (<img ref={uploadedimg} src={file ? file : PlaceorderImg} alt='' style={{ width: '80px', height: '80px' }} />)}


                        </div>
                        {error && (<p className='danger'>{error}</p>)}
                    </label>
                    <div>
                        <p><b>Select display images to show</b></p>
                        <p>      Image should be of following formats only, .jpeg, jpeg, .png,
                            Maximum allowed image size is 300kb </p>
                    </div>


                </div>
                <form method="post">
                    <div className='form-inputs'>
                        <div className='Row'>
                            <div className='first1'>
                                <label htmlFor="">First Name</label>
                                <br />
                                <input type="text" value={values.name || ''} name='name' placeholder='Enter First Name' onChange={handleOnchange} required />
                                {isSubmitting ? errors.name && (<p className="danger">{errors.name}</p>) : ''}
                            </div>
                            <div className='first1'>
                                <label htmlFor="">Last Name</label>
                                <br />
                                <input type="text" name='last_name' value={values.last_name ||
                                    ''} placeholder='Enter Last Name' onChange={handleOnchange} required />
                                {isSubmitting ? errors.last_name && (<p className="danger">{errors.last_name}</p>) : ''}
                            </div>
                        </div>
                        <div className='form-inputes-other'>
                            <div className='inputes'>
                                <label htmlFor="">Email Address</label>
                                <br />
                                <input type="text" name='email' value={values.email || ''} placeholder='Enter email' onChange={handleOnchange} required />
                                {isSubmitting ? errors.email && (<p className="danger">{errors.email}</p>) : ''}
                            </div>
                            <div className='inputes'>
                                <label htmlFor="">Phone Number</label>
                                <br />
                                <input type="tel" name='phone' value={values.phone || ''} placeholder='Enter Phone Number' onChange={handleOnchange} required />
                                {isSubmitting ? errors.phone && (<p className="danger">{errors.phone}</p>) : ''}
                            </div>
                            <div className='inputes'>
                                <label htmlFor="">Designation</label>
                                <br />
                                <select name="role_id" id="role" value={values.role_id} onChange={handleOnchange} required >
                                    <option >Select from dropdown</option>
                                    <option value={3}>Worker</option>
                                    <option value={2}>supervisior</option>
                                </select>

                            </div>
                            <div className='inputes'>
                                <label htmlFor="">Reporting to</label>
                                <br />
                                <select value={values.reporting_person_id} name="reporting_person_id" id="reporting" onChange={(e) => handleOnchange(e)} required>

                                    <option value="">Select from dropdown</option>
                                    {values.role_id == parseInt(3) ?
                                        userlist1.map((data, id) => {
                                            if (data.role_id == parseInt(2)) {
                                                return (
                                                    <option value={data.id} key={id}>{data.name}</option>
                                                )

                                            }

                                        }) : <option value={0}></option>
                                    }

                                </select>
                            </div>
                        </div>
                        <div className='Row'>
                            <div className='first1'>
                                <label htmlFor="">PassWord</label>
                                <br />
                                <input type="password" name='password' value={values.password} onChange={handleOnchange} required />
                                {isSubmitting ? errors.password && (<p className="danger">{errors.password}</p>) : ''}
                            </div>
                            <div className='first1'>
                                <label htmlFor="">Confirm Password</label>
                                <br />
                                <input type="password" name='confirmPassword' onChange={handleOnchange} required />
                                {isSubmitting ? errors.confirmPassword && (<p className="danger">{errors.confirmPassword}</p>) : ''}
                            </div>
                        </div>



                    </div>

                </form>

                <hr />
                <div className='form-btn'>
                    <button className='button1' onClick={() => setShowEdit(false)}>Cancel</button>

                    <button className='button2' type='submit' onClick={handlesubmit}>Create</button>

                </div>

            </div>

        </div>
    )
}
