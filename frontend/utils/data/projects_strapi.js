import { fetchAPI } from "../../utils/fetch-api.tsx";

async function fetchstrapiProjectsData() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { 
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 }
    };
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
    return { strapi_projects_data: [] };
  }
}

export default fetchstrapiProjectsData;
