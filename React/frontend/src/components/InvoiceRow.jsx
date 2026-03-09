import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";

import StatusBadge from "./StatusBadge"; // adjust path if needed
import PaymentHistory from "./PaymentHistory"; // adjust path if needed

function InvoiceRow({ invoice, reloadCustomer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* MAIN ROW */}
      <tr
        className={`invoice-row ${expanded ? "invoice-row-expanded" : ""}`}
        onClick={() => setExpanded((prev) => !prev)}
        style={{ cursor: "pointer" }}
      >
        {/* ARROW COLUMN */}
        <td style={{ width: "30px" }}>
          <span
            className="arrow-icon"
            style={{
              display: "inline-flex",
              transition: "transform 0.2s ease",
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            <FiChevronRight size={18} />
          </span>
        </td>

        <td>{invoice.invoice_number}</td>
        <td>{invoice.issue_date}</td>
        <td>{invoice.due_date}</td>
        <td>${invoice.total_amount}</td>
        <td>${invoice.balance_due}</td>
        <td>
          <StatusBadge status={invoice.status} />
        </td>
        <td>
          {invoice.billing_type === "direct" ? "Direct Bill" : "Agency Bill"}
        </td>
        <td>
        <a
            href={`http://localhost:8000/api/invoices/${invoice.id}/pdf/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            title="Download PDF"
            onClick={(e) => e.stopPropagation()} // prevents row expand
        >
            <FiFileText size={18} />
        </a>
        </td>

      </tr>

      {/* EXPANDED PAYMENT HISTORY */}
      {expanded && (
        <tr>
          <td colSpan="9">
            <PaymentHistory
              invoice={invoice}
              reloadCustomer={reloadCustomer}
            />
          </td>
        </tr>
      )}
    </>
  );
}

export default InvoiceRow;

