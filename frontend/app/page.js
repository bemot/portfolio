"use client"; // Enable the client-side rendering mode
// Import necessary modules
import React, { useState, useEffect, Suspense, lazy } from "react";
import Spinner from "./components/spinner"; // Import the spinner component

// Lazy load components
const HeroSection = lazy(() => import("./components/homepage/hero-section"));
const AboutSection = lazy(() => import("./components/homepage/about"));
const Experience = lazy(() => import("./components/homepage/experience"));
const Skills = lazy(() => import("./components/homepage/skills"));
const Projects = lazy(() => import("./components/homepage/projects"));
const Education = lazy(() => import("./components/homepage/education"));
const Blog = lazy(() => import("./components/homepage/blog"));
const ContactSection = lazy(() => import("./components/homepage/contact"));

import fetchStrapiExperienceData from "../utils/data/experience_strapi.js";
import fetchStrapiEducationData from "../utils/data/educations_strapi";
import fetchStrapiPersonalData from "../utils/data/personaldata_strapi";

// Main component
export default function Home() {
  const [data, setData] = useState({
    personalData: null,
    educationData: null,
    experienceData: null,
    filtered: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [experienceData, educationData, personalData, res] =
          await Promise.all([
            fetchStrapiExperienceData(),
            fetchStrapiEducationData(),
            fetchStrapiPersonalData(),
            fetch("https://dev.to/api/articles?username=said7388"),
          ]);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const articles = await res.json();
        const filtered = articles
          .filter((article) => article?.cover_image)
          .sort(() => 0.5 - Math.random());

        setData({ personalData, educationData, experienceData, filtered });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <HeroSection data={data.personalData} />
      <AboutSection data={data.personalData} />
      <Experience data={data.experienceData} />
      <Skills />
      <Projects />
      <Education data={data.educationData} />
      <Blog blogs={data.filtered} />
      <ContactSection data={data.personalData} />
    </Suspense>
  );
}
