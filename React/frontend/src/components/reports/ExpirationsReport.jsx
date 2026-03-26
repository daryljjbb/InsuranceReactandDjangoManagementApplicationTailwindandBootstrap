import { Table, Spinner } from "react-bootstrap";
import { useExpirationsReport } from "../../hooks/useReports";
import { useState } from "react";
import useCustomers from "../../hooks/useCustomers";
const ExpirationsReport = () => {
  const { data, loading,load } = useExpirationsReport();
  const { customers } = useCustomers();
  const [filters, setFilters] = useState({
  start_date: "",
  end_date: "",
  policy_type: "",
  customer: "",
});

const applyFilters = () => {
  load(filters);
};


  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>

    <div className="d-flex gap-3 mb-3">

        <div>
            <label className="form-label">Start Date</label>
            <input
            type="date"
            className="form-control"
            value={filters.start_date}
            onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
            />
        </div>

        <div>
            <label className="form-label">End Date</label>
            <input
            type="date"
            className="form-control"
            value={filters.end_date}
            onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
            />
        </div>

        <div>
            <label className="form-label">Policy Type</label>
            <select
            className="form-select"
            value={filters.policy_type}
            onChange={(e) => setFilters({ ...filters, policy_type: e.target.value })}
            >
            <option value="">All</option>
            <option value="auto">Auto</option>
            <option value="home">Home</option>
            <option value="life">Life</option>
            </select>
        </div>

        <div>
            <label className="form-label">Customer</label>
            <select
            className="form-select"
            value={filters.customer}
            onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
            >
            <option value="">All</option>
            {customers.map((c) => (
                <option key={c.id} value={c.id}>
                {c.first_name} {c.last_name}
                </option>
            ))}
            </select>
        </div>

        <div className="align-self-end">
            <button className="btn btn-primary" onClick={applyFilters}>
            Apply Filters
            </button>
        </div>

    </div>

        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Customer</th>
            <th>Policy #</th>
            <th>Type</th>
            <th>Expiration Date</th>
            <th>Premium</th>
            </tr>
        </thead>

        <tbody>
            {data.length === 0 ? (
            <tr>
                <td colSpan="5" className="text-center text-muted">
                No policies expiring soon
                </td>
            </tr>
            ) : (
            data.map((policy) => (
                <tr key={policy.id}>
                <td>{policy.customer_name}</td>
                <td>{policy.policy_number}</td>
                <td>{policy.policy_type}</td>
                <td>{policy.expiration_date}</td>
                <td>${policy.premium_amount}</td>
                </tr>
            ))
            )}
        </tbody>
        </Table>
    </>
    
  );
};

export default ExpirationsReport;
