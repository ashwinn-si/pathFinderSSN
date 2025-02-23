import Background from "../Components/Background";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from "./../AxiosProvider"

function SelectGoalPage(props) {
    const [userTopic, setUserTopic] = useState("Select Topic");
    const [userSubTopic, setUserSubTopic] = useState("Select Sub Topic");
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    useEffect(() => {
       api.get("/api/user/getTopics").then(res => {
           const topics = res.data.topics.map(element =>{
                return {
                    topic: element.topic,
                    subTopic: element.subTopics.map(currTopic => {
                        return currTopic.subTopic
                    }),
                }
           })
           setTopics(topics);
       })
    },[])
    function handleSubmit(){
        api.post("/api/user/addskill",{
            topic : userTopic,
            subTopic : userSubTopic
        }).then(response =>{
            if(response.status === 200){
                navigate(`/userKnowledge`);
            }
        }).catch(error =>{
            console.log(error);
        })

    }

    const handleBack = () =>{
        navigate("/roadMapDashBoard");
    }

    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-x-hidden ">
            <Background />
            <button className=" btn  btn-secondary  absolute top-7 left-20 z-[11] border border-solid border-1" onClick={handleBack} >
                Back
            </button>
            <div className=" w-[350px] lg:w-[500px]    bg-base-300 rounded-lg border-2 py-6 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col custom-FontFamily">
                <div className="h-[20%] w-full flex justify-evenly items-center mb-4">
                    <p className="text-center font-semibold text-primary text-2xl md:text-4xl font-[700]">Set Your Goal</p>
                </div>
                <div className="h-[60%] w-full flex flex-col justify-evenly items-center mb-4">

                    <div className="w-[90%] bg-base-100 h-[20%] border-[1px] border-primary flex items-center justify-start rounded-xl py-2 text-xl font-[600] ">
                        {
                            userTopic === "Select Topic" ?
                                <p className="ml-3">{userTopic} !!! </p>
                                :
                                <p className="ml-3">{userTopic} / <span className="text-secondary">{userSubTopic}</span></p>
                        }

                    </div>

                    <div className="flex flex-wrap gap-3 justify-center m-4">
                        {topics.map((goalOption,index) => (
                            <button
                                key={goalOption.topic}
                                onClick={() => {setUserTopic(goalOption.topic); setUserSubTopic("Select Sub Topic")}}
                                className={`px-4 py-2 rounded-full text-m font-medium transition-all duration-200  border-2
                                ${userTopic === goalOption.topic
                                        ? 'bg-primary text-white shadow-md scale-105'
                                        : 'bg-base-100 hover:bg-primary/10 hover:shadow-md hover:scale-105'
                                    } border border-primary/20 hover:border-primary/50
                                `}
                            >
                                {goalOption.topic}
                            </button>
                        ))}
                    </div>
                    {
                        userTopic !== "Select Topic" &&
                        <div className="flex flex-wrap gap-3 justify-center m-4">
                            {
                                topics.filter(currTopic => currTopic.topic === userTopic)[0].subTopic.map((subTopic,index) => (
                                    <button
                                        key={subTopic}
                                        onClick={() => {setUserSubTopic(subTopic)}}
                                        className={`px-4 py-2 rounded-full text-m font-medium transition-all duration-200 border-2
                                ${userSubTopic === subTopic
                                            ? 'bg-secondary text-white shadow-md scale-105'
                                            : 'bg-base-100 hover:bg-secondary/10 hover:shadow-md hover:scale-105'
                                        } border border-secondary/20 hover:border-secondary/50
                                `}
                                    >
                                        {subTopic}
                                    </button>
                                ))
                            }
                        </div>
                    }

                </div>
                {
                    userSubTopic !== "Select Sub Topic" &&
                    <div className="h-[20%] flex justify-center items-center ">
                        <button className={"btn btn-outline btn-primary"} onClick={handleSubmit}>Set Goal</button>
                    </div>
                }

            </div>
        </div>
    )
}
export default SelectGoalPage;