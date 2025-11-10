"use client";
//import { projectsData } from "../../../../utils/data/projects-data";

import { useState } from "react";
import ProjectCard from "./project-card";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslation } from "../../../../utils/translations";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProjectsSection = ({ data }) => {
  const { locale } = useLanguage();
  const { t } = useTranslation(locale);
  
  const projects = data?.strapi_projects_data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  if (projects.length === 0) return null;

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to projects section
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="projects" className="relative z-50 my-12 lg:my-24">
      <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl opacity-30"></div>
      <div className="flex items-center justify-start relative mb-12">
        <span className="bg-[#1a1443] w-fit text-white px-5 py-3 text-xl rounded-md">
          {t('projects.title')}
        </span>
        <span className="w-full h-[2px] bg-[#1a1443]"></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {currentProjects.map((project, index) => (
          <div key={index} className="w-full">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
              currentPage === 1
                ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
                : 'bg-[#1a1443] border-violet-500/50 text-white hover:bg-[#16f2b3] hover:text-[#0d1224] hover:border-[#16f2b3] hover:scale-105'
            }`}
          >
            <FaChevronLeft />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-lg border-2 font-bold transition-all duration-300 ${
                  currentPage === pageNum
                    ? 'bg-[#16f2b3] text-[#0d1224] border-[#16f2b3] scale-110'
                    : 'bg-[#1a1443] border-violet-500/50 text-white hover:bg-violet-600 hover:border-violet-400 hover:scale-105'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
                : 'bg-[#1a1443] border-violet-500/50 text-white hover:bg-[#16f2b3] hover:text-[#0d1224] hover:border-[#16f2b3] hover:scale-105'
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
