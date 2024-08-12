//import { fetchAPI } from "@/utils/fetch-api";

//import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

//fetch strapi data
// async function fetchStrapiPersonalData() {
//   try {
//     const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
//
//     const options = { headers: { Authorization: `Bearer ${token}` } };
//
//     const strapiPersonalDataResponse = await fetchAPI(
//       "/personal-data",
//       { populate: "*" },
//       options,
//     );
//
//     return {
//       strapi_personal_data: strapiPersonalDataResponse.data,
//     };
//   } catch (error) {
//     console.error(error);
//   }
// }
//
async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=said7388`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const filtered = data
    .filter((item) => item?.cover_image)
    .sort(() => Math.random() - 0.5);

  return filtered;
}

export default async function Home() {
  const blogs = await getData();
  console.log("i am in main page!");
  // Strapi peesonnal data
  //console.log(PD);
  //const name = "Sasha Bemotoff 2";
  //const designation = "bobik";
  //const github = "githubik";
  ////
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </>
  );
}
