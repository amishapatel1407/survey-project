import { SURVEY_DATA, FAILED_SURVEY_API, LOGIN, LOGIN_ERROR, SELECTED_DATA, SUBMIT_DATA, FAILED_SUBMISSION } from '../ActionTypes/ActionTypes'
import axios from 'axios';

export const LoginApi = (data) => async (dispatch) => {
  try {

    const res = await axios.post("http://localhost:4000/login ", data);

    dispatch({

      type: LOGIN,

      payload: { data: res.data },

    });

  } catch (error) {

    dispatch({

      type: LOGIN_ERROR,

      payload: { data: error.response.data },

    });

  }
}

export const GetSurveyData = (uuid, id) => async (dispatch) => {
  console.log("uuid1====>", uuid, id);

  try {
    const surveyApi = await axios.get(id ? `http://127.0.0.1:4000/survey/data/${uuid}?wuuid=${id}` : `http://127.0.0.1:4000/survey/data/${uuid}`)
    dispatch({
      type: SURVEY_DATA,
      payload: surveyApi.data
    })
  }
  catch (error) {

    dispatch({

      type: FAILED_SURVEY_API,

      payload: console.log(error)

    });

  }

}
export const SelectedData = (data) => async (dispatch) => {
  dispatch({
    type: SELECTED_DATA,
    payload: data
  })
}


export const SubmitData = (data) => async (dispatch) => {
  console.log("finalsubmitdata", data);
  try {

    const res = await axios.post("http://localhost:4000/survey/submission", data);

    dispatch({

      type: SUBMIT_DATA,

      payload: { data: res.data },

    });

  } catch (error) {

    dispatch({

      type: FAILED_SUBMISSION,

      payload: { data: error },

    });

  }
}