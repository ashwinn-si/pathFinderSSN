import Background from "../../Components/Background";
import SkeletonLoader from "../../Components/SkeletonLoader";
import Loader from "../../Components/Loader";

function QuestionPageSkeletonLoader(){
    return (

            <div className="w-[350px] lg:w-[800px]    h-[400px]  bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col py-4 px-6">
                <div className="flex justify-center items-center gap-2">
                    <p className="text-2xl font-semibold">Generating Question...</p>
                    <Loader />
                </div>

                <SkeletonLoader width="90%" height="10%" />
                <SkeletonLoader width="90%" height="10%" />
                <SkeletonLoader width="90%" height="10%" />
                <SkeletonLoader width="90%" height="10%" />
            </div>



    )
}
export default QuestionPageSkeletonLoader;