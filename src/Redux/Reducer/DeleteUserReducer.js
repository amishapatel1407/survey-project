import {DELETE_USER} from '../ActionTypes/ActionTypes'
const initialstate = {
}

const DeleteUserReducer =  (state=initialstate,action) => {
    // console.log("userlist========>",action.payload);
    switch (action.type) {
        case DELETE_USER:
            return{
              ...state,
              ...action.payload
            }
    
    
        default:
            return state;
    }
}
export default DeleteUserReducer