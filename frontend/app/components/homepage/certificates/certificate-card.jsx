// @flow strict

"use client";

import * as React from "react";
import Image from "next/image";
import { getStrapiURL } from "../../../../utils/api-helpers";

function CertificateCard({ certificate }) {
  
  // Get image URL from Strapi
  const imageUrl = certificate.attributes.picture?.data?.attributes?.url;
  const imageFullUrl = imageUrl ? getStrapiURL(imageUrl) : null;
  
  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full transition-all duration-300 hover:shadow-[0_0_30px_0_rgba(22,242,179,0.3)] hover:border-[#16f2b3]/50">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        <div className="flex flex-row space-x-1 lg:space-x-2 absolute top-1/2 -translate-y-1/2">
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-red-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-orange-400"></div>
          <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-200"></div>
        </div>
        <p className="text-center ml-3 text-[#16f2b3] text-base lg:text-xl">
          {certificate.attributes.certificate_name}
        </p>
      </div>
      <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
        <code className="font-mono text-xs md:text-sm lg:text-base">
          <div className="blink">
            <span className="mr-2 text-pink-500">const</span>
            <span className="mr-2 text-white">certificate</span>
            <span className="mr-2 text-pink-500">=</span>
            <span className="text-gray-400">{"{"}</span>
          </div>

          <div>
            <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
            <span className="text-gray-400">{`'`}</span>
            <span className="text-amber-300">{certificate.attributes.certificate_name}</span>
            <span className="text-gray-400">{`',`}</span>
          </div>

          {certificate.attributes.provider && (
            <div className="ml-4 lg:ml-8 mr-2">
              <span className="text-white">provider:</span>
              <span className="text-cyan-400">
                {" " + certificate.attributes.provider}
              </span>
              <span className="text-gray-400">,</span>
            </div>
          )}

          {certificate.attributes.institution && (
            <div className="ml-4 lg:ml-8 mr-2">
              <span className="text-white">institution:</span>
              <span className="text-orange-400">
                {" " + certificate.attributes.institution}
              </span>
              <span className="text-gray-400">,</span>
            </div>
          )}

          {certificate.attributes.link && (
            <div className="ml-4 lg:ml-8 mr-2">
              <span className="text-white">link:</span>
              <span className="text-gray-400">{` '`}</span>
              <span className="text-violet-400">
                {certificate.attributes.link}
              </span>
              <span className="text-gray-400">{`',`}</span>
            </div>
          )}
          
          {imageFullUrl && (
            <div className="ml-4 lg:ml-8 mr-2 my-4 group-hover:scale-105 transition-transform duration-300">
              {certificate.attributes.link ? (
                <a 
                  href={certificate.attributes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full h-48 sm:h-64 md:h-72 rounded-lg overflow-hidden border-2 border-violet-500/30 hover:border-[#16f2b3] transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={imageFullUrl}
                    alt={certificate.attributes.certificate_name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </a>
              ) : (
                <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-lg overflow-hidden border-2 border-violet-500/30 hover:border-[#16f2b3] transition-all duration-300">
                  <Image
                    src={imageFullUrl}
                    alt={certificate.attributes.certificate_name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
            </div>
          )}
          
          <div>
            <span className="text-gray-400">{`};`}</span>
          </div>
        </code>
      </div>
    </div>
  );
}

export default CertificateCard;
