import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export async function shortenUrl(url: string) {
  try {
    const response = await axios.post(`${apiUrl}/`, { url });
    return response;
  } catch (ex) {
    return ex.response;
  }
}

export async function getUrlById(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response;
  } catch(ex) {
    return null;
  }
}

export async function getMyUrls() {
  try {
    const response = await axios.get(`${apiUrl}/urls/me`);
    return response;
  } catch (ex) {
    return ex.response;
  }
}

export async function getUrlData(id: string) {
  try {
    const response = await axios.get(`${apiUrl}/statistics/${id}`);
    return response;
  } catch (ex) {
    return ex.response;
  }
}
