import { useState, useEffect, useCallback } from 'react';
import { PostData } from '../../../../Redux/Action/PostUserData'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useForm = (file, validate, setshow) => {
  const faileddata = useSelector((state) => state?.USerListReducer?.FailedFormData)
  const statusCode = useSelector((state) => state?.USerListReducer?.statusCode)
  const dispatch = useDispatch()
  const callback = useCallback()
  const navigate = useNavigate()
  const [values, setvalues] = useState({})
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const reporting_person_id = values.reporting_person_id || 0



  const handlesubmit = () => {
    const formData = new FormData();
    setIsSubmitting(true)
    setErrors(validate(values, setshow))
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role_id", values.role_id);
    formData.append("password", values.password);
    formData.append("phone", values.phone);
    formData.append("reporting_person_id", reporting_person_id);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("image_src", file);
    formData.append("last_name", values.last_name);

    if (values.name && values.last_name && values.email && values.phone && values.password && values.confirmPassword) {
      dispatch(PostData(formData))

    }

  }


  useEffect(() => {
    setErrors(validate(values, setshow, faileddata))
    if (statusCode == 200) {
      alert("submitdata successfully")
      setshow(false)
      navigate('/')
    }

  }, [faileddata, statusCode])


  const handleOnchange = useCallback(
    (e) =>
      setvalues((values) => {
        const newValues = { ...values, [e.target.name]: e.target.value };
        setErrors(validate(newValues));
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

export default useForm;
