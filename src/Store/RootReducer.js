import SurveyDataReducer from '../Redux/Reducer/SurveyDataReducer'
import USerListReducer from '../Redux/Reducer/USerListReducer'
import EditUserReducer from '../Redux/Reducer/EditUserReducer'
import DeleteUserReducer from '../Redux/Reducer/DeleteUserReducer'
import { combineReducers } from "redux"
const RootReducer = combineReducers({
    SurveyDataReducer:SurveyDataReducer,
    USerListReducer:USerListReducer,
    EditUserReducer:EditUserReducer,
    DeleteUserReducer:DeleteUserReducer
})
export default RootReducer