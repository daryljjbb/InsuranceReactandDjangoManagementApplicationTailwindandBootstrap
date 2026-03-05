import api from "./axios";

export const fetchPolicies = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await api.get(`policies/?${query}`);
  return res.data;
};

export const fetchPolicyById = async (id) => {
  const response = await api.get(`policies/${id}/`);
  return response.data;
};



export const createPolicy = async (payload) => {
  const res = await api.post("policies/", payload);
  return res.data;
};


/**
 * Delete a policy by ID
 * @param {number} id
 */
export const deletePolicy = async (id) => {
  await api.delete(`policies/${id}/`);
};