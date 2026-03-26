import { Table, Spinner } from "react-bootstrap";
import { useSuspenseReport } from "../../hooks/useReports";
import { useState } from "react";

const SuspenseReport = () => {
  const { data, loading, load } = useSuspenseReport();

  const [filters, setFilters] = useState({
  start_date: "",
  end_date: "",
  policy_type: "",
  customer: "",
});

const applyFilters = () => {
  load(filters);
};


  if (loading) return <Spinner />;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Note</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.suspense_date}</td>
            <td>{item.customer_name}</td>
            <td>{item.note}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SuspenseReport;
