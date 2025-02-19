import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoadMapSeparatePage from "./RoadMapSeparatePage";

function RoadMapPage() {
    const [separatePageVisibleFlag, setSeparatePageVisibleFlag] = useState(false);
    const [header, setHeader] = useState("")
    const [description, setDescription] = useState("")
    const [reasourcesLink, setReasourcesLink] = useState(null)

    const initialRoadmapData = [
      { 
          "id": 1,
          "title": "Introduction to Web Development", 
          "description": "Learn the basics of how websites work, the internet, and key technologies like HTML, CSS, and JavaScript.",
          "status": "completed",
          "links": [
              {
                  "topic": "Intro To Web",
                  "link": "https://example.com/intro-to-web"
              }
          ]
      },
      { 
          "id": 2,
          "title": "HTML & CSS Fundamentals", 
          "description": "Understand HTML structure and semantic elements. Learn CSS for styling, layouts, and responsive design.",
          "status": "completed",
          "links": [
              {
                  "topic": "HTML Basics",
                  "link": "https://example.com/html-basics"
              },
              {
                  "topic": "CSS Fundamentals",
                  "link": "https://example.com/css-fundamentals"
              }
          ]
      },
      { 
          "id": 3,
          "title": "JavaScript Basics", 
          "description": "Explore JavaScript fundamentals, including variables, functions, loops, DOM manipulation, and event handling.",
          "status": "current",
          "links": [
              {
                  "topic": "JavaScript Introduction",
                  "link": "https://example.com/javascript-intro"
              },
              {
                  "topic": "JavaScript DOM",
                  "link": "https://example.com/javascript-dom"
              }
          ]
      }
  ]
  
  const [roadmapData, setRoadmapData] = useState(initialRoadmapData);

  const updateStatus = (id) => {
    setRoadmapData(prevData =>
      prevData.map(item =>
        item.id === id
          ? { ...item, status: item.status === "completed" ? "upcoming" : "completed" }
          : item
      )
    );
  };

  useEffect(() => {
    if (reasourcesLink && !separatePageVisibleFlag) {
      setSeparatePageVisibleFlag(true);
    }
  }, [reasourcesLink]); // Ensure correct spelling
  
  const handleMoreInfoClick = (index) => {
    setHeader(initialRoadmapData[index].title);
    setDescription(initialRoadmapData[index].description);
    setReasourcesLink(initialRoadmapData[index].links); // Ensure correct spelling
    console.log("hello");
  };
  
  const handleBack = () =>{
    setSeparatePageVisibleFlag(false);
  }

  return (
    <>
    {
      separatePageVisibleFlag ? 
      <div className="relative">
      <button className="btn  btn-primary-outline  absolute top-2 left-5 z-[11] border border-solid border-1" onClick={handleBack} >
                      Back
                      </button>
        <RoadMapSeparatePage header = {header} description={description} reasourcesLink={reasourcesLink}/>
      </div> :
      <div className="w-full max-w-4xl mx-auto p-8 custom-FontFamily ">
      <div className="bg-base-200 rounded-xl p-8 shadow-xl  border">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-base-content mb-2">Roadmap</h1>
        </div>

        {/* Main vertical line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-32 bottom-20 w-1 bg-base-content/20 -translate-x-1/2 z-0"></div>

        <div className="relative z-10">
          {roadmapData.map((item, index) => (
            <div key={item.id} className="mb-16 relative">
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
