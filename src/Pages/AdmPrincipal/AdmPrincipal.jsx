import { useEffect, useState } from "react";
import AppHeader from "../../Components/Header/AppHeader";
import RouteBar from "../../Components/RouteBar/RouteBar";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Space, Table, message } from "antd";
import {
  DeleteFilled,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useProfileData from "../../hooks/useProfileData";
import ModalBox from "../../Components/Modals/ModalBox";
import './adm-principal.css';

function Asterisk() {
  return <span style={{ color: "red", padding: "0px 4px" }}>*</span>;
}

function AdmPrincipal() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [principalData, setPrincipalData] = useState({
    name: "",
    period: "",
    description: "",
    contactInfo: "",
  });
  const [editPrincipalData, setEditPrincipalData] = useState({
    name: "",
    period: "",
    description: "",
    contactInfo: "",
  });
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [numberErr, setNumberErr] = useState("");
  const [deletePrincipalId, setDeletePrincipalId] = useState(null);
  const [editPrincipalId, setEditPrincipalId] = useState(null);
  const [viewPrincipalId, setViewPrincipalId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const { profileData } = useProfileData(); // custom hook to get profile data
  let jsonTableParams = JSON.stringify(tableParams);

  // delete principal notification handler
  const deleteSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Deleted Successfully",
    });
  };

  // error notification handler
  const msgError = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  // success notification handler
  const addSuccess = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  // function to fetch principal list whenever the page first loads, reloads or the search
  // input changes or any new entry is added to the table.
  async function getPrincipalList() {
    let body = {
      PrincipalName: search,
      pageNumber: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    };
    try {
      const req = await fetch(
        `${localStorage.getItem("BaseUrl")}/Admin/PrincipalList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
          },
          body: JSON.stringify(body),
        }
      );
      const res = await req.json();
      if (res.resCode === 200) {
        setData(res.resData.resData.principalList);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.resData.resData.totalCount,
          },
        });
      }
    } catch (err) {
      msgError(err.message);
    }
  }

  // this will edit the data of the individual principal by taking the principal id
  async function editPrincipal(recordId) {
    let body = {
      PrincipalId: Number(recordId),
      Name: editPrincipalData.name,
      Description: editPrincipalData.description,
      ContactInfo: editPrincipalData.contactInfo,
      CreditPeriod: Number(editPrincipalData.period)
    }
    const regex = /[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if(
      editPrincipalData.name.trim() === "" || 
      String(editPrincipalData.period).trim() === "" ||
      String(editPrincipalData.period).trim() === "0" ||
      editPrincipalData.contactInfo.trim() === "" || 
      editPrincipalData.description.trim() === ""
    ) {
      msgError("Empty Field(s), Data is not updated");
      return;
    }

    if(regex.test(String(editPrincipalData.period))) {
      msgError("Invalid Data");
      return;
    }
    try {
      const req = await fetch(`${localStorage.getItem("BaseUrl")}/Admin/AddPrincipal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
        body: JSON.stringify(body)
      });

      if(req.ok) {
        const res = await req.json();
        if(res.resCode === 200) {
          addSuccess("Edited Successfully");
          getPrincipalList();
        }
      }
    } catch(err) {
      console.log(err.message);
      msgError("Error occurred")
    }
  }

  // run on initial load
  useEffect(() => {
    getPrincipalList();
  }, [jsonTableParams]);

  // table columns
  const columns = [
    {
      title: "Pid",
      dataIndex: "pid",
      key: "pid",
      width: "0%",
      hidden: true,
    },
    {
      title: "Principal",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Action",
      dataIndex: "stActionatus",
      key: "Action",
      render: (_, record) => {
        return (
          <Space size="middle">
            {/* edit button */}
            <button
              type="button"
              className="viewbutton"
              style={{ marginRight: "0px" }}
              data-toggle="modal"
              data-target="#exampleEditModalCenter"
              title="Edit Principal"
              onClick={() => {
                getPrincipalById(record.pid);
                setEditPrincipalId(record.pid);
              }}
            >
              <EditOutlined />{" "}
            </button>
            {/* view button */}
            <button
              type="button"
              className="viewbutton1"
              style={{ marginLeft: "0px", marginRight: "0px" }}
              data-toggle="modal"
              data-target="#viewModalCenter"
              onClick={() => {
                getPrincipalById(record.pid);
                setViewPrincipalId(record.pid);
              }}
              title="View Principal"
            >
              <EyeOutlined />{" "}
            </button>
            {/* open the delete modal on the click of this btn and set the id of the record to be deleted */}
            <button
              type="button"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              className="viewbutton2"
              style={{ marginLeft: "0px", marginRight: "0px" }}
              onClick={() => setDeletePrincipalId(record.pid)}
              title="Delete Principal"
            >
              <DeleteFilled />
            </button>

            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      Delete Principal
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <h5>Do you really want to delete ??</h5>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                      className="btn btn-primary"
                      onClick={() => deletePrincipalHandler(deletePrincipalId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* edit modal box component */}
            <ModalBox
              secondaryBtnText="Cancel"
              primaryBtnText="Edit"
              modalClassName="modal"
              modalId="exampleEditModalCenter"
              modalTitleHeading="Edit Principal"
              labelledBy="exampleEditModalCenterTitle"
              uniqueId={editPrincipalId}
              action={editPrincipal}
            >
              <form>
                <div className="d-flex justify-content-between align-items-center row mb-4">
                  <div className="col-5">
                    <label htmlFor={`p-name-${record.pid}`}>
                      Principal Name <Asterisk /> :{" "}
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      type="text"
                      id={`p-name-${record.pid}`}
                      className="form-control"
                      value={editPrincipalData.name}
                      name="name"
                      onChange={handleEditInputs}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center row mb-4">
                  <div className="col-5">
                    <label htmlFor={`period-${record.pid}`}>
                      Credit Period <Asterisk /> :{" "}
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      type="text"
                      id={`period-${record.pid}`}
                      className="form-control"
                      value={editPrincipalData.period}
                      name="period"
                      onChange={handleEditInputs}
                    />
                  </div>
                  {numberErr && (
                    <p className="text-danger px-3" style={{ fontSize: "12px" }}>
                      {numberErr}
                    </p>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center row mb-4">
                  <div className="col-5">
                    <label htmlFor={`desc-${record.pid}`}>
                      Description <Asterisk /> :{" "}
                    </label>
                  </div>
                  <div className="col-7">
                    <textarea
                      type="text"
                      id={`desc-${record.pid}`}
                      className="form-control"
                      value={editPrincipalData.description}
                      name="description"
                      onChange={handleEditInputs}
                      style={{ fontSize: "14px" }}
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center row">
                  <div className="col-5">
                    <label htmlFor={`info-${record.pid}`}>
                      Contact Information <Asterisk /> :{" "}
                    </label>
                  </div>
                  <div className="col-7">
                    <textarea
                      type="text"
                      id={`info-${record.pid}`}
                      className="form-control"
                      value={editPrincipalData.contactInfo}
                      name="contactInfo"
                      onChange={handleEditInputs}
                      style={{ fontSize: "14px" }}
                    ></textarea>
                  </div>
                </div>
              </form>
            </ModalBox>

            {/* view modal box component */}
            <ModalBox
              secondaryBtnText="Close"
              modalClassName="modal"
              modalId="viewModalCenter"
              modalTitleHeading="View Principal"
              labelledBy="exampleViewModalCenterTitle"
              uniqueId={viewPrincipalId}
            >
              <form>
                <div className="d-flex justify-content-between align-items-center row mb-4">
                  <div className="col-5">
                    <label htmlFor={`view-name-${record.pid}`}>
                      Principal Name <Asterisk /> :{" "}
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      type="text"
                      id={`view-name-${record.pid}`}
                      className="form-control"
                      value={editPrincipalData.name}
                      name="name"
                      disabled
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center row mb-4">
                  <div className="col-5">
                    <label htmlFor={`view-period-${record.pid}`}>
                      Credit Period <Asterisk /> :{" "}
                    </label>
                  </div>
                  <div className="col-7">
                    <input
                      type="text"
                      id={`view-period-${record.pid}`}
                      className="form-control"
                      value={editPrincipalData.period}
                      name="period"
                      disabled
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center row mb-4">
                  <div className="col-5">
                    <label htmlFor={`view-desc-${record.pid}`}>
                      Description <Asterisk /> :{" "}
                    </label>
                  </div>
                  <div className="col-7">
                    <textarea
                      type="text"
                      id={`view-desc-${record.pid}`}
                      className="form-control"
                      value={editPrincipalData.description}
                      name="description"
                      disabled
                      style={{ fontSize: "14px" }}
                    ></textarea>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center row">
                  <div className="col-5">
                    <label htmlFor={`view-info-${record.pid}`}>
                      Contact Information <Asterisk /> :{" "}
                    </label>
                  </div>
                  <div className="col-7">
                    <textarea
                      type="text"
                      id={`view-info-${record.pid}`}
                      className="form-control"
                      value={editPrincipalData.contactInfo}
                      name="contactInfo"
                      style={{ fontSize: "14px" }}
                      disabled
                    ></textarea>
                  </div>
                </div>
              </form>
            </ModalBox>
          </Space>
        );
      },
      width: "25%",
    },
  ].filter((item) => !item.hidden);

  // function to handle the change the state of the inputs in the page.
  function handleInputs(e) {
    if (Number.isNaN(Number(principalData.period))) {
      setNumberErr("Invalid Number");
    } else {
      setNumberErr("");
    }
    setPrincipalData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  // this will run when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(principalData.period)) {
      setNumberErr(`Invalid data, must be a number`);
      return;
    }

    let body = {
      Name: principalData.name,
      Description: principalData.description,
      ContactInfo: principalData.contactInfo,
      CreditPeriod: Number(principalData.period),
    };
    try {
      const req = await fetch(
        `${localStorage.getItem("BaseUrl")}/Admin/AddPrincipal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
          },
          body: JSON.stringify(body),
        }
      );

      const res = await req.json();
      if (res) {
        addSuccess("Added Successfully");
        getPrincipalList();
      }
    } catch (err) {
      // console.log(err.message);
      msgError("Could not add principal");
    } finally {
      setPrincipalData({
        contactInfo: "",
        description: "",
        name: "",
        period: "",
      });
    }
  };

  // this will run the search field is changed.
  const handleSearch = (e) => {
    setSearch(e.target.value);
    getPrincipalList();
  };

  // this will run when the delete button in the modal is pressed
  const deletePrincipalHandler = async (principalId) => {
    try {
      const req = await fetch(
        `${localStorage.getItem(
          "BaseUrl"
        )}/Admin/DeletePrincipal?PrincipalId=${principalId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
          },
        }
      );
      if (req.ok) {
        const res = await req.json();
        if (res.resCode === 200) {
          deleteSuccess();
          getPrincipalList();
        }
      }
    } catch (err) {
      msgError(err.message);
    }
  };

  // this will get the data of the individual table field, when the edit or view btn is clicked
  async function getPrincipalById(principalId) {
    try {
      const req = await fetch(
        `${localStorage.getItem(
          "BaseUrl"
        )}/Admin/ViewPrincipal?PID=${principalId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
          },
        }
      );

      if (req.ok) {
        const res = await req.json();
        if (res.resCode === 200) {
          setEditPrincipalData({
            name: res.resData.name,
            contactInfo: res.resData.info,
            description: res.resData.discription,
            period: Number(res.resData.creditPeriod),
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  // this will control the state of form fields of the edit modal inputs.
  function handleEditInputs(e) {
    if (Number.isNaN(Number(editPrincipalData.period))) {
      setNumberErr("Invalid Number");
    } else {
      setNumberErr("");
    }
    setEditPrincipalData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  // zebra-striped table
  const getRowClassName = (record, index) => {
    if (index % 2 === 1) {
      return 'zebra-highlight'; // Apply zebra-striping to odd-indexed rows
    }
    return '';
  };

  return (
    <div>
      {contextHolder}
      <AppHeader data={profileData} />
      <RouteBar heading="Principal" />

      <div className="container-fluid my-4">
        <div className="bg-boxshadow">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row">
              <div className="col-6">
                <div className="d-flex items-center justify-content-center">
                  <label htmlFor="p-name" className="w-50 flex-grow-1 mr-2">
                    Principal Name <Asterisk />{" "}
                  </label>
                  <span className="px-4">:</span>
                  <input
                    type="text"
                    id="p-name"
                    className="w-100 px-2 border border-light-subtle"
                    style={{ fontSize: "14px", height: "28px" }}
                    required
                    value={principalData.name}
                    name="name"
                    onChange={handleInputs}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex items-center justify-content-center">
                  <label htmlFor="p-credit" className="w-50 flex-grow-1 mr-2">
                    Credit Period (Days) <Asterisk />{" "}
                  </label>
                  <span className="px-4">:</span>
                  <input
                    type="text"
                    id="p-credit"
                    className="w-100 px-2 border border-light-subtle"
                    style={{ fontSize: "14px", height: "28px" }}
                    required
                    value={principalData.period}
                    name="period"
                    onChange={handleInputs}
                  />
                </div>
                {numberErr && (
                  <p className="text-danger" style={{ fontSize: "12px" }}>
                    {numberErr}
                  </p>
                )}
              </div>
            </div>
            <div className="row my-4">
              <div className="col-6">
                <div className="d-flex items-center justify-content-center">
                  <label htmlFor="p-desc" className="w-50 flex-grow-1 mr-2">
                    Description <Asterisk />{" "}
                  </label>
                  <span className="px-4">:</span>
                  <textarea
                    id="p-desc"
                    className="w-100 px-2 border border-light-subtle"
                    style={{ fontSize: "14px", height: "68px" }}
                    required
                    value={principalData.description}
                    name="description"
                    onChange={handleInputs}
                  ></textarea>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex items-center justify-content-center">
                  <label htmlFor="p-info" className="w-50 flex-grow-1 mr-2">
                    Contact Information
                    <Asterisk />
                  </label>
                  <span className="px-4">:</span>
                  <textarea
                    className="w-100 px-2 border border-light-subtle"
                    style={{ fontSize: "14px", height: "68px" }}
                    required
                    value={principalData.contactInfo}
                    name="contactInfo"
                    onChange={handleInputs}
                    id="p-info"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row flex justify-content-center items-center mt-4">
              <button
                type="button"
                className="FunctionButton"
                style={{ backgroundColor: "#C0392B", fontWeight: "normal" }}
                onClick={() => {
                  setPrincipalData({
                    name: "",
                    period: "",
                    contactInfo: "",
                    description: "",
                  });

                  setSearch("");
                  getPrincipalList();
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                className="FunctionButton"
                style={{ backgroundColor: "#045CA5", fontWeight: "normal" }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="FunctionButton"
                style={{
                  backgroundColor: "#F1C40F",
                  fontWeight: "normal",
                  color: "black",
                }}
              >
                Back
              </button>
            </div>
          </form>

          <div className="d-flex my-4">
            <label htmlFor="search">
              Search
              <span style={{ paddingLeft: "30px" }} className="pull-right">
                :
              </span>
            </label>
            <div style={{ paddingLeft: "10px" }}>
              <input
                type="text"
                value={search}
                className="border border-light-subtle"
                onChange={handleSearch}
              />
            </div>
          </div>

          <ConfigProvider
            theme={{
              components: {
                Table: {
                  borderColor: "#000000",
                  headerBg: "#da251c",
                  headerColor: "white",
                  cellFontSizeSM: 6,
                  rowHoverBg: "#abc4af",
                  cellPaddingInlineSM: 2,
                },
              },
            }}
            key={columns[0].key}
          >
            <Table
              columns={columns}
              dataSource={data}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
              style={{ overflowX: "auto" }}
              rowClassName={getRowClassName}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default AdmPrincipal;
