import axios from "axios";

const api = axios.create({
  baseURL: "http://34.131.197.76",
});

export const login = (email, password) =>
  api.post("/login", { email, password });

export const getParkings = () => api.get("/parking");

export const getBookings = (parking, out) =>
  api.get("/book/" + parking + "?out=" + out);

export const updateBooking = (id) => api.post("/book/updateBooking", { id });

export const bookParking = (user_id, parking_name, model, plate) =>
  api.post("/book", { user_id, parking_name, model, plate });
