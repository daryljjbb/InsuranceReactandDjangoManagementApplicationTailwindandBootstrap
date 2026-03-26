import api from "./axios";

export const getSuspenseReport = () => api.get("reports/suspense/");
export const getExpirationsReport = (filters = {}) =>
  api.get("reports/expirations/", { params: filters });

export const getRenewalsReport = (filters = {}) =>
  api.get("reports/renewals/", { params: filters });
