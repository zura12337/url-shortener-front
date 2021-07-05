/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import axios from "axios";
import useSWR from "swr";

const apiUrl = "https://url-shortener-api-z.herokuapp.com"

const fetcher = (url: string) => axios(url).then((res) => res.data);

export async function shortenUrl(url: string) {
  try {
    const response = await axios.post(`${apiUrl}/`, { url });
    return response;
  } catch (ex) {
    return ex.response;
  }
}

export function getUrlById(id: string) {
  const { data, error } = useSWR(`${apiUrl}/${id}`, fetcher);

  return {
    data,
    error,
  };
}

export function getMyUrls() {
  const { data, error } = useSWR(`${apiUrl}/urls/me`, fetcher);

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}

export function getUrlData(id: string) {
  const { data, error } = useSWR(`${apiUrl}/statistics/${id}`, fetcher);

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
