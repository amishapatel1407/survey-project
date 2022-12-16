const validate = (values, setshow, faileddata) => {
  console.log("failed-faileddata========>", faileddata);



  let errors = {};
  if (!values.name) {
    errors.name = 'firstname is required';
  }
  if (!values.last_name) {
    errors.last_name = 'lastname is required';
  }
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  else if (faileddata?.message && faileddata?.statusCode == '400') {
    errors.email = faileddata?.message

  }
  if (!values.phone) {
    errors.phone = 'phone number is required';
  }
  else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phone)) {
    errors.phone = 'phone number is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  else if (values.password.length < 6) {
    errors.password = 'Password must be 6 or more characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm password is Not Matched with password';

  } else {

    // setshow(false)

  }
  return errors;
}
export default validate;