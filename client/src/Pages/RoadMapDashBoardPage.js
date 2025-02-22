import {React, useEffect, useState} from 'react';
import Background from "../Components/Background";
import { Map } from 'lucide-react';
import axios from "./../AxiosProvider"
import {useNavigate} from "react-router-dom";

function RoadMapDashBoardPage() {
    const [availableRoadMaps, setAvailableRoadMaps] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

            axios.get("/api/user/roadmap/getDetails").then((response)=>{
                const roadMap = response.data.roadMaps
                setAvailableRoadMaps(roadMap)
                console.log(roadMap);
            }).catch(e =>{
                if(e.response.status === 401){
                    navigate("/Page404");
                }
            })

    },[])
    const handleLogOut = () =>{
        axios.delete("/api/auth/logout").then((response) => {
            navigate("/");
        })

    }
    const openHandler = (index)=>{
        navigate(`/roadmap/${availableRoadMaps[index].roadMapID}`)
    }
    return (
        <div className="w-screen h-screen relative flex justify-center items-center overflow-hidden">
            <Background />
            <button className=" btn  btn-secondary  absolute top-7 left-20 z-[11] border border-solid border-1" onClick={handleLogOut} >
                Logout
            </button>
            <div className="w-[350px] lg:w-[600px] min-h-[300px] px-3 py-2 bg-base-300 rounded-lg border-2 border-solid border-neutral shadow-primary shadow-[0_0_5px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-85 custom-FontFamily  ">

                <p className="text-2xl lg:text-3xl font-semibold text-center mb-4" >All Available RoadMaps</p>
                <div className="flex flex-col gap-2">
                    {
                        availableRoadMaps.length > 0 ?
                            availableRoadMaps.map((roadmap,index) => (
                                <div className="flex items-center justify-between w-90 border-primary border-2 p-2 rounded-xl" key={index}>
                                    <div className="flex items-center gap-3">
                                        <Map className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                                        <div>
                                            <h2 className="text-l lg:text-xl font-semibold ">{roadmap.skillName}</h2>
                                            <p className="text-sm text-secondary">{roadmap.dateOfCreation}</p>
                                        </div>
                                    </div>
                                    <button className=" px-2 py-1 lg:px-4 lg:py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 transition-colors duration-200 flex items-center gap-2"
                                    onClick={() => openHandler(index)}>
                                        Open
                                    </button>
                                </div>
                            )) : null
                    }
                    <div className="flex items-center justify-between w-90 border-primary border-2 p-2 rounded-xl" >
                        <div className="flex items-center gap-3">
                            <Map className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                            <div>
                                <h2 className="text-l lg:text-xl font-semibold ">Create RoadMap</h2>

                            </div>
                        </div>
                        <button className=" px-2 py-1 lg:px-4 lg:py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-200 flex items-center gap-2"
                                onClick={() => navigate("/goalselection")}>
                            Create
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default RoadMapDashBoardPage;