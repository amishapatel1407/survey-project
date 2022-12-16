import {
  GET_USER_LIST,
  FAILED_USERLIST_Api
} from '../ActionTypes/ActionTypes'
import axios from 'axios'

export const Getuserlist = () => async (dispatch) => {

  // console.log("logindata=>",data);
  try {

    const UserList = await axios.get("http://localhost:4000/users");

    dispatch({

      type: GET_USER_LIST,

      payload: UserList.data,

    });

  } catch (error) {

    dispatch({

      type: FAILED_USERLIST_Api,

      payload: console.log(error)

    });

  }
}