import { fetchAPI } from "../../utils/fetch-api.tsx";
async function fetchstrapiEducationData() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const strapiEducationDataResponse = await fetchAPI(
      "/educations",
      { populate: "*" },
      options,
    );

    return {
      strapi_education_data: strapiEducationDataResponse.data,
    };
  } catch (error) {
    console.error("error from fetchStrapiEducationData=", error);
  }
}

export default fetchstrapiEducationData;
