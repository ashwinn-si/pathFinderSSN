import { useState } from "react";

function RoadMapPage() {
    const initialRoadmapData = [
        { 
            id: 1,
            title: "Introduction to Web Development", 
            description: "Learn the basics of how websites work, the internet, and key technologies like HTML, CSS, and JavaScript.",
            status: "completed"
        },
        { 
            id: 2,
            title: "HTML & CSS Fundamentals", 
            description: "Understand HTML structure and semantic elements. Learn CSS for styling, layouts, and responsive design.",
            status: "completed"
        },
        { 
            id: 3,
            title: "JavaScript Basics", 
            description: "Explore JavaScript fundamentals, including variables, functions, loops, DOM manipulation, and event handling.",
            status: "current"
        },
        { 
            id: 4,
            title: "Version Control & Git", 
            description: "Learn Git and GitHub for tracking changes, collaborating on projects, and handling repositories efficiently.",
            status: "upcoming"
        },
        { 
            id: 5,
            title: "Responsive Design & CSS Frameworks", 
            description: "Master media queries for mobile-friendly websites. Explore frameworks like Bootstrap and Tailwind CSS for faster development.",
            status: "upcoming"
        }
        
    ];
    
    
    

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

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-xl relative">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Roadmap</h1>
          
        </div>

        {/* Main vertical line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-32 bottom-20 w-1 bg-gray-700 -translate-x-1/2 z-0"></div>

        <div className="relative z-10">
          {roadmapData.map((item, index) => (
            <div key={item.id} className="mb-16 relative">
              <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Roadmap Content */}
                <div className="w-full md:w-5/12 group">
                  <div className="bg-gray-800/60 backdrop-blur rounded-lg p-5 border-t border-gray-700 hover:bg-gray-800/80 transition-colors relative">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`text-xl font-semibold ${item.status === "completed" ? "text-success" : item.status === "current" ? "text-primary" : "text-gray-300"}`}>
                        {item.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full 
                            ${item.status === "completed" ? "bg-success text-success-content" : 
                            item.status === "current" ? "bg-primary text-primary-content" : 
                            "bg-gray-900 text-gray-400"}`}
                        >
                        {index + 1}
                        </span>

                    </div>
                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>


                    {/* Mark as Completed Button */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => updateStatus(item.id)}
                            className="mt-4 px-4 py-2 text-sm font-medium text-white rounded transition-colors bg-primary hover:bg-primary-focus"
                        >
                            {item.status === "completed" ? "Mark as Not Completed" : "Mark as Completed"}
                        </button>

                        <button
                            className="mt-4 px-4 py-2 text-sm font-medium text-white rounded transition-colors bg-neutral hover:bg-neutral-focus"
                        >
                            More Info
                        </button>
                    </div>
                    
                  </div>
                </div>

                {/* Center Node */}
                <div className="md:absolute left-1/2 -translate-x-1/2 hidden md:flex">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === "completed" ? "bg-success" : item.status === "current" ? "bg-primary ring-2 ring-primary-focus/50" : "bg-gray-800"}`}>
                    {/* Status Icon */}
                    {item.status === "completed" ? (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : item.status === "current" ? (
                      <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        {/* Legend */}
        <div className="absolute bottom-6 right-6 p-3 bg-gray-800/60 backdrop-blur rounded-lg">
          <p className="text-gray-400 text-sm">Legend:</p>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center text-success">✔ Completed</span>
            <span className="flex items-center text-primary">● Current</span>
            <span className="flex items-center text-gray-400">○ Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadMapPage;
