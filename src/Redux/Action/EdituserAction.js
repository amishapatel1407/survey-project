import {UPDATE_USER_DATA} from '../ActionTypes/ActionTypes'
import axios from 'axios';

export const EdituserAction = (data,id) => async (dispatch) => {
    console.log("dataaaaaaa",id);
        
      
          const res = await axios.put( `http://127.0.0.1:4000/edit/${id}`, data );
      
          dispatch({
      
            type: UPDATE_USER_DATA,
      
            payload: { data: res.data },
            
          });
      
        } 