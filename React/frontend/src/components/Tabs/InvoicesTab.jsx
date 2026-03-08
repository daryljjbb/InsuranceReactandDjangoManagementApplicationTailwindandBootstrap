import { useState } from "react";
import { Accordion, Button, Table, Modal } from "react-bootstrap";
import AddInvoiceForm from "../AddInvoiceForm";
import AddPaymentForm from "../AddPaymentForm";

function StatusBadge({ status }) {
  const map = {
    unpaid: "bg-danger",
    partial: "bg-warning text-dark",
    paid: "bg-success",
  };

  return (
    <span className={`badge ${map[status] || "bg-secondary"}`}>
      {status.toUpperCase()}
    </span>
  );
}

function PaymentHistory({ invoice, reloadCustomer }) {
  return (
    <div className="p-3 bg-light rounded">
      <h6 className="fw-semibold mb-2">Payment History</h6>

      {invoice.payments.length === 0 ? (
        <p className="text-muted mb-2">No payments yet.</p>
      ) : (
        <ul className="list-group mb-3">
          {invoice.payments.map((p) => (
            <li
              key={p.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                ${p.amount} — {p.payment_date}
              </span>
              <span className="text-muted">{p.method}</span>
            </li>
          ))}
        </ul>
      )}

      <AddPaymentForm
        invoiceId={invoice.id}
        balanceDue={invoice.balance_due}
        reloadCustomer={reloadCustomer}
      />
    </div>
  );
}

function InvoiceRow({ invoice, reloadCustomer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        style={{ cursor: "pointer" }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <td>{invoice.invoice_number}</td>
        <td>{invoice.issue_date}</td>
        <td>{invoice.due_date}</td>
        <td>${invoice.total_amount}</td>
        <td>${invoice.balance_due}</td>
        <td>
          <StatusBadge status={invoice.status} />
        </td>
        <td>{invoice.billing_type === "direct" ? "Direct Bill" : "Agency Bill"}</td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan="7">
            <PaymentHistory invoice={invoice} reloadCustomer={reloadCustomer} />
          </td>
        </tr>
      )}
    </>
  );
}

function PolicyInvoices({ policy, reloadCustomer }) {
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const invoices = policy.invoices || [];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-semibold mb-0">Invoices</h5>
        <Button size="sm" onClick={() => setShowAddInvoice(true)}>
          + Add Invoice
        </Button>
      </div>

      {invoices.length === 0 ? (
        <p className="text-muted">No invoices for this policy.</p>
      ) : (
        <Table bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Issue</th>
              <th>Due</th>
              <th>Total</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Billing</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <InvoiceRow
                key={inv.id}
                invoice={inv}
                reloadCustomer={reloadCustomer}
              />
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showAddInvoice} onHide={() => setShowAddInvoice(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddInvoiceForm
            policyId={policy.id}
            reloadCustomer={reloadCustomer}
            closeModal={() => setShowAddInvoice(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default function InvoicesTab({ customer, reloadCustomer }) {
  const policies = customer.policies || [];

  if (policies.length === 0) {
    return <p className="text-muted">This customer has no policies to bill.</p>;
  }

  return (
    <div className="space-y-4">
      <h4 className="fw-semibold mb-3">Invoices</h4>

      <Accordion alwaysOpen>
        {policies.map((policy, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={policy.id}>
            <Accordion.Header>
              {policy.policy_type.toUpperCase()} — #{policy.policy_number}
            </Accordion.Header>
            <Accordion.Body>
              <PolicyInvoices policy={policy} reloadCustomer={reloadCustomer} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
