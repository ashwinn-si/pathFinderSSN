import React, {useReducer} from 'react';
import Background from "../Components/Background";
import { Link } from 'react-router-dom';
import api from "./../AxiosProvider"
import { useNavigate } from 'react-router-dom';
import SuccessMessage from "../Components/InfoMessages/SuccessMessage";
import LoaderMessage from "../Components/InfoMessages/LoaderMessage";
import ErrorMessage from "../Components/InfoMessages/ErrorMessage";
import {signUpFormReducer, INTIAL_STATE} from "../Utilities/Reducers/SignUpPageReducer"

function SignUpPage(){
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(signUpFormReducer, INTIAL_STATE);


    function handleSignUp(e){
        e.preventDefault();
        dispatch({type: "SET_MESSAGE_FLAG", payload:1})
        api.post("/api/auth/signup",{
            email: state.email,
            otp: state.otp
        }).then((response) => {
            if(response.status === 200){
                dispatch({ type: "SET_MESSAGE_FLAG", payload: 1 });
                setTimeout(()=>{
                    navigate(`/goalselection`);
                },2000)
            }
        }).catch((err)=>{
            console.log(err)
            if(err.response.status === 401){
                dispatch({ type: "SET_MESSAGE_FLAG", payload: 5 });

            }else if(err.response.status === 404){
                dispatch({ type: "SET_MESSAGE_FLAG", payload: 6 });
            }else{
                dispatch({ type: "SET_MESSAGE_FLAG", payload: 2 });
            }
        }).finally(()=>{
            setTimeout(()=>{
                dispatch({type: "SET_MESSAGE_FLAG", payload: null})

            },2000);
        })
    }

    function handleOtpGnereation(e){
        e.preventDefault()
        dispatch({ type: "SET_MESSAGE_FLAG", payload: 0 });
        api.post("/api/auth/verifyotp",{
            email: state.email,
            password: state.password,
            name: state.username
        }).then((response) => {
            dispatch({ type: "SET_MESSAGE_FLAG", payload: 4 });            
            dispatch({type: "TOGGLE_OTP_FLAG"})

        }).catch((err) =>{
            if(err.response.status === 403){
                dispatch({ type: "SET_MESSAGE_FLAG", payload: 7 });
            }else{
                dispatch({ type: "SET_MESSAGE_FLAG", payload: 2 });
            }

        }).finally(() => {
            setTimeout(()=>{
                dispatch({ type: "SET_MESSAGE_FLAG", payload: null });
            },2000)
        })
    }

    const handleInputChange = e =>{
        dispatch({
            type: "INPUT_CHANGE",
            payload:{name :e.target.name, value: e.target.value}
        })
    }

    const handleBack = () =>{
        navigate("/")
    }
    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <button className=" btn  btn-secondary  absolute top-7 left-20 z-[11] border border-solid border-1" onClick={handleBack} >
                Home
            </button>
            <Background />
                {
                    state.messageFlag === 1 && <SuccessMessage message = "SignUp Successful"/>
                }
                {
                    state.messageFlag === 4 && <SuccessMessage message = "Otp Generated"/>
                }
                {
                    state.messageFlag === 0 && <LoaderMessage message = "Generating Otp"/>
                }
                {
                    state.messageFlag === 2 && <ErrorMessage message = "Server Issue"  />
                }
                {
                    state.messageFlag === 5 && <ErrorMessage message = "Otp Incorrect"  />
                }
                {
                    state.messageFlag === 6 && <ErrorMessage message = "User Not Found"  />
                }
                {
                    state.messageFlag === 7 && <ErrorMessage message = "User Already Exist"  />
                }
            <div className=" w-[90%] max-w-[350px] md:max-w-[450px] lg:max-w-[500px]  h-auto md:h-[450px] bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-start items-center flex-col">
                <div className="h-[20%] w-full flex justify-center items-center mb-4">
                    <p className="text-center font-semibold text-primary text-2xl md:text-3xl">Sign Up</p>
                </div>

                   <form className="h-[80%] w-[80%] flex flex-col justify-evenly items-center " onSubmit={ state.otpFlag ? handleSignUp : handleOtpGnereation}>
                        <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Name
                           <input name="username" type="text" required className="grow text-base-content w-[90%]" placeholder="Enter" onChange={handleInputChange} />
                       </label>
                       <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Email
                           <input name='email' type="email" required className="grow text-base-content w-[90%]" placeholder="Enter" onChange={handleInputChange} />
                       </label>
                       {
                        !state.otpFlag && 
                        <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Password
                           <input name='password' type="text" required className="grow text-base-content w-[90%]" placeholder="Enter " onChange={handleInputChange} />
                       </label>
                       }
                       {
                        state.otpFlag &&
                        <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           OTP
                           <input name='otp' type="text" required className="grow text-base-content w-[90%]" placeholder="Enter " onChange={handleInputChange} />
                       </label>
                       }
                       
                       {
                        !state.otpFlag
                        &&
                        <button type="submit" className="btn btn-primary px-6 py-2" onClick={handleOtpGnereation} >Generate OTP</button>
                       }
                       
                       {
                        state.otpFlag && 
                        <button type="submit" className= "btn btn-primary px-6 py-2" onClick={handleSignUp}>SignUp</button>
                       }
                       

                        <Link to="/login"> 
                            <p className="text-base-content">Already User? <span className="text-primary font-[550]">Login</span></p>
                        </Link>
                       
                   </form>

            </div>
        </div>

    )
}

export default SignUpPage;