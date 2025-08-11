import React, { useEffect, useState } from "react";

export default function About({ darkMode }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-16 transition-colors duration-700 ease-in-out ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-900"
      }`}
    >
      {/* Heading: Slide down + fade in */}
      <h1
        className={`text-5xl font-extrabold mb-12 text-center text-yellow-400 transition-transform duration-1000 ease-in-out ${
          animate
            ? "translate-y-0 opacity-100"
            : "-translate-y-16 opacity-0"
        }`}
      >
        About NextGenSites
      </h1>

      <div className="flex flex-col md:flex-row gap-12 max-w-5xl">
        {/* Left side text */}
        <div
          className={`flex-1 text-lg leading-relaxed transition-transform duration-[1300ms] ease-in-out ${
            animate
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <p className="mb-6">
            Welcome to <strong>NextGenSites</strong>, a cutting-edge platform where every line
            of code is powered by <span className="font-semibold text-yellow-300">Artificial Intelligence</span>.
            Our entire codebase is generated from AI-assisted prompts, combining innovation
            with efficiency to bring you a modern web experience.
          </p>
          <p className="mb-6">
            This approach allows us to rapidly develop scalable and adaptive projects without
            compromising quality. We harness state-of-the-art AI models to translate creative
            ideas into clean, maintainable code.
          </p>
        </div>

        {/* Right side text */}
        <div
          className={`flex-1 text-lg leading-relaxed transition-transform duration-[1300ms] ease-in-out ${
            animate
              ? "translate-x-0 opacity-100"
              : "translate-x-[150%] opacity-0"
          }`}
        >
          <p className="mb-6">
            All projects showcased here are also conceptualized and built with AI's assistance,
            making NextGenSites a living example of how AI can augment human creativity and
            productivity in software development.
          </p>
          <p>
            Whether it's frontend design, backend logic, or deployment pipelines, AI helps
            streamline the entire lifecycle — saving time and unlocking new possibilities.
          </p>
          <p className="italic text-yellow-300 mt-6">
            Explore the future today, where AI and developers collaborate to craft the next
            generation of websites.
          </p>
        </div>
      </div>
    </div>
  );
}
