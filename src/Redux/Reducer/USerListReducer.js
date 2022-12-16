import {FAILED_USERLIST_Api,GET_USER_LIST,POST_USER_DATA, FAILED_POST_USER_DATA} from '../ActionTypes/ActionTypes'
const initialstate = {
    UserList : [],
    FailedFormData:[],
    statusCode:null
}

const USerListReducer =  (state=initialstate,action) => {
    console.log("userlist========>",action.payload);
    switch (action.type) {
        case POST_USER_DATA:
            return{
              ...state,
              statusCode :action.payload?.data?.statusCode
            }

            case FAILED_POST_USER_DATA : 
            return{
               ...state,
               FailedFormData:action.payload.data
               
            }
        case GET_USER_LIST:
            return{
                ...state,
                UserList:action.payload
            }
    
        default:
            return state;
    }
}
export default USerListReducer