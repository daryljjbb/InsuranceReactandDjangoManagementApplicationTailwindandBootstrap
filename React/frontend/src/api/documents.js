// src/api/documents.js
import api from "./axios";

export const fetchDocuments = (customerId) =>
  api.get(`documents/?customer=${customerId}`);

export const uploadDocument = (formData) =>
  api.post("documents/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteDocument = (id) =>
  api.delete(`documents/${id}/`);
