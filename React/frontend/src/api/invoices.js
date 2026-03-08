import api from "./axios";

export const createInvoice = async (payload) => {
  const res = await api.post("invoices/", payload);
  return res.data;
};

export const createPayment = async (payload) => {
  const res = await api.post("payments/", payload);
  return res.data;
};
