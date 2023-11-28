import logo from './logo.svg';
import './App.css';
import { Button } from 'bootstrap';
import Login from "./Pages/Login/Login"
import Dashboard from './Pages/Dashboard/Dashboard';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HumanResource from './Pages/HumanResource/HumanResource';
import HolidayList from './Pages/HolidayList/HolidayList';
import KnowledgeShare from './Pages/KnowledgeShare/KnowledgeShare';
import HR from './Pages/HR/HR';
import AddEmployee from './Pages/AddEmployee/AddEmployee';
import EditEmployee from './Pages/EditEmployee/EditEmployee';
import ViewEmployee from './Pages/ViewEmployee/ViewEmployee';
import EmpProduct from './Pages/EmpProduct/EmpProduct';


function App() {

  // localStorage.setItem("BaseUrl", "https://localhost:44388");
  localStorage.setItem("BaseUrl", "http://192.168.1.177:2934");
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={ <Dashboard />} />
        <Route path="/HumanResource" element={ <HumanResource />} />
        <Route path='*' element={<h1>Page Not Found</h1>} ></Route>
        <Route path="/HolidayList" element={<HolidayList/>} />
        <Route path="/KnowledgeShare" element={<KnowledgeShare/>} />
        <Route path="/HR" element={<HR/>} />
        <Route path="/AddEmployee" element={<AddEmployee/>} />
        <Route path="/EditEmployee" element={<EditEmployee/>} />
        <Route path="/ViewEmployee" element={<ViewEmployee/>} />
        <Route path="/EmpProduct" element={<EmpProduct/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
