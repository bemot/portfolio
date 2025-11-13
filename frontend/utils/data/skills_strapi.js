import { fetchAPI } from "../../utils/fetch-api.tsx";

async function fetchStrapiSkillsData(locale = "en") {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { 
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 }
    };
    const strapiSkillsDataResponse = await fetchAPI(
      "/skills",
      { 
        fields: ['id', 'skillname'],
        populate: 'local_icon',
        sort: ['id:asc'],
        locale
      },
      options,
    );

    return {
      strapi_skills_data: strapiSkillsDataResponse.data,
    };
  } catch (error) {
    console.error("error from fetchStrapiSkillsData=", error);
    return { strapi_skills_data: [] };
  }
}

export default fetchStrapiSkillsData;
