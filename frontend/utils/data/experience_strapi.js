import { fetchAPI } from "../../utils/fetch-api.tsx";
async function fetchstrapiExperienceData() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const strapiExperienceDataResponse = await fetchAPI(
      "/experiences",
      { populate: "*" },
      options,
    );

    return {
      strapi_experience_data: strapiExperienceDataResponse.data,
    };
  } catch (error) {
    console.error("error from fetchstrapiExperienceDataData=", error);
  }
}

export default fetchstrapiExperienceData;
