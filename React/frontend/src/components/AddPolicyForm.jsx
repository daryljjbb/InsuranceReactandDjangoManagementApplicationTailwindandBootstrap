import { useState } from "react";
import ReusableForm from "./ReusableForm";
function AddPolicyForm({ customerId, addPolicy, closeModal, reloadCustomer }) {
  const initialData = {
    policy_number: "",
    policy_type: "",
    effective_date: "",
    expiration_date: "",
    premium_amount: "",
  };

  const [formData, setFormData] = useState(initialData);

  const fields = [
    { name: "policy_number", label: "Policy Number", type: "text", required: true },
    {
      name: "policy_type",
      label: "Policy Type",
      type: "select",
      required: true,
      options: [
        { value: "auto", label: "Auto" },
        { value: "home", label: "Home" },
        { value: "life", label: "Life" },
      ],
    },
    { name: "effective_date", label: "Effective Date", type: "date", required: true },
    { name: "expiration_date", label: "Expiration Date", type: "date", required: true },
    { name: "premium_amount", label: "Premium Amount", type: "number", required: true, prefix: "$" },
  ];

  return (
    <ReusableForm
      fields={fields}
      formData={formData}
      setFormData={setFormData}
      submitLabel="Add Policy"
      onSubmit={async (data) => {
        await addPolicy(customerId, data);
        await reloadCustomer();   // ⭐ THIS is the missing piece
        closeModal();
      }}
    />
  );
}
export default AddPolicyForm;