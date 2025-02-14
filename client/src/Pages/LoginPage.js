import { Link, useNavigate } from "react-router-dom";
import Background from "../Components/Background";
import {useState} from "react";
import api from "./../AxiosProvider"
import SuccessMessage from "../Components/InfoMessages/SuccessMessage";
import LoaderMessage from "../Components/InfoMessages/LoaderMessage";
import ErrorMessage from "../Components/InfoMessages/ErrorMessage";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messageFlag, setMessageFlag] = useState(null);
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault();
        setMessageFlag(0)
        api.post("/api/auth/login",{
            email,
            password
        }).then((response)=>{
            setMessageFlag(1);
            setTimeout(()=>{
                navigate("/dashboard/old")
            },2000)
            
        }).catch((err)=>{
            if(err.response.status === 404){
                setMessageFlag(3)
            }else if(err.response.status === 401){
                setMessageFlag(4)
            }else{
                setMessageFlag(2)
            }
        }).finally(()=>{
            setTimeout(()=>{

                setMessageFlag(null)
            },2000)
        })
    }

    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
                {
                    messageFlag === 1 && <SuccessMessage message = "Login Successful"/>
                }
                {
                    messageFlag === 0 && <LoaderMessage message = "Checking Credentials"/>
                }
                {
                    messageFlag === 2 && <ErrorMessage message = "Server Issue" />
                }
                {
                    messageFlag === 3 && <ErrorMessage message = "User Not Found" />
                }
                {
                    messageFlag === 4 && <ErrorMessage message = "Incorrect Password" />
                }
            <div className=" w-[90%] max-w-[350px] md:max-w-[450px] lg:max-w-[500px]  h-auto md:h-[450px] bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-start items-center flex-col">
                <div className="h-[20%] w-full flex justify-center items-center mb-4">
                    <p className="text-center font-semibold text-primary text-2xl md:text-3xl">Login</p>
                </div>

                   <form className="h-[80%] w-[80%] flex flex-col justify-evenly items-center " onSubmit={handleSubmit}>
                       <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Email
                           <input type="text" required className="grow text-base-content w-[90%]" placeholder="Enter" onChange={(e) => setEmail(e.target.value)} />
                       </label>
                       <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Password
                           <input type="password" required className="grow text-base-content w-[90%]" placeholder="Enter " onChange={e => setPassword(e.target.value)} />
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