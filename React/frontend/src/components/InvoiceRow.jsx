function InvoiceRow({ invoice, reloadCustomer }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
        <td>{invoice.invoice_number}</td>
        <td>{invoice.issue_date}</td>
        <td>{invoice.due_date}</td>
        <td>${invoice.total_amount}</td>
        <td>${invoice.balance_due}</td>
        <td>
          <StatusBadge status={invoice.status} />
        </td>
        <td>{invoice.payments.length}</td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan="7">
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
