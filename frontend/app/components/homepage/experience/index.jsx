"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from "/public/lottie/code.json";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslation } from "../../../../utils/translations";
import { useState } from "react";
import { getStrapiMedia } from "../../../../utils/api-helpers";

const AnimationLottie = dynamic(() => import("../../helper/animation-lottie"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="animate-pulse bg-[#1a1443] rounded-lg w-full h-64"></div></div>
});
const GlowCard = dynamic(() => import("../../helper/glow-card"), {
  ssr: false,
  loading: () => <div className="bg-[#101123] border border-[#2a2e5a] rounded-xl p-3 sm:p-5"><div className="animate-pulse h-20 bg-[#1a1443] rounded"></div></div>
});
//import React, { useState, useEffect } from "react";
//import { getStrapiURL } from "../../../../utils/api-helpers";

//import fetchStrapiExperienceData from "../../../../utils/data/experience_strapi";
const ExperienceSection = ({ data }) => {
  const { locale } = useLanguage();
  const { t } = useTranslation(locale);
  const [selectedExperience, setSelectedExperience] = useState(null);
  
  const experiences = data?.strapi_experience_data || [];

  if (experiences.length === 0) return null;

  return (
    <div
      id="experience"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            {t('experience.title')}
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {experiences.map((experience) => {
                const pictureUrl = experience.attributes.picture?.data?.attributes?.url;
                const pictureFullUrl = pictureUrl ? getStrapiMedia(pictureUrl) : null;
                
                return (
                  <GlowCard
                    key={experience.id}
                    identifier={`experience-${experience.id}`}
                  >
                    <div 
                      className="p-3 relative text-white cursor-pointer"
                      onClick={() => setSelectedExperience(experience)}
                    >
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {experience.attributes.time_from_to}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div className="flex-1">
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                            {experience.attributes.place}
                          </p>
                          <p className="text-sm sm:text-base font-medium uppercase">
                            {experience.attributes.position}
                          </p>
                          <p className="text-base sm:text-xl mb-2 font-small">
                            {experience.attributes.jobs}
                          </p>
                        </div>
                        {pictureFullUrl && (
                          <div className="flex-shrink-0">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-violet-500 hover:border-[#16f2b3] transition-all duration-300 hover:scale-110">
                              <Image
                                src={pictureFullUrl}
                                alt="Experience picture"
                                fill
                                sizes="(max-width: 640px) 64px, 80px"
                                className="object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </GlowCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Experience Modal */}
      {selectedExperience && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedExperience(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#0d1224] border border-[#1b2c68a0] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedExperience(null)}
              className="sticky top-4 float-right mr-4 text-white text-3xl hover:text-[#16f2b3] transition-colors z-10"
            >
              ✕
            </button>
            
            <div className="p-8">
              {/* Content Section */}
              <div className="text-white space-y-4">
                <div className="text-center mb-6">
                  <p className="text-sm text-[#16f2b3] mb-2">
                    {selectedExperience.attributes.time_from_to}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-violet-500">
                    <BsPersonWorkspace size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[#16f2b3]">
                      {selectedExperience.attributes.place}
                    </h3>
                    <p className="text-xl font-medium uppercase text-violet-400">
                      {selectedExperience.attributes.position}
                    </p>
                  </div>
                </div>
                
                {selectedExperience.attributes.jobs && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-[#16f2b3] mb-3">
                      {t('experience.responsibilities') || 'Responsibilities'}:
                    </h4>
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {selectedExperience.attributes.jobs}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Image Section */}
              {selectedExperience.attributes.picture?.data?.attributes?.url && (
                <div className="mt-6 flex justify-center">
                  <div className="relative w-full max-w-2xl rounded-lg overflow-hidden border-2 border-violet-500">
                    <Image
                      src={getStrapiMedia(selectedExperience.attributes.picture.data.attributes.url)}
                      alt="Experience picture"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
