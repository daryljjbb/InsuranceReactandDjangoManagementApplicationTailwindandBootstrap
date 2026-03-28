import { useEffect, useState } from "react";
import axios from "../api/axios"; // your configured axios instance


export default function useDashboardSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get("/dashboard/summary/")
      .then(res => setSummary(res.data))
      .catch(err => console.error("Dashboard summary error:", err));
  }, []);

  return summary;
}
