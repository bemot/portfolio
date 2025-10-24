import { fetchAPI } from "../../utils/fetch-api.tsx";

async function fetchstrapiExperienceData(locale = "en") {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { 
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 }
    };
    const strapiExperienceDataResponse = await fetchAPI(
      "/experiences",
      { 
        fields: ['id', 'title', 'company', 'duration'],
        sort: ['id:desc'],
        locale
      },
      options,
    );

    return {
      strapi_experience_data: strapiExperienceDataResponse.data,
    };
  } catch (error) {
    console.error("error from fetchstrapiExperienceDataData=", error);
    return { strapi_experience_data: [] };
  }
}

export default fetchstrapiExperienceData;
