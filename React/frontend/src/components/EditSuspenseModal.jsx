import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditSuspenseModal = ({ show, onHide, onSave, item }) => {
  const [suspenseDate, setSuspenseDate] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("open");

  useEffect(() => {
    if (item) {
      setSuspenseDate(item.suspense_date);
      setNote(item.note);
      setStatus(item.status);
    }
  }, [item]);

  const handleSubmit = () => {
    onSave(item.id, {
      suspense_date: suspenseDate,
      note,
      status,
      customer: item.customer,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Suspense Item</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Suspense Date</Form.Label>
            <Form.Control
              type="date"
              value={suspenseDate}
              onChange={(e) => setSuspenseDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
              <option value="past_due">Past Due</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSuspenseModal;
