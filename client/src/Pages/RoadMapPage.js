import {useState, useEffect, useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoadMapSeparatePage from "./RoadMapSeparatePage";
import axios from "./../AxiosProvider";

function RoadMapPage() {
    const [separatePageVisibleFlag, setSeparatePageVisibleFlag] = useState(false);
    const navigate = useNavigate();
    const roadMapID = useParams().id;
    const [roadMapName, setRoadMapName] = useState("");
    const [header, setHeader] = useState("")
    const [description, setDescription] = useState("")
    const [reasourcesLink, setReasourcesLink] = useState(null)
    const [roadmapData, setRoadmapData] = useState([]);
    const [initialRoadmapData, setInitialRoadmapData] = useState([])

    useEffect(() => {
            axios.get(`/api/user/roadmap/roadmapGetDetails?roadMapID=${roadMapID}`).then((response) => {
                console.log(roadMapID)
                const data = response.data[0];
                console.log(data)
                setRoadMapName(data.skillName)
                const modules = data.modules.map((items, index) => ({ ...items, id: index }));
                setRoadmapData(modules)
            }).catch(e =>{
                if(e.response.status === 401){
                    navigate("/Page404");
                }
            })


    },[roadMapID])

  const updateStatus = (id) => {
      setRoadmapData(prevData =>
          prevData.map(item =>
              item.id === id
                  ? {...item, status: item.status === "completed" ? "uncompleted" : "completed"}
                  : item
          )
      );
  }


  useEffect(() => {
    if (reasourcesLink && !separatePageVisibleFlag) {
      setSeparatePageVisibleFlag(true);
    }
  }, [reasourcesLink]); 
  
  const handleMoreInfoClick = (index) => {

    setHeader(roadmapData[index].title);
    setDescription(roadmapData[index].description);

    setReasourcesLink(roadmapData[index].links);
  };
  
  const handleBack = () =>{
    setSeparatePageVisibleFlag(false);
  }

  const handlePageClose = () =>{
      axios.post("/api/user/roadmap/update",{
          modules : roadmapData,
          roadMapID : roadMapID
      }).then((response) => {
         navigate("/roadMapDashBoard")
          console.log(response)
      })
  };



  return (
    <>
    {
      separatePageVisibleFlag ? 
      <div className="relative">
      <button className=" btn btn-outline btn-accent  absolute top-2 left-5 z-[11] border border-solid border-1" onClick={handleBack} >
                      Back
      </button>
        <RoadMapSeparatePage header = {header} description={description} reasourcesLink={reasourcesLink}/>
      </div>
          :

      <div className="w-full max-w-4xl mx-auto p-8 custom-FontFamily ">
          <button className=" btn btn-outline btn-accent  fixed top-4 left-5 z-[11] border border-solid border-1" onClick={handlePageClose} >
              Back
          </button>
      <div className="bg-base-200 rounded-xl p-8 shadow-xl  border relative">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-base-content mb-2">{roadMapName} Roadmap</h1>
        </div>

        <div className="hidden md:block absolute left-1/2 top-32 bottom-20 w-1 h-[95%] bg-base-content/20 -translate-x-1/2 z-0"></div>

        <div className="relative z-10">
          {roadmapData.map((item, index) => (
            <div key={index} className="mb-16 relative">
              <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Roadmap Content */}
                <div className="w-full md:w-5/12 group">
                  <div className={`backdrop-blur rounded-lg p-5 transition-all duration-300 ${
                    item.status === "completed" ? "bg-success/10 border-2 border-success hover:bg-success/20" :
                    item.status === "current" ? "bg-primary/10 border-2 border-primary hover:bg-primary/20" :
                    "bg-base-100 border border-base-300 hover:bg-base-200"
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-xl font-semibold ${
                      
                        item.status === "current" ? "text-primary-content" : 
                        "text-base-content"
                      }`}>
                        {item.title}
                      </h3>
                      <span className={` rounded  px-2 py-1 text-center ${
                        item.status === "completed" ? "badge-success text-success-content font-bold" : 
                        item.status === "current" ? "badge-primary text-primary-content font-bold" : 
                        "badge-ghost"
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                    <p className={`text-sm mb-4 ${
                     
                      item.status === "current" ? "text-primary-content/80" :
                      "text-base-content/70"
                    }`}>
                      {item.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4 flex-col lg:flex-row flex-wrap justify-center items-center">
                      <button
                        onClick={() => updateStatus(item.id)}
                        className={`btn btn-sm ${
                          item.status === "completed" ? "btn-success text-success-content" :
                          item.status === "current" ? "btn-primary text-primary-content" :
                          "btn-neutral"
                        }`}
                      >
                        {item.status === "completed" ? "Mark as Not Completed" : "Mark as Completed"}
                      </button>

                      <button className={`btn btn-sm btn-ghost ${
                        item.status === "current" ? "text-primary-content" :
                        "text-base-content"
                      }`} onClick={(()=>handleMoreInfoClick(index))}>
                        More Info
                      </button>
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className="md:absolute left-1/2 -translate-x-1/2 hidden md:flex">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    item.status === "completed" ? "bg-success text-success-content ring-4 ring-success/30" : 
                    item.status === "current" ? "bg-primary text-primary-content ring-4 ring-primary/30" : 
                    "bg-base-300 text-base-content ring-2 ring-base-content/20"
                  }`}>
                    {item.status === "completed" ? (
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : item.status === "current" ? (
                      <svg className="w-7 h-7 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    }
    </>
    
  );
}


export default RoadMapPage;
