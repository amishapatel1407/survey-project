import {UPDATE_USER_DATA} from '../ActionTypes/ActionTypes'
const initialstate = {
}

const EditUserReducer =  (state=initialstate,action) => {
    // console.log("userlist========>",action.payload);
    switch (action.type) {
        case UPDATE_USER_DATA:
            return{
              ...state,
              ...action.payload
            }
    
    
        default:
            return state;
    }
}
export default EditUserReducer