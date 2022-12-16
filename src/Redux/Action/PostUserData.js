import {POST_USER_DATA,FAILED_POST_USER_DATA} from '../ActionTypes/ActionTypes'
import axios from 'axios';

export const PostData = (data) => async (dispatch) => {
    console.log("postdata=>",data);
        try {
      
          const res = await axios.post( " http://localhost:4000/register ", data );
      
          dispatch({
      
            type: POST_USER_DATA,
      
            payload: { data: res.data },
            
          });
      
        } catch (error) {
            
          dispatch({
              
              type: FAILED_POST_USER_DATA,
              
              payload: { data: error.response.data },
              
            });
            
        }
    }