import { fetchAPI } from "../../utils/fetch-api.tsx";

async function fetchStrapiCertificatesData(locale = "en") {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { 
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 }
    };
    const strapiCertificatesDataResponse = await fetchAPI(
      "/coursera-cetificats",
      { populate: "*", locale },
      options
    );

    return {
      strapi_certificates_data: strapiCertificatesDataResponse.data,
    };
  } catch (error) {
    console.error("error from fetchStrapiCertificatesData=", error);
    return { strapi_certificates_data: [] };
  }
}

export default fetchStrapiCertificatesData;
