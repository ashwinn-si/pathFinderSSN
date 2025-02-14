export const INTIAL_STATE ={
    email: "",
    password: "",
    messageFlag: ""
}

export const loginPageFormReducer = (state, action) => {
    switch(action.type){
        case "INPUT_CHANGE":
            return{
                ...state,
                [action.payload.name] : action.payload.value
            }
        case "SET_MESSAGE_FLAG":
            return{
                ...state,
                messageFlag: !state.messageFlag
            }    
        default:
            return state;    
    }
}