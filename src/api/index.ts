import axios from "axios";

const apiUrl = "http://localhost:4000";

export async function shortenUrl(url: string) {
  try {
    const response = await axios.post(`${apiUrl}/`, { url });
    return response;
  } catch (ex: any) {
    return ex.response;
  }
}
