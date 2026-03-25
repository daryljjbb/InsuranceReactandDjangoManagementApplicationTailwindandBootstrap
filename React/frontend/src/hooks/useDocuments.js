// src/hooks/useDocuments.js
import { useState, useEffect } from "react";
import {
  fetchDocuments,
  uploadDocument,
  deleteDocument,
} from "../api/documents";

export default function useDocuments(customerId) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = () => {
    setLoading(true);
    fetchDocuments(customerId)
      .then((res) => setDocuments(res.data.results || res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (customerId) loadDocuments();
  }, [customerId]);

  const handleUpload = async (formData) => {
    await uploadDocument(formData);
    loadDocuments();
  };

  const handleDelete = async (id) => {
    await deleteDocument(id);
    loadDocuments();
  };

  return {
    documents,
    loading,
    handleUpload,
    handleDelete,
    refresh: loadDocuments,
  };
}
