import { Modal, Button } from "react-bootstrap";

export default function DeletePolicyModal({ policy, removePolicy, closeModal, reloadCustomer }) {
  if (!policy) return null;

  const handleDelete = async () => {
    await removePolicy(policy.id);
    await reloadCustomer();
    closeModal();
  };

  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Policy</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-gray-700">
          Are you sure you want to delete policy <strong>{policy.policy_number}</strong>?
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
