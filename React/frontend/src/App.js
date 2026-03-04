import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./pages/Customers";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Layout from "./components/Layout";   // <-- IMPORTANT
import useAuth from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes wrapped in Layout */}
        <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          {/* Add more pages here */}
        </Route>

        {/* Default redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/customers" /> : <Navigate to="/login" />
          }
        />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

export default App;
