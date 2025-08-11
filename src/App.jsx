import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import About from "../components/About";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      {/* Add 'dark' class for tailwind dark variants */}
      <div className={darkMode ? "dark" : ""}>
        {/* Pass darkMode state & toggle to Navbar */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}
