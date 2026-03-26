import api from "./axios";

export const fetchSuspense = (customerId) =>
  api.get(`suspense/?customer=${customerId}`);

export const createSuspense = (data) =>
  api.post("suspense/", data);

export const updateSuspense = (id, data) =>
  api.put(`suspense/${id}/`, data);

export const deleteSuspense = (id) =>
  api.delete(`suspense/${id}/`);
