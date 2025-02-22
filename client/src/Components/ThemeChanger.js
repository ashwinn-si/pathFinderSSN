import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeChanger = () => {
    const themes = ["lofi", "dim"];
    const [selectedTheme, setSelectedTheme] = useState(() => {
        return localStorage.getItem("theme") || "lofi";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", selectedTheme);
    }, [selectedTheme]);

    function handleThemeToggle() {
        const newTheme = selectedTheme === "lofi" ? "dim" : "lofi";
        setSelectedTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    return (
        <div className="fixed top-5 lg:top-6 right-[4%] z-[9996]">
            <button
                className={`btn m-1 border-primary border-[1px] rounded-lg flex items-center gap-2 px-4 py-2 
        ${selectedTheme === "lofi" ? "bg-gray-300 border-red-800" : "bg-gray-900 border-primary text-white"}
        `}

                onClick={handleThemeToggle}
            >
                {selectedTheme === "lofi" ? (
                    <FiSun className="text-yellow-800" />
                ) : (
                    <FiMoon className="text-gray-500" />
                )}
            </button>
        </div>
    );
};

export default ThemeChanger;
