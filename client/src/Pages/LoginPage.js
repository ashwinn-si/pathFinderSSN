import { Link, useNavigate } from "react-router-dom";
import Background from "../Components/Background";
import {useReducer } from "react";
import api from "./../AxiosProvider"
import SuccessMessage from "../Components/InfoMessages/SuccessMessage";
import LoaderMessage from "../Components/InfoMessages/LoaderMessage";
import ErrorMessage from "../Components/InfoMessages/ErrorMessage";
import {loginPageFormReducer, INTIAL_STATE} from "../Utilities/Reducers/LoginPageReducer";

function LoginPage(){
    const [state, dispatch] = useReducer(loginPageFormReducer, INTIAL_STATE);
    const navigate = useNavigate()

    function handleInputChange(e){
        dispatch({
          type: "INPUT_CHANGE",
          payload: { name: e.target.name, value: e.target.value },
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch({ type: "SET_MESSAGE_FLAG", payload: 0 });
        api.post("/api/auth/login",{
            email: state.email,
            password: state.password
        }).then((response)=>{
            dispatch({ type: "SET_MESSAGE_FLAG", payload: 1 });
            setTimeout(()=>{
                navigate("/roadMapDashBoard")
            },2000)
            
        }).catch((err)=>{
            if(err.response.status === 404){
                dispatch({type:"SET_MESSAGE_FLAG", payload: 3})
            }else if(err.response.status === 401){
                dispatch({ type: "SET_MESSAGE_FLAG", payload: 4 });
            }else{
               dispatch({ type: "SET_MESSAGE_FLAG", payload: 2 });
            }
        }).finally(()=>{
            setTimeout(()=>{

                dispatch({ type: "SET_MESSAGE_FLAG", payload: null });
            },2000)
        })
    }
    const handleBack = ()=>{
        navigate("/")
    }

    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <button className=" btn  btn-secondary  absolute top-7 left-20 z-[11] border border-solid border-1" onClick={handleBack} >
                Home
            </button>
                {
                    state.messageFlag === 1 && <SuccessMessage message = "Login Successful"/>
                }
                {
                    state.messageFlag === 0 && <LoaderMessage message = "Checking Credentials"/>
                }
                {
                    state.messageFlag === 2 && <ErrorMessage message = "Server Issue" />
                }
                {
                    state.messageFlag === 3 && <ErrorMessage message = "User Not Found" />
                }
                {
                    state.messageFlag === 4 && <ErrorMessage message = "Incorrect Password" />
                }
            <div className=" w-[90%] max-w-[350px] md:max-w-[450px] lg:max-w-[500px]  h-auto md:h-[450px] bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-start items-center flex-col">
                <div className="h-[20%] w-full flex justify-center items-center mb-4">
                    <p className="text-center font-semibold text-primary text-2xl md:text-3xl">Login</p>
                </div>

                   <form className="h-[80%] w-[80%] flex flex-col justify-evenly items-center " onSubmit={handleSubmit}>
                       <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Email
                           <input name="email" type="text" required className="grow text-base-content w-[90%]" placeholder="Enter" onChange={handleInputChange} />
                       </label>
                       <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Password
                           <input name="password" type="password" required className="grow text-base-content w-[90%]" placeholder="Enter " onChange={handleInputChange} />
                       </label>
                       <button type="submit" className="btn btn-primary px-6 py-2">Login</button>
                       <Link to="/SignUp">
                            <p className="text-base-content">New User? <span className="text-primary font-[550]">Sign Up</span></p>
                       </Link>
                       
                   </form>

            </div>
        </div>

    )
}
export default LoginPage;