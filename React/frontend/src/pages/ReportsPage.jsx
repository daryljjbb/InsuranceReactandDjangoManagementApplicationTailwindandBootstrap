import { Tab, Tabs } from "react-bootstrap";
import SuspenseReport from "../components/reports/SuspenseReport";
import ExpirationsReport from "../components/reports/ExpirationsReport";
import RenewalsReport from "../components/reports/RenewalsReport";

const ReportsPage = () => {
  return (
    <div>
      <h3 className="mb-4">Reports Center</h3>

      <Tabs defaultActiveKey="suspense" className="mb-3">
        <Tab eventKey="suspense" title="Suspense Report">
          <SuspenseReport />
        </Tab>

        <Tab eventKey="expirations" title="Expirations Report">
          <ExpirationsReport />
        </Tab>

        <Tab eventKey="renewals" title="Renewal Report">
          <RenewalsReport />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
