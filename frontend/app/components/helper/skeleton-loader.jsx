"use client";

export const SkeletonCard = () => {
  return (
    <div className="bg-[#101123] border border-[#2a2e5a] rounded-xl p-3 sm:p-5 animate-pulse">
      <div className="h-4 bg-[#1a1443] rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-[#1a1443] rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-[#1a1443] rounded w-full"></div>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 px-4">
      {/* Logo Skeleton */}
      <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 animate-pulse"></div>
      
      {/* Title Skeleton */}
      <div className="space-y-3 w-full max-w-md">
        <div className="h-8 bg-[#1a1443] rounded w-3/4 mx-auto animate-pulse"></div>
        <div className="h-6 bg-[#1a1443] rounded w-1/2 mx-auto animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-[#16f2b3] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#16f2b3] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-[#16f2b3] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      
      <p className="text-[#16f2b3] text-xl font-medium">Loading Portfolio...</p>
    </div>
  );
};

export default SkeletonLoader;
