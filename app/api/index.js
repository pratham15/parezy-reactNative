import axios from "axios";

const api = axios.create({
  baseURL: "http://10.6.30.10:8080",
});

export const login = (email, password) =>
  api.post("/login", { email, password });

export const getParkings = () => api.get("/parking");
