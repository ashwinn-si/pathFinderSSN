import React, {useEffect, useReducer, useState} from 'react';
import Background from "../Components/Background";
import { Link } from 'react-router-dom';
import api from "./../AxiosProvider"
import { useNavigate } from 'react-router-dom';
import SuccessMessage from "../Components/InfoMessages/SuccessMessage";
import LoaderMessage from "../Components/InfoMessages/LoaderMessage";
import ErrorMessage from "../Components/InfoMessages/ErrorMessage";
import {formReducer, INTIAL_STATE} from "../Utilities/Reducers/SignUpPageReducer"

function SignUpPage(){
    // const [email, setEmail] = useState("");
    // const [name , setName] = useState("");
    // const [password, setPassword] = useState("");
    // const [otp, setOTP] = useState("");

    // const [otpFlag, setOtpFlag] = useState(false)
    const [messageFlag, setMessageFlag] = useState(null)
    const navigate = useNavigate()

    const [state, dispatch] = useReducer(formReducer, INTIAL_STATE);


    function handleSignUp(e){
        console.log("SIGINI UP")
        // e.preventDefault();
        // setMessageFlag(1);
        // api.post("/api/auth/signup",{
        //     email,
        //     otp
        // }).then((response) => {
        //     if(response.status === 200){
        //         setMessageFlag(1);
        //         setTimeout(()=>{
        //             navigate("/goalselection")
        //         },2000)
        //     }
        // }).catch((err)=>{
        //     if(err.response.status === 401){
        //         setMessageFlag(5)
        //     }else if(err.response.status === 404){
        //         setMessageFlag(6)
        //     }else{
        //         setMessageFlag(2)
        //     }
        // }).finally(()=>{
        //     setTimeout(()=>{
        //         setMessageFlag(null)

        //     },2000);
        // })
    }

    function handleOtpGnereation(e){
        console.log("GENERATE OTP>>")
        // e.preventDefault()
        // setMessageFlag(0)
        // api.post("/api/auth/verifyotp",{
        //     email,
        //     password,
        //     name
        // }).then((response) => {
        //     setMessageFlag(4)
        //     setOtpFlag(true)
        // }).catch((err) =>{

        //     if(err.response.status === 403){
        //         setMessageFlag(7)
        //     }else{
        //         setMessageFlag(2)
        //     }
        // }).finally(() => {
        //     setTimeout(()=>{
        //         setMessageFlag(null)

        //     },[2000])
        // })
    }

    const handleInputChange = e =>{
        dispatch({
            type: "INPUT_CHANGE",
            payload:{name :e.target.name, value: e.target.value}
        })
    }

    console.log(state)


    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
                {
                    messageFlag === 1 && <SuccessMessage message = "SignUp Successful"/>
                }
                {
                    messageFlag === 4 && <SuccessMessage message = "Otp Generated"/>
                }
                {
                    messageFlag === 0 && <LoaderMessage message = "Generating Otp"/>
                }
                {
                    messageFlag === 2 && <ErrorMessage message = "Server Issue"  />
                }
                {
                    messageFlag === 5 && <ErrorMessage message = "Otp Incorrect"  />
                }
                {
                    messageFlag === 6 && <ErrorMessage message = "User Not Found"  />
                }
                {
                    messageFlag === 7 && <ErrorMessage message = "User Already Exist"  />
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
                        <button type="submit" className="btn btn-primary px-6 py-2" >Generate OTP</button>
                       }
                       
                       {
                        state.otpFlag && 
                        <button type="submit" className= "btn btn-primary px-6 py-2" >SignUp</button>
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