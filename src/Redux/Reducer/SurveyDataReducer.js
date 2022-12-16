   

import { SURVEY_DATA,LOGIN,LOGIN_ERROR,SELECTED_DATA,SUBMIT_DATA } from '../ActionTypes/ActionTypes'
const initialstate = {
    Loginresponce :{},
    loading:true,
    surveydata : [],
    FailedLogin:[]
}

const SurveyDataReducer = (state = initialstate, action) => {

    console.log("amiiiiiiiiiiii",action.payload);
    console.log("surveysssssssss========>",state.surveydata);
    
    console.log("Loginresponce========>",state.Loginresponce);
    
    switch (action.type) {
        
        case LOGIN:
            // const logindata = localStorage.getItem("login")
            return{
                ...state,
                Loginresponce : action.payload.data ,
                loading:false
            }

            case LOGIN_ERROR:
                return{
                    ...state,
                    FailedLogin:action.payload.data
                    
                }

            case SUBMIT_DATA:
                console.log("amisha====>",action.payload);
                return{
                    ...state,
                    ...action.payload,
                }


        case SURVEY_DATA:
            
            return {
                ...state,
                surveydata : action.payload.surveydata
                
            }
            case SELECTED_DATA:
                console.log("surveyapidata",action.payload);
                    const   res =   state.surveydata.map((i,id) => {
                if (i.survey_id === action.payload.Survey_Id) {
                    i.comment = action.payload.comment
                }
                i.question.map((data,index) => {
                    console.log("data=====>",data);
                    action.payload?.AnsData?.filter((Qdata) => {
                     if (data.qid ===  Qdata.qid) {
                         
                         data.ans = Qdata.ans +1
                        }
                    })
                    
                })
            })
            
                return{
                    ...state
                }
            
                default:
                    return state;
                }
            };
    export default SurveyDataReducer;