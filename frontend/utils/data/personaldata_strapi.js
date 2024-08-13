import { fetchAPI } from "../../utils/fetch-api.tsx";
async function fetchstrapiPersonalData() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const strapiPersonalDataResponse = await fetchAPI(
      "/personal-data",
      { populate: "*" },
      options,
    );

    return {
      strapi_personal_data: strapiPersonalDataResponse.data,
    };
  } catch (error) {
    console.error("error from fetchStrapiPersonalData=", error);
  }
}

export default fetchstrapiPersonalData;
