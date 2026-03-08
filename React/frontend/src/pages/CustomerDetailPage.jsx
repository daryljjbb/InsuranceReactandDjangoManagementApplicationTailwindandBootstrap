import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useCustomers from "../hooks/useCustomers";
import usePolicies from "../hooks/usePolicies";
import useAuth from "../hooks/useAuth";

import OverviewTab from '../components/Tabs/OverviewTab';
import PolicyTab from '../components/Tabs/PolicyTab';

import { Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";



export default function CustomerDetailPage() {
  const { id } = useParams();
  const { isAuthenticated, isAdmin } = useAuth();
   const {
    customer,
    reloadCustomer,
    loading,
    error,
  } = useCustomers(isAuthenticated, id); // Pass ID to fetch single customer

  const [activeTab, setActiveTab] = useState("overview");

  const [showRecordModal, setShowRecordModal] = useState(false);

  const { addPolicy, updatePolicy, deletePolicy } = usePolicies(isAuthenticated);




  if (loading) {
    return (
      <div className="flex justify-center p-10 text-gray-600 text-lg">
        Loading customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex justify-center p-10 text-red-500 text-lg">
        Customer not found.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="bg-white p-4 shadow rounded flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">{customer.first_name} {customer.last_name}</h1>
          <p className="text-gray-600 text-sm">ID: {customer.id}</p>
        </div>
      </div>

      {/* TABS */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Nav.Item>
            <Nav.Link eventKey="overview">Overview</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="policies">Policies</Nav.Link>
        </Nav.Item>
        </Nav>


      {/* CONTENT AREA */}
      <div className="bg-white p-6 shadow-md rounded-lg min-h-[300px]">
        {activeTab === "overview" && <OverviewTab customer={customer} />}
        {activeTab === "policies" && (
       <PolicyTab
        customer={customer}
        addPolicy={addPolicy}
        updatePolicy={updatePolicy}     // ⭐ REQUIRED
        deletePolicy={deletePolicy}     // ⭐ REQUIRED
        reloadCustomer={reloadCustomer}
        />
        )}


      </div>
    </div>
  );
}