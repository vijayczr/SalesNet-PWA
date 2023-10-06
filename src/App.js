import logo from './logo.svg';
import './App.css';
import { Button } from 'bootstrap';
import Login from "./Pages/Login/Login"
import Dashboard from './Pages/Dashboard/Dashboard';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HumanResource from './Pages/HumanResource/HumanResource';
import HolidayList from './Pages/HolidayList/HolidayList';
import KnowledgeShare from './Pages/KnowledgeShare/KnowledgeShare';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={ <Dashboard />} />
        <Route path="/HumanResource" element={ <HumanResource />} />
        <Route path='*' element={<h1>Page Not Found</h1>} ></Route>
        <Route path="/HolidayList" element={<HolidayList/>} />
        <Route path="/KnowledgeShare" element={<KnowledgeShare/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
