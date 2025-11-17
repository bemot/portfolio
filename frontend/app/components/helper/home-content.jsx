"use client";
// Fixed: Token is now optional for public API access
import { useLanguage } from "../../../contexts/LanguageContext";
import HeroSection from "../homepage/hero-section";
import AboutSection from "../homepage/about";
import Experience from "../homepage/experience";
import Skills from "../homepage/skills";
import Projects from "../homepage/projects";
import Certificates from "../homepage/certificates";
import Education from "../homepage/education";
// import Blog from "../homepage/blog"; // Temporarily disabled
import ContactSection from "../homepage/contact";
import { useEffect, useState } from "react";
import SkeletonLoader from "./skeleton-loader";
import FadeInSection from "./fade-in-section";

export default function HomeContent() {
  const { locale } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

        const [personalRes, experienceRes, educationRes, projectsRes, skillsRes, contactFormRes, certificatesRes] = await Promise.all([
          fetch(`${strapiUrl}/api/personal-data?populate=*&locale=${locale}`, { cache: 'no-store' }),
          fetch(`${strapiUrl}/api/experiences?populate=*&sort=id:desc&locale=${locale}`, { cache: 'no-store' }),
          fetch(`${strapiUrl}/api/educations?populate=*&locale=${locale}`, { cache: 'no-store' }),
          fetch(`${strapiUrl}/api/projects?populate=*&locale=${locale}`, { cache: 'no-store' }),
          fetch(`${strapiUrl}/api/skills?populate=local_icon&locale=${locale}`, { cache: 'no-store' }),
          fetch(`${strapiUrl}/api/contact-form?locale=${locale}`, { cache: 'no-store' }),
          fetch(`${strapiUrl}/api/coursera-cetificats?populate=*&locale=${locale}`, { cache: 'no-store' }),
          // fetch("https://dev.to/api/articles?username=said7388", { next: { revalidate: 3600 } }), // Temporarily disabled
        ]);

        const [personal, experience, education, projects, skills, contactForm, certificates] = await Promise.all([
          personalRes.json(),
          experienceRes.json(),
          educationRes.json(),
          projectsRes.json(),
          skillsRes.json(),
          contactFormRes.json(),
          certificatesRes.json(),
          // blogRes.json(), // Temporarily disabled
        ]);

        // Fallback to English if Ukrainian content not available
        let personalData = personal.data;
        if (!personalData && locale === 'uk') {
          const fallbackRes = await fetch(`${strapiUrl}/api/personal-data?populate=*&locale=en`);
          const fallbackData = await fallbackRes.json();
          personalData = fallbackData.data;
        }

        setData({
          personalData: { strapi_personal_data: personalData },
          experienceData: { strapi_experience_data: experience.data || [] },
          educationData: { strapi_education_data: education.data || [] },
          projectsData: { strapi_projects_data: projects.data || [] },
          skillsData: { strapi_skills_data: skills.data || [] },
          contactFormData: { strapi_contact_form_data: contactForm.data },
          certificatesData: { strapi_certificates_data: certificates.data || [] },
          // blogArticles: blogs?.filter((article) => article?.cover_image)?.sort(() => 0.5 - Math.random()) || [], // Temporarily disabled
        });
      } catch (error) {
        // Error fetching data - will show loading state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading || !data) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <HeroSection data={data.personalData} />
      <FadeInSection>
        <AboutSection data={data.personalData} />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <Education data={data.educationData} />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <Experience data={data.experienceData} />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <Skills data={data.skillsData} />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <Projects data={data.projectsData} />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <Certificates data={data.certificatesData} />
      </FadeInSection>
      {/* <Blog blogs={data.blogArticles} /> */} {/* Temporarily disabled */}
      <FadeInSection delay={0.1}>
        <ContactSection personalData={data.personalData} contactFormData={data.contactFormData} />
      </FadeInSection>
    </>
  );
}
