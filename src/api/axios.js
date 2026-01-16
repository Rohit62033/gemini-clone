import axios from "axios";

const api = axios.create({
  baseURL: "https://gemini-clone-backend-qao6.onrender.com/", // backend url
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
