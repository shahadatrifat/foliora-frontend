import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const extractArray = (res) => {
  const payload = res?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.books)) return payload.books;
  // fallback: try payload.data.data etc
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
};

export default api;
