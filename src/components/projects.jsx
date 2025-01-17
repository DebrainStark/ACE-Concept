import React from "react";
import { ChevronRight } from "react-feather";
import projectsData from "../data/projectData"; // Make sure this import is correct

const Projects = ({ projects = projectsData }) => {
  // Use default value if no props passed
  return (
    <div className="py-24 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Discover our latest and most impressive event productions
          </p>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl shadow-2xl shadow-blue-500/10 transform hover:scale-105 transition-all duration-300"
            >
              {/* Use the correct image URL from project data */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                <div
                  className="bg-cover bg-center w-full h-64 transform group-hover:scale-110 transition-all duration-700"
                  style={{ backgroundImage: `url(${project.image})` }} // Set background image dynamically
                ></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-300">{project.category}</p>
                <button className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  View Project <ChevronRight className="ml-1" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
