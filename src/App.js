import "./App.css";
import React from "react";
import Login from "./Pages/Login/Login";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard';
import HumanResource from './Pages/HumanResource/HumanResource';
import HolidayList from './Pages/HolidayList/HolidayList';
import KnowledgeShare from './Pages/KnowledgeShare/KnowledgeShare';
import HR from './Pages/HR/HR';
import AddEmployee from './Pages/AddEmployee/AddEmployee';
import EditEmployee from './Pages/EditEmployee/EditEmployee';
import ViewEmployee from './Pages/ViewEmployee/ViewEmployee';
import EmpProduct from './Pages/EmpProduct/EmpProduct';
import HrEmpDesig from './Pages/HRNavBar/HrEmpDesig/HrEmpDesig';
import HrEmpDepart from './Pages/HRNavBar/HrEmpDepart/HrEmpDepart';
import ManageHoliday from './Pages/HRNavBar/HrManageHoliday/ManageHoliday';
import EmpTarget from './Pages/HRNavBar/EmpTarget/EmpTarget';
import TargetEdit from './Pages/HRNavBar/TargetEdit/TargetEdit';
import DARSummary from './Pages/DAR/DARSummary/DARSummary';
import AddDar from './Pages/DAR/AddDar/AddDar';
import ViewDar from './Pages/DAR/ViewDar/ViewDar';
import EditDar from './Pages/DAR/EditDar/EditDar';
import ContinueDar from './Pages/DAR/ContinueDar/ContinueDar';
import UserDataContextProvider from "./Context/UserDataContext/UserDataContextProvider";
import CustList from "./Pages/ISR/CustList/CustList";
import AddCust from "./Pages/ISR/ModifyCustomer/modifyCust";
import EditCust from "./Pages/ISR/ModifyCustomer/EditCust";
import ViewCust from "./Pages/ISR/ModifyCustomer/ViewCust";
import CustContact from "./Pages/ISR/CustContact/CustContact";
import CreateQuotation from "./Pages/ISR/CreateQuotation/CreateQuotation";
import FormQuotation from "./Pages/ISR/FormQuotaion/FormQuotation";
import QuotationList from "./Pages/ISR/QuotationList/QuotationList";
import Pdfhtml from "./Pages/ISR/PDFHtml/Pdfhtml";
import { Suspense } from "react";
// import AdmPrincipal from "./Pages/AdmPrincipal/AdmPrincipal";
// import HrEmployeeList from "./Pages/HRNavBar/HrEmployeeList/HrEmployeeList";
// import AdminRoute from "./routes/AdminRoute";

// const Dashboard = React.lazy(() => import('./Pages/Dashboard/Dashboard'));
// const HumanResource = React.lazy(() => import('./Pages/HumanResource/HumanResource'));
// const HolidayList = React.lazy(() => import('./Pages/HolidayList/HolidayList'));
// const KnowledgeShare = React.lazy(() => import('./Pages/KnowledgeShare/KnowledgeShare'));
// const HR = React.lazy(() => import('./Pages/HR/HR'));
// const AddEmployee = React.lazy(() => import("./Pages/AddEmployee/AddEmployee"));
// const EditEmployee = React.lazy(() => import('./Pages/EditEmployee/EditEmployee'));
// const ViewEmployee = React.lazy(() => import("./Pages/ViewEmployee/ViewEmployee"));
// const EmpProduct = React.lazy(() => import('./Pages/EmpProduct/EmpProduct'));
// const HrEmpDesig = React.lazy(() => import('./Pages/HRNavBar/HrEmpDesig/HrEmpDesig'));
// const HrEmpDepart = React.lazy(() => import('./Pages/HRNavBar/HrEmpDepart/HrEmpDepart'));
// const ManageHoliday = React.lazy(() => import('./Pages/HRNavBar/HrManageHoliday/ManageHoliday'));
// const EmpTarget = React.lazy(() => import('./Pages/HRNavBar/EmpTarget/EmpTarget'));
// const TargetEdit = React.lazy(() => import('./Pages/HRNavBar/TargetEdit/TargetEdit'));
// const DARSummary = React.lazy(() => import('./Pages/DAR/DARSummary/DARSummary'));
// const AddDar = React.lazy(() => import('./Pages/DAR/AddDar/AddDar'));
// const ViewDar = React.lazy(() => import('./Pages/DAR/ViewDar/ViewDar'));
// const EditDar = React.lazy(() => import('./Pages/DAR/EditDar/EditDar'));
// const ContinueDar = React.lazy(() => import('./Pages/DAR/ContinueDar/ContinueDar'));
const AdmPrincipal = React.lazy(() => import('./Pages/AdmPrincipal/AdmPrincipal'));
const AdminRoute = React.lazy(() => import("./routes/AdminRoute"));
const HrEmployeeList = React.lazy(() => import('./Pages/HRNavBar/HrEmployeeList/HrEmployeeList'));

function App() {
  // localStorage.setItem("BaseUrl", "http://103.8.43.34:2934");
  // localStorage.setItem("BaseUrl", "https://5b56-103-8-43-34.ngrok-free.app");
  localStorage.setItem("BaseUrl", "http://localhost:5193");
  return (
    <UserDataContextProvider>
      <BrowserRouter>
        {/* loading screen code */}
        <Suspense
          fallback={
            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1>Loading...</h1>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/HumanResource" element={<HumanResource />} />
            <Route path="*" element={<h1>Page Not Found</h1>}></Route>
            <Route path="/HolidayList" element={<HolidayList />} />
            <Route path="/KnowledgeShare" element={<KnowledgeShare />} />
            <Route path="/HR" element={<HR />} />
            <Route path="/AddEmployee" element={<AddEmployee />} />
            <Route path="/EditEmployee" element={<EditEmployee />} />
            <Route path="/ViewEmployee" element={<ViewEmployee />} />
            <Route path="/EmpProduct" element={<EmpProduct />} />
            <Route path="/HrEmpDesig" element={<HrEmpDesig />} />
            <Route path="/HREmpDept" element={<HrEmpDepart />} />
            <Route path="/ManageHoliday" element={<ManageHoliday />} />
            <Route path="/HrEmpTargetList" element={<EmpTarget />} />
            <Route path="/HrEmpTarget" element={<TargetEdit />} />
            <Route path="/DarSummary" element={<DARSummary />} />
            <Route path="/AddDar" element={<AddDar />} />
            <Route path="/ViewDar" element={<ViewDar />} />
            <Route path="/EditDar" element={<EditDar />} />
            <Route path="/ContinueDar" element={<ContinueDar />} />
            <Route path="/CustList" element={<CustList />} />
            <Route path="/modifyCust" element={<AddCust />} />
            <Route path="/EditCustomer" element={<EditCust />} />
            <Route path="/ViewCustomer" element={<ViewCust />} />
            <Route path="/CustContact" element={<CustContact />} />
            <Route path="/CreateQuotation" element={<CreateQuotation />} />
            <Route path="/FormQuotation" element={<FormQuotation />} />
            <Route path="/QuotationList" element={<QuotationList />} />
            <Route path="/Pdfhtml" element={<Pdfhtml />} />

            <Route path="/AdmPrincipal" element={<AdminRoute><AdmPrincipal /></AdminRoute>} />
            <Route path="/HrEmployeeList" element={<HrEmployeeList />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserDataContextProvider>
  );
}

export default App;
