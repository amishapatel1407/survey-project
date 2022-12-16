import React, { useState, useEffect } from 'react'
import './AdduserForm.css'
import useForm from './UseForm'
import validate from './FormValidation'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AdduserForm(props) {
    const { setshow, show, userlist1 } = props
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const [error, setError] = useState(false)
    const imageupload = React.createRef(null)
    const uploadedimg = React.createRef(null)
    const faileddata = useSelector((state) => state?.USerListReducer?.FailedFormData)
    const { values, handleOnchange, handlesubmit, errors, isSubmitting } = useForm(file, validate, setshow, uploadedimg)
    console.log("isSubmitting=======>", isSubmitting);

    const title = show ? 'Add user' : 'Registration Form'

    useEffect(() => {
        function handleEscapeKey(event) {
            if (event.code === 'Escape') {
                setshow(false)
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [])

    const handleimgchange = (e) => {

        console.log(e.target.files);
        const imagefile = e.target.files[0]
        console.log("imagefile", imagefile);
        if (!imagefile) {
            setError(true);
            setError("Please select image.");
            setFile(null)
            return false;
        }

        if (imagefile?.size > 307200) {
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
                <h3 className="adduser-text">{title}</h3>
                <hr />
                <div className='upload-img-file'>
                    <label htmlFor="file">
                        <div className="add-media" >
                            <i className="plus icon"></i>
                            <input ref={imageupload} type="file" id="file" name='image_src' style={{ display: 'none' }} onChange={handleimgchange} accept="image/*" />
                            <img ref={uploadedimg} src={file} alt="" style={{ width: '80px', height: '80px' }} />


                        </div>
                        {error && (<p className='danger'>{error}</p>)}
                    </label>
                    <div>
                        <p><b>Select display images to show</b></p>
                        <p>      Image should be of following formats only, .jpeg, jpeg, .png,
                            Maximum allowed image size is 300kb </p>
                    </div>


                </div>
                <form >
                    <div className='form-inputs'>
                        <div className='Row'>
                            <div className='first1'>
                                <label htmlFor="">First Name</label>
                                <br />
                                <input type="text" name='name' placeholder='Enter First Name' onChange={handleOnchange} required />
                                {isSubmitting ? errors.name && (<p className="danger">{errors.name}</p>) : ''}
                            </div>
                            <div className='first1'>
                                <label htmlFor="">Last Name</label>
                                <br />
                                <input type="text" name='last_name' placeholder='Enter Last Name' onChange={handleOnchange} required />
                                {isSubmitting ? errors.last_name && (<p className="danger">{errors.last_name}</p>) : ''}
                            </div>
                        </div>
                        <div className='form-inputes-other'>
                            <div className='inputes'>
                                <label htmlFor="">Email Address</label>
                                <br />
                                <input type="text" name='email' placeholder='Enter email' onChange={handleOnchange} required />
                                {isSubmitting ? (<p className="danger">{errors.email}</p>) : ''}
                            </div>
                            <div className='inputes'>
                                <label htmlFor="">Phone Number</label>
                                <br />
                                <input type="tel" name='phone' placeholder='Enter Phone Number' onChange={handleOnchange} required />
                                {isSubmitting ? errors.phone && (<p className="danger">{errors.phone}</p>) : ''}
                            </div>
                            <div className='inputes'>
                                <label htmlFor="">Designation</label>
                                <br />
                                <select name="role_id" id="role" required onChange={handleOnchange}>
                                    <option value="">Select from dropdown</option>
                                    <option value={3}>Worker</option>
                                    <option value={2}>supervisior</option>


                                </select>

                            </div>
                            <div className='inputes'>
                                <label htmlFor="">Reporting to</label>
                                <br />
                                <select name="reporting_person_id" id="reporting" onChange={handleOnchange} required>

                                    <option value="">Select from dropdown</option>
                                    {values.role_id === '3' ?

                                        userlist1.map((data, id) => {


                                            if (data.role_id === 2) {
                                                return (
                                                    <option value={data.id} key={id}>{data.name}</option>
                                                )

                                            }


                                        })
                                        : ''}

                                </select>
                            </div>
                        </div>
                        <div className='Row'>
                            <div className='first1'>
                                <label htmlFor="">PassWord</label>
                                <br />
                                <input type="password" name='password' onChange={handleOnchange} required />
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
                    <button className='button1' onClick={() => { show ? setshow(false) : navigate('/') }}>Cancel</button>
                    <button className='button2' type='submit' onClick={() => handlesubmit()}>Create</button>

                </div>

            </div>
        </div>
    )
}
