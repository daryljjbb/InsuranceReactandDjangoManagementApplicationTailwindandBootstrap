import useCustomers from "../hooks/useCustomers";
import useAuth from "../hooks/useAuth";
import ReusableForm from "../components/ReusableForm";
import ReusableSearchForm from "../components/ReusableSearchForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Modal} from "react-bootstrap";

const Customers = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const {
    customers,
    loading,
    error,
    search,
    setSearch,
    ordering,
    setOrdering,
    addCustomer,
    removeCustomer,
  } = useCustomers(isAuthenticated);

  const initialData = {
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip_code: "",
    date_of_birth: "",
   };
 
   const [formData, setFormData] = useState(initialData);
 
   const fields = [
     { name: "first_name", label: "First Name", type: "text", required: true },
     { name: "last_name", label: "Last Name", type: "text", required: true },
     /* Make sure to match backend choices 
      GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]*/
     { name: "gender", label: "Gender", type: "select",
        options: [
            { value: "Male", label: "Male" }, 
            { value: "Female", label: "Female" },
            { value: "Other", label: "Other" }
        ]
    },
     { name: "email", label: "Email", type: "email", required: true },
     { name: "phone", label: "Phone Number", type: "tel" },
     { name: "address1", label: "Address Line 1", type: "text" },
     { name: "address2", label: "Address Line 2", type: "text" },
     { name: "city", label: "City", type: "text" },
     { name: "state", label: "State", type: "text" },
     { name: "zip_code", label: "Zip Code", type: "text" },
     { name: "date_of_birth", label: "Date of Birth", type: "date" },

   ];


  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const highlightMatch = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "i");
  return text.replace(regex, "<mark>$1</mark>");
};

const toggleOrdering = (field) => {
  if (ordering === field) {
    setOrdering(`-${field}`); // descending
  } else {
    setOrdering(field); // ascending
  }
};



  if (loading) return <p>Loading customers...</p>;
  if (error) return <p className="">{error}</p>;

  return (
    <>
      <div className="">
        <h2>Customers</h2>
      </div>

      <ReusableSearchForm
        value={search}
        onChange={setSearch}
        loading={loading}
        placeholder="Search by name or email..."
      />


      <div className="">
        <button onClick={() => setShowModal(true)}>Add Customer</button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReusableForm
            fields={fields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={(data) => {
                addCustomer({
                ...data,
                });
                setShowModal(false);
                setFormData(initialData);
            }}
            />

        </Modal.Body>
      </Modal>

      <Table className="mt-3">
       <thead>
        <tr>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => toggleOrdering("first_name")}
          >
            Name{" "}
            {ordering === "first_name" && "↑"}
            {ordering === "-first_name" && "↓"}
          </th>

          <th
            style={{ cursor: "pointer" }}
            onClick={() => toggleOrdering("email")}
          >
            Email{" "}
            {ordering === "email" && "↑"}
            {ordering === "-email" && "↓"}
          </th>

          <th>Actions</th>
        </tr>
      </thead>


        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="3">No customers found.</td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(
                      `${customer.first_name} ${customer.last_name}`,
                      search
                    )
                  }}
                />

                <td
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(customer.email, search)
                  }}
                />
                <td>
                  <button className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-2xl" onClick={() => navigate(`/customers/${customer.id}`)}>View</button>
                  {isAdmin && (
                    <>
                      <span className="mx-2 text-muted">|</span>
                      <button
                      className="bg-red-300 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-2xl"
                        size="sm"
                        onClick={() => removeCustomer(customer.id)}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};


export default Customers;