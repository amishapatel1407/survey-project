import { useState, useEffect, useCallback } from 'react';
import { EdituserAction } from '../../../../Redux/Action/EdituserAction'
import Editvalidate from './EditFormvalidation'
import { useDispatch } from 'react-redux'
import { PlaceorderImg } from '../../../../images';
const SubmitEditForm = (Editdata, file, setShowEdit) => {
    const [values, setvalues] = useState(Editdata)
    console.log("values=======>", values);
    const [errors, setErrors] = useState({});
    console.log("errors======>", !errors);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const newimg = file || values.image_src
    const reporting_person_id = values.reporting_person_id || 0

    const dispatch = useDispatch()


    const handlesubmit = () => {
        const formData = new FormData();
        setErrors(Editvalidate(values, setShowEdit))
        setIsSubmitting(true)
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("role_id", values.role_id);
        formData.append("password", values.password);
        formData.append("phone", values.phone);
        formData.append("reporting_person_id", reporting_person_id);
        formData.append("confirmPassword", values.confirmPassword);
        formData.append("image_src", newimg);
        formData.append("last_name", values.last_name);


        if (values.name !== '' && values.last_name !== ''  && values.phone !== '' && values.email !==  '' && values.password !== ''  ) {

            dispatch(EdituserAction(formData, values.id))
            window.location.reload()
        }

    }




    const handleOnchange = useCallback(
        (e) =>
            setvalues((values) => {


                const newValues = { ...values, [e.target.name]: e.target.value };
                setErrors(Editvalidate(newValues));//set other state while in a callback
                return newValues;

            }),
        []
    );

    return {
        handleOnchange,
        handlesubmit,
        values,
        errors,
        isSubmitting
    }
};

export default SubmitEditForm;