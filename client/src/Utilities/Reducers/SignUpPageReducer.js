export const INTIAL_STATE = {
    email: "",
    username: "",
    password: "",
    otp: "",
    otpFlag: false,
    messageFlag: null
}

export const signUpFormReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "TOGGLE_OTP_FLAG":
        return {
          ...state,
          otpFlag: !state.otpFlag,
        };
      case "SET_MESSAGE_FLAG" :
        return{
            ...state,
            messageFlag: action.payload
        }
      default:
        return state;
    }

}