import React, { useContext, useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import UserDataContext from "../../../Context/UserDataContext/UserDataContext";
import useLocalStorage from "../../../hooks/useLocalStorage";
import DarComponent from "../../../Components/DarComponent/DarComponent";
import DarHeader from "../../../Components/DarHeader/DarHeader";
import "../AddDar/AddDar.css";

export default function AddDar() {
  const [searchparams] = useSearchParams();

  const [jwtStoredValue, setJwtStoredValue] = useLocalStorage("JwtToken");
  const { userData } = useContext(UserDataContext);

  const [darHeaderData, setDarHeaderData] = useState({
    profileData: userData,
    applicationEngineer: null,
    leadType: null,
    joiningDate: Date.now(),
    visitTime: Date.now(),
    customer: null,
  });

  const [darFormData, setDarFormData] = useState([
    {
      contactPerson: {
        custId: null,
        phoneNo: null,
        mobileNo: null,
        department: null,
        designation: null,
        email: null,
      },
      principal: {
        principalId: null,
        principalName: null,
      },
      callType: null,
      callStatus: null,
      darVertical: null,
      expectedOrderValue: null,
      monthOfOrder: new Date(),
      status: null,
      statusData: null,
      opportunityStatus: null,
      opportunityStatusData: null,
      remark: "",
    },
  ]);

  const [AppEngList, setAppEngList] = useState(null);
  const [customerList, setcustomerList] = useState(null);
  const [principalList, setPrincipalList] = useState(null);
  const [customerContactList, setCustomerContactList] = useState(null);

  useEffect(() => {
    // getDarData();
    GetAppEnggList();
    SearchCustomer();
  }, []);

  useEffect(() => {
    getPersonContactList(darHeaderData?.customer);
    darFormData?.map((_, index) => {
      setDarFormData((prev) => {
        let newData = [...prev];
        newData[index] = {
          ...prev[index],
          contactPerson: {
            ...prev[index].contactPerson,
            custId: {},
          },
        };
        return newData;
      });
    });
  }, [darHeaderData?.customer]);

  async function getPersonContactList(customerId) {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/Dar/CustpersonList?CustId=${customerId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtStoredValue}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setCustomerContactList(Response.resData);
    }
  }

  async function GetPrincipalList() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/PrincipalList`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setPrincipalList(Response.resData);
    }
  }

  async function GetAppEnggList() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/AppEngineer`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setAppEngList(Response.resData);
    }
  }

  async function SearchCustomer() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/customerList?CustName`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtStoredValue}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setcustomerList(Response.resData);
    }
  }

  const addForm = () => {
    setDarFormData((prev) => {
      let newData = [...prev];
      newData.push({
        contactPerson: {
          custId: null,
          phoneNo: null,
          mobileNo: null,
          department: null,
          designation: null,
          email: null,
        },
        principal: {
          principalId: null,
          principalName: null,
        },
        callType: null,
        callStatus: null,
        darVertical: null,
        expectedOrderValue: null,
        monthOfOrder: new Date(),
        status: null,
        statusData: null,
        opportunityStatus: null,
        opportunityStatusData: null,
        remark: "",
      });

      return newData;
    });
  };

  const removeForm = (index) => {
    if (
      (darFormData?.length === 1 && index === 0) ||
      index >= darFormData?.length
    ) {
      return;
    }
    setDarFormData((prev) => {
      let newData = [...prev];
      newData.splice(index, index);
      return newData;
    });
  };

  return (
    <div className="add-dar-container">
      <AppHeader data={userData} />

      <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row pt-1 pb-1">
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>DAR Entry</h2>
              </nav>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                <li className="breadcrumb-item">
                  <a href="/Dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  DAR Entry
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <DarHeader
        darHeaderData={darHeaderData}
        setDarHeaderData={setDarHeaderData}
        AppEngList={AppEngList}
        customerList={customerList}
        disabledField={false}
      />

      <div className="form-container">
        {darFormData?.map((formData, index) => {
          return (
            <div>
              <DarComponent
                darFormData={formData}
                setDarFormData={setDarFormData}
                formIndex={index}
                customerContactList={customerContactList}
                principalList={principalList}
                disabledField={false}
                removeForm={removeForm}
              />
            </div>
          );
        })}
      </div>

      <Button className="add-form-btn" onClick={addForm}>
        Add Form +
      </Button>
    </div>
  );
}
