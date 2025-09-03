import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5041", // URL de ton backend .NET
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
