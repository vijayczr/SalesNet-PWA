import React, { useContext, useEffect, useState } from "react";
import CustomerHeader from "../../../Components/IsrCustHeader/CustomerHeader";
import AddCustForm from "../../../Components/AddCustForm/AddCustForm";

export default function AddCust() {
  return (
    <div>
      <CustomerHeader />

      <AddCustForm customerId={0} FormType={"Add"} />
    </div>
  );
}
