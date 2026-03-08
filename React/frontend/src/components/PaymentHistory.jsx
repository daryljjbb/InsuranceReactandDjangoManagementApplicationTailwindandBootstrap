function PaymentHistory({ invoice, reloadCustomer }) {
  return (
    <div className="p-3 bg-gray-50 rounded">
      <h6 className="font-semibold mb-2">Payment History</h6>

      {invoice.payments.length === 0 ? (
        <p>No payments yet.</p>
      ) : (
        <ul className="list-group mb-3">
          {invoice.payments.map((p) => (
            <li key={p.id} className="list-group-item">
              ${p.amount} — {p.payment_date}
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
export default PaymentHistory;