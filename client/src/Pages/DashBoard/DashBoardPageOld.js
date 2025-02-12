import Background from "../../Components/Background";
import Header from "../../Components/LandingPage/Header";

function DashBoardPageOld() {
    return (
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            {/*<div className=" w-[90%] max-w-[350px] md:max-w-[450px] lg:max-w-[500px]  h-auto md:h-[450px] bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-start items-center flex-col">*/}
            {/*    <p>This is New User</p>*/}
            {/*</div>*/}
            <div className="flex items-center justify-evenly px-4 py-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px] custom-FontFamily">
                <p className="text-2xl">RoadMap DashBoard</p>
            </div>
        </div>

    )
}
export default DashBoardPageOld;