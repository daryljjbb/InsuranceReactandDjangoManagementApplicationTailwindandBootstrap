import { useState, useEffect } from "react";
import {
  fetchSuspense,
  createSuspense,
  updateSuspense,
  deleteSuspense,
} from "../api/suspense";

export default function useSuspense(customerId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchSuspense(customerId)
      .then(res => setItems(res.data.results || res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (customerId) load();
  }, [customerId]);

  const addItem = async (data) => {
    await createSuspense(data);
    load();
  };

  const editItem = async (id, data) => {
    await updateSuspense(id, data);
    load();
  };

  const removeItem = async (id) => {
    await deleteSuspense(id);
    load();
  };

  return {
    items,
    loading,
    addItem,
    editItem,
    removeItem,
    refresh: load,
  };
}
