import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeChanger = () => {
    const themes = ["lofi", "dim"];
    const [selectedTheme, setSelectedTheme] = useState("lofi");

    function handleThemeToggle() {
        const newTheme = selectedTheme === "lofi" ? "dim" : "lofi";
        document.documentElement.setAttribute("data-theme", newTheme);
        setSelectedTheme(newTheme);
    }

    return (
        <div className="fixed top-5 lg:top-6 right-[4%] z-[9996]">
            <button
                className="btn m-1 border-primary border-[1px] flex items-center gap-2 px-4 py-2"
                onClick={handleThemeToggle}
            >
                {selectedTheme === "lofi" ? <FiSun className="text-yellow-500" /> : <FiMoon className="text-gray-500" />}
            </button>
        </div>
    );
};

export default ThemeChanger;
