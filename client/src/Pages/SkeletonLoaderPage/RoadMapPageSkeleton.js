import Background from "../../Components/Background";
import SkeletonLoader from "../../Components/SkeletonLoader";
import Loader from "../../Components/Loader";

function RoadMapPageSkeleton() {
    return (
        <div className="w-screen h-screen relative">
            <Background />
            <div className="w-[350px] lg:w-[800px]    h-[80%]  bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col py-4 px-6 custom-FontFamily">
                <div className="flex justify-center items-center gap-2">
                    <p className="text-2xl font-semibold">Generating RoadMap...</p>
                    <Loader />
                </div>
                <SkeletonLoader width="90%" height="80%" />
            </div>
        </div>


    )
}
export default RoadMapPageSkeleton;