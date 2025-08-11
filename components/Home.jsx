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

  // Cycle project images every 3 seconds
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

  // Auto scroll modal images left <-> right
  useEffect(() => {
    if (!selectedProject) return;

    const scrollContainer = modalScrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    let direction = 1;
    const maxScrollLeft =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const step = 0.3;

    let animationFrameId;

    function scroll() {
      scrollAmount += step * direction;
      if (scrollAmount >= maxScrollLeft) {
        direction = -1;
      } else if (scrollAmount <= 0) {
        direction = 1;
      }
      scrollContainer.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(scroll);
    }

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedProject]);

  const openModal = (project) => setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 px-6 py-16 ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      }`}
    >
      {/* Main content wrapper */}
      <div
        className={`max-w-6xl mx-auto mt-20 ${
          selectedProject ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <h1 className="text-5xl font-bold mb-4 text-center">
          Welcome to <span className="text-yellow-400">NextGenSites</span>
        </h1>

        {/* New paragraph added here */}
        <p className="mb-10 text-center max-w-3xl mx-auto text-lg opacity-80">
          Explore our latest projects showcasing innovative designs and
          cutting-edge technologies.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="cursor-pointer rounded-xl bg-white/20 p-4 shadow-2xl backdrop-blur-lg hover:bg-white/40 transition flex flex-col"
            >
              <img
                src={project.images[cardImageIndices[project.id]]}
                alt={project.title}
                className="rounded-lg w-full h-48 object-cover mb-4 transition-opacity duration-1000 ease-in"
                loading="lazy"
              />
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-sm line-clamp-3">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6">
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

            {/* Scrollable images */}
            <div
              ref={modalScrollRef}
              className="flex overflow-x-auto space-x-6 rounded-lg no-scrollbar pt-10"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {selectedProject.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${selectedProject.title} image ${i + 1}`}
                  className="h-72 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
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
      )}
    </div>
  );
}
