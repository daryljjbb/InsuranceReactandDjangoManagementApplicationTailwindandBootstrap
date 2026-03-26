import { Table, Button, Spinner, Badge } from "react-bootstrap";
import useSuspense from "../../hooks/useSuspense";
import AddSuspenseModal from "../AddSuspenseModal";
import EditSuspenseModal from "../EditSuspenseModal";
import { useState } from "react";
const SuspenseTab = ({ customerId }) => {
  const {
    items,
    loading,
    addItem,
    editItem,
    removeItem,
    refresh
  } = useSuspense(customerId);

  const [showAdd, setShowAdd] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  const statusBadge = (status) => {
    switch (status) {
      case "open":
        return <Badge bg="primary">Open</Badge>;
      case "closed":
        return <Badge bg="success">Closed</Badge>;
      case "past_due":
        return <Badge bg="danger">Past Due</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const renderStatusBadge = (status) => {
  switch (status) {
    case "open":
      return <span className="badge bg-primary">Open</span>;
    case "closed":
      return <span className="badge bg-success">Closed</span>;
    case "past_due":
      return <span className="badge bg-danger">Past Due</span>;
    default:
      return <span className="badge bg-secondary">{status}</span>;
  }
};


  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h5>Suspense Items</h5>
        <Button onClick={() => setShowAdd(true)}>Add Suspense</Button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Note</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
                <tr
                key={item.id}
                className={item.status === "past_due" ? "table-danger" : ""}
                >
                <td>{item.suspense_date}</td>
                <td>{item.note}</td>
                <td>{renderStatusBadge(item.status)}</td>

                <td>
                    <Button
                    variant="link"
                    onClick={() => setEditItemData(item)}
                    >
                    Edit
                    </Button>

                    <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    >
                    Delete
                    </Button>
                </td>
                </tr>
            ))}
        </tbody>

        </Table>
      )}

      <AddSuspenseModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onSave={addItem}
        customerId={customerId}
      />

      <EditSuspenseModal
        show={!!editItemData}
        onHide={() => setEditItemData(null)}
        onSave={editItem}
        item={editItemData}
      />
    </div>
  );
};

export default SuspenseTab;
