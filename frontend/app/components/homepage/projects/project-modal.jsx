"use client";

import { useEffect } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { getStrapiURL } from "../../../../utils/api-helpers";

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const imageUrl = project.attributes.image?.data?.attributes?.url;
  const imageFullUrl = imageUrl ? getStrapiURL(imageUrl) : null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-[95vh] flex flex-col bg-gradient-to-br from-[#0d1224] to-[#0a0d37] rounded-xl border-2 border-[#1b2c68a0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-red-500/90 hover:bg-red-600 text-white transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg"
          aria-label="Close modal"
        >
          <FaTimes size={24} />
        </button>

        {/* Header */}
        <div className="flex-shrink-0 bg-gradient-to-r from-[#0d1224] to-[#0a0d37] border-b border-[#1b2c68a0]">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-4 lg:py-6 relative">
            <div className="flex flex-row space-x-1 lg:space-x-2 absolute top-1/2 -translate-y-1/2 left-4">
              <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
              <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
              <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
            </div>
            <p className="text-center ml-3 pr-12 text-[#16f2b3] text-xl lg:text-3xl font-bold">
              {project.attributes.name}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-10 py-6 lg:py-8">
          {/* Project Details */}
          <div className="space-y-6">
            {/* Tools */}
            <div>
              <h3 className="text-[#16f2b3] text-xl font-bold mb-3">
                Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.attributes.tools.data.map((tool, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-[#1a1443] text-amber-300 rounded-full text-base border border-violet-500/30 shadow-md"
                  >
                    {tool.attributes.toolname}
                  </span>
                ))}
              </div>
            </div>

            {/* Role */}
            <div>
              <h3 className="text-[#16f2b3] text-xl font-bold mb-3">
                My Role
              </h3>
              <p className="text-orange-400 text-lg">
                {project.attributes.role}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-[#16f2b3] text-xl font-bold mb-3">
                Description
              </h3>
              <p className="text-cyan-400 text-lg leading-relaxed">
                {project.attributes.description}
              </p>
            </div>
          </div>

          {/* Image */}
          {imageFullUrl && (
            <div className="mt-8 pb-4">
              <div className="relative w-full h-72 md:h-[500px] rounded-xl overflow-hidden border-2 border-violet-500/40 shadow-xl">
                <Image
                  src={imageFullUrl}
                  alt={project.attributes.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
