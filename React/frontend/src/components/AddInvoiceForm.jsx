import { useState } from "react";
import api from "../api/axios";

export default function AddInvoiceForm({ policyId, reloadCustomer, closeModal }) {
  const [formData, setFormData] = useState({
    policy: policyId,
    billing_type: "agency",
    amount: "",
    agency_fee: "",
    issue_date: "",
    due_date: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...formData,
      policy: policyId,
      amount: formData.billing_type === "direct" ? 0 : formData.amount,
    };

    try {
      await api.post("/invoices/", payload);
      await reloadCustomer();
      closeModal();
    } catch (err) {
      setError("Failed to create invoice.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      {error && <p className="text-danger">{error}</p>}

      {/* Billing Type */}
      <div>
        <label className="form-label">Billing Type</label>
        <select
          name="billing_type"
          className="form-control"
          value={formData.billing_type}
          onChange={handleChange}
        >
          <option value="agency">Agency Bill</option>
          <option value="direct">Direct Bill</option>
        </select>
      </div>

      {/* Premium Amount (HIDDEN for Direct Bill) */}
      {formData.billing_type === "agency" && (
        <div>
          <label className="form-label">Premium Amount</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {/* Agency Fee */}
      <div>
        <label className="form-label">Agency Fee</label>
        <input
          type="number"
          name="agency_fee"
          className="form-control"
          value={formData.agency_fee}
          onChange={handleChange}
          required
        />
      </div>

      {/* Issue Date */}
      <div>
        <label className="form-label">Issue Date</label>
        <input
          type="date"
          name="issue_date"
          className="form-control"
          value={formData.issue_date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="form-label">Due Date</label>
        <input
          type="date"
          name="due_date"
          className="form-control"
          value={formData.due_date}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Create Invoice
      </button>
    </form>
  );
}
