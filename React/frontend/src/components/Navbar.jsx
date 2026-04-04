import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth";
import useAuth from "../hooks/useAuth";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container fluid>
        <Navbar.Brand href="/">
          Insurance System{" "}
          {isAdmin && <span className="badge bg-danger ms-2">Admin</span>}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* RIGHT SIDE */}
          <Nav className="ms-auto align-items-center">

            {/* Show logged-in user name */}
            {user && (
              <span className="text-white me-3">
                {user.first_name} {user.last_name}
              </span>
            )}

            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
