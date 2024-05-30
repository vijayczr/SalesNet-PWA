import { Navigate } from "react-router-dom"

function AdminRoute({ children }) {
//   TODO: change the EmpId from "1068" to something which is unique to Admin
// because this is required for admin routes only.
  if(localStorage.getItem("EmpId") !== "1068") {
    return (
      <Navigate to="/Dashboard" />
    )
  }  
  return children
}

export default AdminRoute;
