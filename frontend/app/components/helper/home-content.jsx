"use client";
import { useLanguage } from "../../../contexts/LanguageContext";
import HeroSection from "../homepage/hero-section";
import AboutSection from "../homepage/about";
import Experience from "../homepage/experience";
import Skills from "../homepage/skills";
import Projects from "../homepage/projects";
import Education from "../homepage/education";
import Blog from "../homepage/blog";
import ContactSection from "../homepage/contact";
import { useEffect, useState } from "react";

export default function HomeContent() {
  const { locale } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        
        console.log(`Fetching data for locale: ${locale}`);
        
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [personalRes, experienceRes, educationRes, projectsRes, skillsRes, blogRes] = await Promise.all([
          fetch(`${strapiUrl}/api/personal-data?populate=*&locale=${locale}`, { headers }),
          fetch(`${strapiUrl}/api/experiences?populate=*&sort=id:desc&locale=${locale}`, { headers }),
          fetch(`${strapiUrl}/api/educations?populate=*&locale=${locale}`, { headers }),
          fetch(`${strapiUrl}/api/projects?populate=*&locale=${locale}`, { headers }),
          fetch(`${strapiUrl}/api/skills?locale=${locale}`, { headers }),
          fetch("https://dev.to/api/articles?username=said7388", { next: { revalidate: 3600 } }),
        ]);

        const [personal, experience, education, projects, skills, blogs] = await Promise.all([
          personalRes.json(),
          experienceRes.json(),
          educationRes.json(),
          projectsRes.json(),
          skillsRes.json(),
          blogRes.json(),
        ]);

        console.log('Personal Data Response:', personal);
        console.log('Experience Response:', experience);
        console.log('Education Response:', education);
        console.log('Projects Response:', projects);
        console.log('Skills Response:', skills);

        // Fallback to English if Ukrainian content not available
        let personalData = personal.data;
        if (!personalData && locale === 'uk') {
          console.log('No Ukrainian personal data, falling back to English');
          const fallbackRes = await fetch(`${strapiUrl}/api/personal-data?populate=*&locale=en`, { headers });
          const fallbackData = await fallbackRes.json();
          personalData = fallbackData.data;
        }

        setData({
          personalData: { strapi_personal_data: personalData },
          experienceData: { strapi_experience_data: experience.data || [] },
          educationData: { strapi_education_data: education.data || [] },
          projectsData: { strapi_projects_data: projects.data || [] },
          skillsData: { strapi_skills_data: skills.data || [] },
          blogArticles: blogs?.filter((article) => article?.cover_image)?.sort(() => 0.5 - Math.random()) || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#16f2b3] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <HeroSection data={data.personalData} />
      <AboutSection data={data.personalData} />
      <Experience data={data.experienceData} />
      <Skills data={data.skillsData} />
      <Projects data={data.projectsData} />
      <Education data={data.educationData} />
      <Blog blogs={data.blogArticles} />
      <ContactSection data={data.personalData} />
    </>
  );
}
