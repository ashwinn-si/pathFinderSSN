import React, {useState} from 'react';
import Background from "../Components/Background";
import { Link } from 'react-router-dom';


function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [OTP, setOTP] = useState("");

    const [genOTPVisible, setGenOTPVisible] = useState(true);   //for generate otp button
    const [verify, setVerify] = useState(false)  //for verify button
    const [nameVisible, setNameVisible] = useState(true);
    const [OTPinput, setOTPinput] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        console.log(email,password,OTP)
    }

    function handleGenerateOTP(){
        setGenOTPVisible(false);
        setVerify(true);
        setNameVisible(false);
        setOTPinput(true);

    }

    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <div className=" w-[90%] max-w-[350px] md:max-w-[450px] lg:max-w-[500px]  h-auto md:h-[450px] bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-start items-center flex-col">
                <div className="h-[20%] w-full flex justify-center items-center mb-4">
                    <p className="text-center font-semibold text-primary text-2xl md:text-3xl">Sign Up</p>
                </div>

                   <form className="h-[80%] w-[80%] flex flex-col justify-evenly items-center " onSubmit={handleSubmit}>
                        <label className={nameVisible ? "input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3" : "hidden"}>
                           Name
                           <input type="text" required className="grow text-base-content w-[90%]" placeholder="Enter" onChange={(e) => setEmail(e.target.value)} />
                       </label>
                       <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Email
                           <input type="email" required className="grow text-base-content w-[90%]" placeholder="Enter" onChange={(e) => setEmail(e.target.value)} />
                       </label>
                       <label className="input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3">
                           Password
                           <input type="text" required className="grow text-base-content w-[90%]" placeholder="Enter " onChange={e => setPassword(e.target.value)} />
                       </label>
                       <label className={OTPinput ? "input input-bordered flex items-center gap-2 text-primary w-full rounded-xl my-3" : "hidden"}>
                           OTP
                           <input type="text" required className="grow text-base-content w-[90%]" placeholder="Enter " onChange={e => setOTP(e.target.value)} />
                       </label>

                       <button type="submit" className={genOTPVisible ? "btn btn-primary px-6 py-2" : "hidden"} onClick={handleGenerateOTP}>Generate OTP</button>

                       <button type="submit" className={ verify ? "btn btn-primary px-6 py-2" : "hidden"} onClick={handleSubmit} >Verify</button>

                        <Link to="/login"> 
                            <p className="text-base-content">Already User? <span className="text-primary font-[550]">Login</span></p>
                        </Link>
                       
                   </form>

            </div>
        </div>

    )
}

export default SignUp;