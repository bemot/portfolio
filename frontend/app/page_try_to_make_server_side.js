// app/page.tsx
"use client"; // Enable the client-side rendering mode
import React from "react";
import dynamic from "next/dynamic";
import Spinner from "../app/components/spinner.js"; // Update the path as necessary

// Dynamically import components with SSR support
const HeroSection = dynamic(
  () => import("../app/components/homepage/hero-section"),
  {
    loading: () => <Spinner />,
    ssr: true,
  },
);
const AboutSection = dynamic(() => import("../app/components/homepage/about"), {
  loading: () => <Spinner />,
  ssr: true,
});
const Experience = dynamic(
  () => import("../app/components/homepage/experience"),
  {
    loading: () => <Spinner />,
    ssr: true,
  },
);
const Skills = dynamic(() => import("../app/components/homepage/skills"), {
  loading: () => <Spinner />,
  ssr: true,
});
const Projects = dynamic(() => import("../app/components/homepage/projects"), {
  loading: () => <Spinner />,
  ssr: true,
});
const Education = dynamic(
  () => import("../app/components/homepage/education"),
  {
    loading: () => <Spinner />,
    ssr: true,
  },
);
const Blog = dynamic(() => import("../app/components/homepage/blog"), {
  loading: () => <Spinner />,
  ssr: true,
});
const ContactSection = dynamic(
  () => import("../app/components/homepage/contact"),
  {
    loading: () => <Spinner />,
    ssr: true,
  },
);

export const loader = async () => {
  try {
    const [experienceData, educationData, personalData, projectsData, res] =
      await Promise.all([
        fetchStrapiExperienceData(),
        fetchStrapiEducationData(),
        fetchStrapiPersonalData(),
        fetchStrapiProjectsData(),
        fetch("https://dev.to/api/articles?username=said7388"),
      ]);

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    const articles = await res.json();
    const filtered = articles
      .filter((article) => article?.cover_image)
      .sort(() => 0.5 - Math.random());

    return {
      data: {
        personalData,
        educationData,
        experienceData,
        projectsData,
        filtered,
      },
      hasError: false,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      data: {
        personalData: null,
        educationData: null,
        experienceData: null,
        projectsData: null,
        filtered: null,
      },
      hasError: true,
    };
  }
};

export default function Page({ data, hasError }) {
  if (hasError) {
    return <div>Error loading data...</div>;
  }

  return (
    <div>
      <HeroSection data={data.personalData} />
      <AboutSection data={data.personalData} />
      <Experience data={data.experienceData} />
      <Skills />
      <Projects data={data.projectsData} />
      <Education data={data.educationData} />
      <Blog blogs={data.filtered} />
      <ContactSection data={data.personalData} />
    </div>
  );
}
