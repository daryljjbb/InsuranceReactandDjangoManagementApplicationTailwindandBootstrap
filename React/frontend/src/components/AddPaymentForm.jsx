import { useState } from "react";
import api from "../api/axios";

export default function AddPaymentForm({ invoiceId, balanceDue, reloadCustomer }) {
  const [amount, setAmount] = useState("");
  const [payment_date, setPaymentDate] = useState("");
  const [method, setMethod] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const numericAmount = parseFloat(amount || 0);

    if (numericAmount <= 0) {
      setError("Payment must be greater than 0.");
      return;
    }

    if (numericAmount > parseFloat(balanceDue)) {
      setError("Payment cannot exceed remaining balance.");
      return;
    }

    try {
      await api.post("/payments/", {
        invoice: invoiceId,
        amount: numericAmount,
        payment_date,
        method,
      });

      setAmount("");
      setPaymentDate("");
      setMethod("");

      await reloadCustomer();
    } catch (err) {
      setError("Failed to add payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">

      {error && <p className="text-danger">{error}</p>}

      <div className="row g-2">
        <div className="col">
          <input
            type="number"
            step="0.01"
            className="form-control"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="col">
          <input
            type="date"
            className="form-control"
            value={payment_date}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </div>

        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-sm btn-primary mt-2">
        Add Payment
      </button>
    </form>
  );
}
