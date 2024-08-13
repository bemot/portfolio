"use client";
// Import necessary modules
import React, { useState, useEffect } from "react";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Spinner from "./components/spinner"; // Import the spinner component

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
        const experienceData = await fetchStrapiExperienceData();
        const educationData = await fetchStrapiEducationData();
        const personalData = await fetchStrapiPersonalData();
        const res = await fetch(
          "https://dev.to/api/articles?username=said7388",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        const filtered = data
          .filter((item) => item?.cover_image)
          .sort(() => Math.random() - 0.5);

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
    <>
      <HeroSection data={data.personalData} />
      <AboutSection data={data.personalData} />
      <Experience data={data.experienceData} />
      <Skills />
      <Projects />
      <Education data={data.educationData} />
      <Blog blogs={data.filtered} />
      <ContactSection data={data.personalData} />
    </>
  );
}
