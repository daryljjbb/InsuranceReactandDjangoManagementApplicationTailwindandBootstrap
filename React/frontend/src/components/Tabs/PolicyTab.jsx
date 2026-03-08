import { useState } from "react";
import { Modal } from "react-bootstrap";
import AddPolicyForm from "../AddPolicyForm";
import EditPolicyForm from "../EditPolicyForm";
import DeletePolicyModal from "../DeletePolicyModal";
import PolicyCard from "../PolicyCard";
import { Table, Button } from "react-bootstrap";

export default function PolicyTab({
  customer,
  addPolicy,
  updatePolicy,
  deletePolicy,
  payload,
  id,
  reloadCustomer
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const policies = customer.policies || [];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold">Policies</h4>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Add Policy
        </button>
      </div>

      {/* POLICY LIST */}
      {policies.length === 0 ? (
        <p className="text-gray-500">This customer has no policies.</p>
      ) : (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                <th>Type</th>
                <th>Policy #</th>
                <th>Effective</th>
                <th>Expires</th>
                <th>Premium</th>
                <th>Actions</th>
                </tr>
            </thead>

           <tbody>
                {policies.map((policy) => (
                    <tr key={policy.id}>
                    <td>{policy.policy_type}</td>
                    <td>{policy.policy_number}</td>
                    <td>{policy.effective_date}</td>
                    <td>{policy.expiration_date}</td>
                    <td>${policy.premium_amount}</td>
                    <td>
                        <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => {
                            setSelectedPolicy(policy);
                            setShowEditModal(true);
                        }}
                        className="me-2"
                        >
                        Edit
                        </Button>

                        <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                            setSelectedPolicy(policy);
                            setShowDeleteModal(true);
                        }}
                        >
                        Delete
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>


            </Table>

      )}

      {/* ADD POLICY MODAL */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPolicyForm
            customerId={customer.id}
            addPolicy={addPolicy}
            reloadCustomer={reloadCustomer}
            closeModal={() => setShowAddModal(false)}
          />
        </Modal.Body>
      </Modal>

      {/* EDIT POLICY MODAL */}
      {showEditModal && (
        <Modal show onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Policy</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditPolicyForm
              policy={selectedPolicy}
              updatePolicy={updatePolicy}
              reloadCustomer={reloadCustomer}
              closeModal={() => setShowEditModal(false)}
            />
          </Modal.Body>
        </Modal>
      )}

      {/* DELETE POLICY MODAL */}
      {showDeleteModal && (
        <DeletePolicyModal
          policy={selectedPolicy}
          deletePolicy={deletePolicy}
          reloadCustomer={reloadCustomer}
          closeModal={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
