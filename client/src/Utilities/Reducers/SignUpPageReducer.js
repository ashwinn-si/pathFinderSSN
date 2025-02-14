export const INTIAL_STATE = {
    email: "",
    username: "",
    password: "",
    otp: "",
    otpFlag: false
}

export const formReducer = (state, action) => {
    switch(action.type){
        case "INPUT_CHANGE":
            return{
                ...state,
                [action.payload.name]: action.payload.value
            }
        case "TOGGLE_FLAG":
            return{
                ...state,
                otpFlag: !state.otpFlag
            }
        default:
            return state;        

    }

}