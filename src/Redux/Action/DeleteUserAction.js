import {DELETE_USER} from '../ActionTypes/ActionTypes'
import axios from 'axios';

export const DeleteUserAction = (id) => async (dispatch) => {
    console.log("deleteid",id);
        
      
          const res = await axios.delete(`http://localhost:4000/delete/${id}`);
      
          dispatch({
      
            type: DELETE_USER,
      
            payload: { data: res.data },
            
          });
      
        } 