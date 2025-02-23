import Background from "../Components/Background";
import {useEffect, useState} from "react";
import StarRating from "../Components/StarRating";
import api from ".././AxiosProvider"
import {useNavigate, useParams} from "react-router-dom";

function UserKnowledgePage(){
    const navigate = useNavigate();
    const [topics, setTopics] = useState(null);

    useEffect(()=>{
        api.get(`/api/user/getSkill`).then((response) => {
            const data = response.data.data[0].modules;
            console.log(data)
            const currentData = {}
            data.map((item) => {
                currentData[item] = 1;
            })
            setTopics(currentData);
        }).catch(error => {
                if (error.response && error.response.status === 401) {
                    navigate("/Page404");
                }
            }
        )
    },[])


    const handleRatingChange = (topic, newValue) => {
        setTopics(prev => ({
            ...prev,
            [topic]: newValue
        }));
    };

    const handleSubmit = () =>{
        let userTopics = []
        let userRating = []
        for(let topic in topics){
            userTopics.push(topic);
            userRating.push(topics[topic]);
        }
        api.post("/api/user/addKnowledge",{
            topics : userTopics,
            rating : userRating
        }).then((response) => {
            if(response.status === 200){
                navigate("/quizPage");
            }
        })

    }
    const handleBack = () =>{
        navigate("/goalselection")
    }
    return(
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <button className=" btn  btn-secondary  absolute top-7 left-20 z-[11] border border-solid border-1" onClick={handleBack} >
                Back
            </button>
            <div className=" w-[350px] lg:w-[800px]    h-auto  bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px]  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 flex justify-evenly items-center flex-col py-4 px-6">
                <div className="h-[90%] w-full flex flex-col items-center mb-4 p-6">
                    <div className="h-[20%] w-full flex justify-center items-center mb-4">
                        <p className="text-center font-semibold text-primary text-2xl md:text-3xl custom-FontFamily">Rate YourSelf In These Topics
                        </p>
                    </div>
                    <div className="w-[90%] grid grid-cols-1 gap-4 items-center justify-center my-2">
                        {
                            topics !== null ?
                                Object.entries(topics)?.map(([topic, value], index) => (
                                        <div key={index} className="w-full grid grid-row-2 lg:grid-cols-2 gap-4 items-center justify-center my-2 ">
                                            <div className="flex justify-center items-center">
                                                <p className="text-center font-[500] text-secondary text-xl md:text-2xl custom-FontFamily">
                                                    {topic}
                                                </p>
                                            </div>
                                            <div className="flex justify-center items-center">
                                                <StarRating
                                                    value={value}
                                                    name={`topic-${index}`}
                                                    onChange={(newValue) => handleRatingChange(topic, newValue)}
                                                />
                                            </div>
                                        </div>
                                    )) : null
                        }

                    </div>
                    <div>
                        <button  className="btn btn-primary btn-outline px-6 py-2" onClick={handleSubmit}>Proceed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserKnowledgePage;