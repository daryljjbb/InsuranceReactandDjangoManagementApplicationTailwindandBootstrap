import InvoiceRow from "./InvoiceRow";
function InvoiceList({ policy, reloadCustomer }) {
  const invoices = policy.invoices || [];

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h5 className="font-semibold">Invoices</h5>

        <Button
          size="sm"
          onClick={() => setShowAddInvoice(true)}
        >
          + Add Invoice
        </Button>
      </div>

      {invoices.length === 0 ? (
        <p className="text-gray-500">No invoices for this policy.</p>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th></th> {/* arrow column */}
              <th>Invoice #</th>
              <th>Issue</th>
              <th>Due</th>
              <th>Total</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Payments</th>
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

      {/* Add Invoice Modal */}
      {showAddInvoice && (
        <AddInvoiceForm
          policyId={policy.id}
          reloadCustomer={reloadCustomer}
          closeModal={() => setShowAddInvoice(false)}
        />
      )}
    </div>
  );
}
