import { useState, useEffect } from "react";
import {
  getSuspenseReport,
  getExpirationsReport,
  getRenewalsReport,
} from "../api/reports";

export const useSuspenseReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSuspenseReport().then(res => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};

export const useExpirationsReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = (filters = {}) => {
    setLoading(true);
    getExpirationsReport(filters).then(res => {
      setData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  return { data, loading, load };
};


export const useRenewalsReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = (filters = {}) => {
    setLoading(true);
    getRenewalsReport(filters).then(res => {
      setData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    load(); // initial load
  }, []);

  return { data, loading, load };
};
