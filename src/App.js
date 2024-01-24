import logo from "./logo.svg";
import "./App.css";
import { Button } from "bootstrap";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HumanResource from "./Pages/HumanResource/HumanResource";
import HolidayList from "./Pages/HolidayList/HolidayList";
import KnowledgeShare from "./Pages/KnowledgeShare/KnowledgeShare";
import HR from "./Pages/HR/HR";
import AddEmployee from "./Pages/AddEmployee/AddEmployee";
import EditEmployee from "./Pages/EditEmployee/EditEmployee";
import ViewEmployee from "./Pages/ViewEmployee/ViewEmployee";
import EmpProduct from "./Pages/EmpProduct/EmpProduct";
import HrEmpDesig from "./Pages/HRNavBar/HrEmpDesig/HrEmpDesig";
import HrEmpDepart from "./Pages/HRNavBar/HrEmpDepart/HrEmpDepart";
import ManageHoliday from "./Pages/HRNavBar/HrManageHoliday/ManageHoliday";
import EmpTarget from "./Pages/HRNavBar/EmpTarget/EmpTarget";
import TargetEdit from "./Pages/HRNavBar/TargetEdit/TargetEdit";
import DARSummary from "./Pages/DAR/DARSummary/DARSummary";
import AddDar from "./Pages/DAR/AddDar/AddDar";
import ViewDar from "./Pages/DAR/ViewDar/ViewDar";
import UserDataContextProvider from "./Context/UserDataContext/UserDataContextProvider";

function App() {
  localStorage.setItem("BaseUrl", "http://103.8.43.34:2934");
  // localStorage.setItem("BaseUrl", "https://5b56-103-8-43-34.ngrok-free.app");
  // localStorage.setItem("BaseUrl", "http://localhost:5193");
  return (
    <UserDataContextProvider>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
      </UserDataContextProvider>
  );
}

export default App;
