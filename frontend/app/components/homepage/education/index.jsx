"use client";
import dynamic from "next/dynamic";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from "/public/lottie/study.json";
import Image from "next/image";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { useTranslation } from "../../../../utils/translations";
import { useState } from "react";

const AnimationLottie = dynamic(() => import("../../helper/animation-lottie"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="animate-pulse bg-[#1a1443] rounded-lg w-full h-64"></div></div>
});
const GlowCard = dynamic(() => import("../../helper/glow-card"), {
  ssr: false,
  loading: () => <div className="bg-[#101123] border border-[#2a2e5a] rounded-xl p-3 sm:p-5"><div className="animate-pulse h-20 bg-[#1a1443] rounded"></div></div>
});
import { getStrapiMedia } from "../../../../utils/api-helpers";

//import fetchStrapiEducationData from "../../../../utils/data/educations_strapi";

const EducationSection = ({ data }) => {
  const { locale } = useLanguage();
  const { t } = useTranslation(locale);
  const [selectedEducation, setSelectedEducation] = useState(null);
  
  const educations = data?.strapi_education_data || [];

  if (educations.length === 0) return null;

  return (
    <div
      id="education"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            {t('education.title')}
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {educations.map((education) => {
                const certificateUrl = education.attributes.certificate?.data?.attributes?.url;
                const certificateFullUrl = certificateUrl ? getStrapiMedia(certificateUrl) : null;
                
                return (
                  <GlowCard
                    key={education.id}
                    identifier={`education-${education.id}`}
                  >
                    <div 
                      className="p-3 relative text-white cursor-pointer"
                      onClick={() => setSelectedEducation(education)}
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
                          {education.attributes.years}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div className="flex-1">
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                            {education.attributes.qualification}
                          </p>
                          <p className="text-sm sm:text-base">
                            {education.attributes.institution}
                          </p>
                        </div>
                        {certificateFullUrl && (
                          <div className="flex-shrink-0">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-violet-500 hover:border-[#16f2b3] transition-all duration-300 hover:scale-110">
                              <Image
                                src={certificateFullUrl}
                                alt="Certificate"
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

      {/* Education Modal */}
      {selectedEducation && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setSelectedEducation(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#0d1224] border border-[#1b2c68a0] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEducation(null)}
              className="sticky top-4 float-right mr-4 text-white text-3xl hover:text-[#16f2b3] transition-colors z-10"
            >
              ✕
            </button>
            
            <div className="p-8">
              {/* Content Section */}
              <div className="text-white space-y-4">
                <div className="text-center mb-6">
                  <p className="text-sm text-[#16f2b3] mb-2">
                    {selectedEducation.attributes.years}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-violet-500">
                    <BsPersonWorkspace size={48} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-[#16f2b3]">
                      {selectedEducation.attributes.qualification}
                    </h3>
                    <p className="text-xl text-violet-400">
                      {selectedEducation.attributes.institution}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Certificate Image Section */}
              {selectedEducation.attributes.certificate?.data?.attributes?.url && (
                <div className="mt-6 flex justify-center">
                  <div className="relative w-full max-w-2xl rounded-lg overflow-hidden border-2 border-violet-500">
                    <Image
                      src={getStrapiMedia(selectedEducation.attributes.certificate.data.attributes.url)}
                      alt="Certificate"
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

export default EducationSection;
