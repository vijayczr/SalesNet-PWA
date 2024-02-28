import React, { useContext, useEffect, useState } from "react";
import CustomerHeader from "../../../Components/IsrCustHeader/CustomerHeader";
import AddCustForm from "../../../Components/AddCustForm/AddCustForm";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function ViewCust() {
    const [searchparams] = useSearchParams();
  return (
    <div>

    <CustomerHeader />

    <AddCustForm 
    customerId = {searchparams.get(
        "id"
      )}
    FormType ={"View"}
    />

</div>
  )
}
