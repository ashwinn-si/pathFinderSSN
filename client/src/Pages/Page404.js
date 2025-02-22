import Background from "../Components/Background";
import img from "./../Assets/Gifs/Page404.gif";
import {useNavigate} from "react-router-dom";

function Page404(){
    const navigate = useNavigate();
    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <div className="  w-[350px] lg:w-[550px]  h-auto p-4 md:h-[450px] bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col">
                <p className="custom-FontFamily text-2xl">Unautherized </p>
                <img src={img} />
                <button className="btn btn-outline btn-primary" onClick={() => navigate("/")}>
                    Home
                </button>
            </div>
        </div>
    )
}
export default Page404;