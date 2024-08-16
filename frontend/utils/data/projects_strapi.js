import { fetchAPI } from "../../utils/fetch-api.tsx";
async function fetchstrapiProjectsData() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const strapiProjectsDataResponse = await fetchAPI(
      "/projects",
      { populate: "*" },
      options
    );

    return {
      strapi_projects_data: strapiProjectsDataResponse.data,
    };
  } catch (error) {
    console.error("error from fetchstrapiProjectsDataData=", error);
  }
}

export default fetchstrapiProjectsData;
