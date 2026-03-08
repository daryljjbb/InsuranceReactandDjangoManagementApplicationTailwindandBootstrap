import { useEffect, useState, useCallback} from "react";
import { fetchCustomers, fetchCustomerById, deleteCustomer, createCustomer } from "../api/customers";

const useCustomers = (isAuthenticated, customerId = null) => {
  // Always store customers as an array
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(null); // For single customer view

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [ordering, setOrdering] = useState("first_name");


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);


  /**
   * Normalize API responses so `patients` is ALWAYS an array.
   * This prevents the "prev is not iterable" crash forever.
   */
  const normalizeList = (data) => {
    // If backend returns an array directly → use it
    if (Array.isArray(data)) return data;

    // If backend returns paginated data → use results
    if (Array.isArray(data?.results)) return data.results;

    // Fallback → always return an empty array
    return [];
  };

  /**
   * Load patients from API
   */

  const loadCustomers = useCallback(async () => {
  try {
    setLoading(true);
    const data = await fetchCustomers({
    search: debouncedSearch || "",
    ordering
    });

    setCustomers(normalizeList(data));
  } catch (err) {
    setError("Failed to load customers");
  } finally {
    setLoading(false);
  }
}, [debouncedSearch, ordering]);

 

  useEffect(() => {
    loadCustomers();
  }, [isAuthenticated, debouncedSearch, ordering]);


   // 🔄 NEW: Function to load a SINGLE customer
  const loadSingleCustomer = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchCustomerById(customerId);
      setCustomer(data);
    } catch (err) {
      setError("Customer not found");
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  // 🚀 Trigger correct load logic
  useEffect(() => {
    if (isAuthenticated) {
      if (customerId) {
        loadSingleCustomer(); // Fetch one if ID exists
      } else {
        loadCustomers();    // Otherwise fetch the list
      }
    }
  }, [isAuthenticated, customerId, loadCustomers, loadSingleCustomer]);

  /**
   * Add a new customer
   */
  const addCustomer = async (payload) => {
    try {
      const newCustomer = await createCustomer(payload);

      // Because we normalized earlier, `prev` is ALWAYS an array
      setCustomers((prev) => [...prev, newCustomer]);

    } catch (err) {
      console.error("Failed to create customer:", err);
      throw err; // allow form to show errors
    }
  };

  /**
   * Remove a customer
   */
  const removeCustomer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await deleteCustomer(id);

      // Safe because `customers` is always an array
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));

    } catch (err) {
      alert("Failed to delete customer");
    }
  };

  return {
    customers,
    customer, // ✨ Expose single customer
    loading,
    error,
    search,
    setSearch,
    ordering,
    setOrdering,
    authError,
    reload: loadCustomers,
    reloadCustomer: loadSingleCustomer,   // ⭐ ADD THIS
    removeCustomer,
    addCustomer,
  };
};

export default useCustomers;