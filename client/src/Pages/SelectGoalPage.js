import Background from "../Components/Background";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "./../AxiosProvider"

function SelectGoalPage(props) {
    const [goal, setGoal] = useState("Select Goal");
    const navigate = useNavigate();
    const goals = [
        "Problem Solving",
        "Frontend Development",
        "Backend Development [MERN]"
    ];

    function handleSubmit(){
        api.post("/api/user/addskill",{
            skill : goal
        }).then(response =>{
            if(response.status === 200){
                navigate(`/userKnowledge`);
            }
        }).catch(error =>{
            console.log(error);
        })

    }

    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <div className=" w-[350px] lg:w-[500px]   h-auto md:h-[450px] bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col">
                <div className="h-[20%] w-full flex justify-evenly items-center mb-4">
                    <p className="text-center font-semibold text-primary text-2xl md:text-3xl custom-FontFamily">Set Your Goal</p>
                </div>
                <div className="h-[60%] w-full flex flex-col justify-evenly items-center mb-4">

                    <div className="w-[90%] bg-base-100 h-[20%] border-[1px] border-primary flex items-center justify-start rounded-xl">
                        <p className="ml-3">{goal}</p>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center m-4">
                        {goals.map((goalOption) => (
                            <button
                                key={goalOption}
                                onClick={() => setGoal(goalOption)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                ${goal === goalOption
                                        ? 'bg-primary text-white shadow-md scale-105'
                                        : 'bg-base-100 hover:bg-primary/10 hover:shadow-md hover:scale-105'
                                    } border border-primary/20 hover:border-primary/50
                                `}
                            >
                                {goalOption}
                            </button>
                        ))}
                    </div>
                </div>
                {
                    goal !== "Select Goal" &&
                    <div className="h-[20%] flex justify-center items-center ">
                        <button className={"btn btn-outline btn-primary"} onClick={handleSubmit}>Set Goal</button>
                    </div>
                }

            </div>
        </div>
    )
}
export default SelectGoalPage;