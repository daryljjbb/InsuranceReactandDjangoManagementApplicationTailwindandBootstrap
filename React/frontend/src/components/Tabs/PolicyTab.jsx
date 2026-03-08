import { useState } from "react";
import { Modal } from "react-bootstrap";
import AddPolicyForm from "../AddPolicyForm";
import EditPolicyForm from "../EditPolicyForm";
import DeletePolicyModal from "../DeletePolicyModal";
import PolicyCard from "../PolicyCard";

export default function PolicyTab({
  customer,
  addPolicy,
  updatePolicy,
  deletePolicy,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              onEdit={() => {
                setSelectedPolicy(policy);
                setShowEditModal(true);
              }}
              onDelete={() => {
                setSelectedPolicy(policy);
                setShowDeleteModal(true);
              }}
            />
          ))}
        </div>
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
