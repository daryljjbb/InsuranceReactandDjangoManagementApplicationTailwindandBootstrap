import { useEffect, useState, useCallback} from "react";
import { fetchPolicies, fetchPolicyById, deletePolicy, createPolicy } from "../api/policies";
import { updatePolicy as updatePolicyApi } from "../api/policies";


const usePolicies = (isAuthenticated, policyId = null) => {
  // Always store policies as an array
  const [policies, setPolicies] = useState([]);
  const [policy, setPolicy] = useState(null); // For single policy view

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

  const loadPolicies = useCallback(async () => {
  try {
    setLoading(true);
    const data = await fetchPolicies({
    search: debouncedSearch || "",
    ordering
    });

    setPolicies(normalizeList(data));
  } catch (err) {
    setError("Failed to load policies");
  } finally {
    setLoading(false);
  }
}, [debouncedSearch, ordering]);

 

  useEffect(() => {
    loadPolicies();
  }, [isAuthenticated, debouncedSearch, ordering]);


   // 🔄 NEW: Function to load a SINGLE policy
  const loadSinglePolicy = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchPolicyById(policyId);
      setPolicy(data);
    } catch (err) {
      setError("Policy not found");
    } finally {
      setLoading(false);
    }
  }, [policyId]);

  // 🚀 Trigger correct load logic
  useEffect(() => {
    if (isAuthenticated) {
      if (policyId) {
        loadSinglePolicy(); // Fetch one if ID exists
      } else {
        loadPolicies();    // Otherwise fetch the list
      }
    }
  }, [isAuthenticated, policyId, loadPolicies, loadSinglePolicy]);

  /**
   * Add a new policy
   */
 const addPolicy = async (customerId, payload) => {
  try {
    const newPolicy = await createPolicy({
      ...payload,
      customer: customerId,
    });

    setPolicies((prev) => [...prev, newPolicy]);

    return newPolicy;
  } catch (err) {
    console.error("Failed to create policy:", err);
    throw err;
  }
};


const updatePolicy = async (id, payload) => {
  try {
    const updated = await updatePolicyApi(id, payload);
    return updated;
  } catch (err) {
    console.error("Failed to update policy:", err);
    throw err;
  }
};

  /**
   * Remove a policy
   */
  const removePolicy = async (id) => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;
    try {
      await deletePolicy(id);

      // Safe because `policies` is always an array
      setPolicies((prev) => prev.filter((policy) => policy.id !== id));

    } catch (err) {
      alert("Failed to delete policy");
    }
  };

  return {
    policies,
    policy, // ✨ Expose single policy
    loading,
    error,
    search,
    setSearch,
    ordering,
    setOrdering,
    authError,
    reload: loadPolicies,
    updatePolicy,
    removePolicy,
    addPolicy,
  };
};

export default usePolicies;