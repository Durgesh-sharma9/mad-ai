import React, { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Project One",
    description:
      "This is a detailed description for Project One. It explains what the project is about.",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=800&q=80",
    ],
    link: "#",
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "This is a detailed description for Project Two. It explains the technologies and features.",
    images: [
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    ],
    link: "#",
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "This is a detailed description for Project Three. It explains goals and achievements.",
    images: [
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    ],
    link: "#",
  },
  {
    id: 4,
    title: "Project Four",
    description:
      "This is a detailed description for Project Four. It covers key aspects and goals.",
    images: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    ],
    link: "#",
  },
];

export default function Home({ darkMode }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [cardImageIndices, setCardImageIndices] = useState(
    projects.reduce((acc, p) => {
      acc[p.id] = 0;
      return acc;
    }, {})
  );

  const modalScrollRef = useRef(null);

  // Cycle project images every 3 seconds on cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCardImageIndices((prev) => {
        const newIndices = { ...prev };
        projects.forEach((project) => {
          newIndices[project.id] =
            (newIndices[project.id] + 1) % project.images.length;
        });
        return newIndices;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Smooth continuous left-right auto scroll for modal images without scrollbar
  useEffect(() => {
    if (!selectedProject) return;
    const scrollContainer = modalScrollRef.current;
    if (!scrollContainer) return;

    let scrollPos = 0;
    let direction = 1;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const speed = 0.5; // pixels per frame

    let animationFrameId;

    const smoothScroll = () => {
      scrollPos += speed * direction;
      if (scrollPos >= maxScroll) direction = -1;
      else if (scrollPos <= 0) direction = 1;
      scrollContainer.scrollLeft = scrollPos;
      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedProject]);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 px-6 py-16 pt-28 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto ${
          selectedProject ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <h1 className="text-5xl font-bold mb-4 text-center animate-fadeInDown">
          Welcome to <span className="text-yellow-400">NextGenSites</span>
        </h1>

        <p className="mb-10 text-center max-w-3xl mx-auto text-lg opacity-80">
          Explore our latest projects showcasing innovative designs and cutting-edge
          technologies.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-2xl backdrop-blur-lg hover:bg-white/40 transition transform hover:scale-105 hover:shadow-xl duration-300 flex flex-col animate-fadeInUp"
            >
              <img
                src={project.images[cardImageIndices[project.id]]}
                alt={project.title}
                className="rounded-lg w-full h-48 object-cover mb-4 transition-opacity duration-1000 ease-in"
                loading="lazy"
                draggable={false}
              />
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-sm line-clamp-3">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md z-50"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center z-60 p-6">
            <div
              className={`rounded-3xl max-w-5xl w-full max-h-[90vh] p-8 relative overflow-hidden flex flex-col gap-6 ${
                darkMode
                  ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
                  : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 text-gray-300 hover:text-red-500 text-5xl font-bold cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>

              {/* Scrollable images without scrollbar and smooth animation */}
              <div
                ref={modalScrollRef}
                className="flex space-x-6 rounded-lg pt-10 overflow-hidden"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {selectedProject.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${selectedProject.title} image ${i + 1}`}
                    className="h-72 rounded-lg object-cover flex-shrink-0 select-none"
                    loading="lazy"
                    draggable={false}
                  />
                ))}
              </div>

              {/* Details */}
              <div className="mt-4">
                <h2 className="text-4xl font-bold mb-4">{selectedProject.title}</h2>
                <p className="mb-8">{selectedProject.description}</p>

                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition"
                >
                  Visit Project
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tailwind Animations */}
      <style>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 1s ease forwards;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
      `}</style>
    </div>
  );
}
