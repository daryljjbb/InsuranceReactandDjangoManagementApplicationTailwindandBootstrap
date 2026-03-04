// api/customers.js
import api from "./axios";

export const fetchCustomers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await api.get(`customers/?${query}`);
  return res.data;
};

export const fetchCustomerById = async (id) => {
  const response = await api.get(`customers/${id}/`);
  return response.data;
};



export const createCustomer = async (payload) => {
  const res = await api.post("customers/", payload);
  return res.data;
};


/**
 * Delete a customer by ID
 * @param {number} id
 */
export const deleteCustomer = async (id) => {
  await api.delete(`customers/${id}/`);
};