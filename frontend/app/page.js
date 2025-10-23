import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/homepage/about";
import Experience from "./components/homepage/experience";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";
import Education from "./components/homepage/education";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";

import fetchStrapiExperienceData from "../utils/data/experience_strapi.js";
import fetchStrapiEducationData from "../utils/data/educations_strapi";
import fetchStrapiPersonalData from "../utils/data/personaldata_strapi";
import fetchStrapiProjectsData from "../utils/data/projects_strapi";

async function getBlogArticles() {
  try {
    const res = await fetch("https://dev.to/api/articles?username=said7388", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const articles = await res.json();
    return articles
      .filter((article) => article?.cover_image)
      .sort(() => 0.5 - Math.random());
  } catch (error) {
    console.error("Failed to fetch blog articles:", error);
    return [];
  }
}

export default async function Home() {
  const [experienceData, educationData, personalData, projectsData, blogArticles] =
    await Promise.all([
      fetchStrapiExperienceData(),
      fetchStrapiEducationData(),
      fetchStrapiPersonalData(),
      fetchStrapiProjectsData(),
      getBlogArticles(),
    ]);

  return (
    <>
      <HeroSection data={personalData} />
      <AboutSection data={personalData} />
      <Experience data={experienceData} />
      <Skills />
      <Projects data={projectsData} />
      <Education data={educationData} />
      <Blog blogs={blogArticles} />
      <ContactSection data={personalData} />
    </>
  );
}
