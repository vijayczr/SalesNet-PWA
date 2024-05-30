import React, { useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Modal, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";

export default function HrEmpDepart() {
  const navigate = useNavigate();
  const [ProfileData, setProfileData] = useState("");
  const [Branch, setBranch] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [Department, setDepartment] = useState("");
  const [EditDeptName, setEditDeptName] = useState("");

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns = [
    {
      title: "deptId",
      dataIndex: "deptId",
      key: "deptId",
      width: "0%",
      hidden: true,
    },
    {
      title: "Department",
      dataIndex: "deptName",
      key: "deptName",
      width: "60%",
    },
    {
      title: "Action",
      dataIndex: "stActionatus",
      key: "Action",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter2"
            className="viewbutton"
            style={{ marginRight: "0px" }}
            onClick={() => ViewDeptName(record.deptId)}
          >
            <EditOutlined />{" "}
          </button>
          {/* <button type="button" data-toggle="modal" data-target="#exampleModalCenter1" className="viewbutton1" style={{ marginLeft: "0px", marginRight: "0px" }} ><FolderViewOutlined /> </button> */}
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            className="viewbutton2"
            style={{
              marginLeft: "0px",
              marginRight: "0px",
              marginTop: "0px",
              marginBottom: "0px",
            }}
          >
            <DeleteFilled />{" "}
          </button>

          <div
            className="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle"></h5>
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
                  <h5>Do you really want to delete this ENTRY </h5>
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
                    className="btn btn-primary"
                    onClick={() => DelDepartment(record.deptId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModalCenter2"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle"></h5>
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
                  <div className="col-lg-12">
                    <div className="form-group d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">
                        Department<span className="pull-right">:</span>
                      </label>
                      <div className="col-md-7">
                        <input
                          onChange={(e) => {
                            setEditDeptName(e.target.value);
                          }}
                          value={EditDeptName}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
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
                    className="btn btn-primary"
                    onClick={() => EditDepartment(record.deptId)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Space>
      ),
      width: "40%",
    },
  ].filter((item) => !item.hidden);

  async function DelDepartment(e) {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/DeleteDept?Deptid=${e}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      window.location.reload();
    }
  }

  async function ViewDeptName(e) {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/ViewDept?DeptId=${e}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setEditDeptName(Response.resData);
    }
  }

  async function EditDepartment(e) {
    let PageData = {
      DeptId: e,
      DeptName: EditDeptName,
    };
    // console.log(PageData);
    // const userToken = localStorage.getItem("JwtToken");
    // console.log(PageData);
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/AddDepartment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
        body: JSON.stringify(PageData),
      }
    );
    console.log(localStorage.getItem("JwtToken"));
    const departmentList = await res.json();
    if (departmentList.resCode === 200) {
      window.location.reload();
    }
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) getProfiledata();
    return () => {
      ignore = true;
    };
  }, []);

  async function getProfiledata() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Authentication/ProfileData`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const profileData = await res.json();
    if (profileData.resCode === 200) {
      console.log(profileData.resData);
      setProfileData(profileData.resData);
      console.log(ProfileData.branch);
      setBranch(profileData.resData.branch);
    }
  }

  async function DepartmentList() {
    // let PageData = {
    //   documentType: docType,
    //   subject: subject,
    //   pageNumber: tableParams.pagination.current,
    //   pageSize: 10,
    // };
    // console.log(PageData);
    // const userToken = localStorage.getItem("JwtToken");
    // console.log(PageData);
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/DeptList`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
        // body: JSON.stringify(PageData),
      }
    );
    console.log(localStorage.getItem("JwtToken"));
    const departmentList = await res.json();
    if (departmentList.resCode === 200) {
      console.log(departmentList.resData);
      setData(departmentList.resData.data);
      console.log(data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: departmentList.resData.totalCount,
        },
      });
    }
  }

  useEffect(() => {
    DepartmentList();
  }, [JSON.stringify(tableParams)]);
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

  const DocSearchReser = () => {
    window.location.reload();
  };
  const NavBack = () => {
    navigate(-1);
  };

  async function AddDepartment() {
    let PageData = {
      DeptName: Department,
    };
    // console.log(PageData);
    // const userToken = localStorage.getItem("JwtToken");
    // console.log(PageData);
    if (Department.trim() === "") {
      Modal.error({
        title: "Error",
        content: "Required Fields are empty",
        footer: (_, { OkBtn }) => (
          <>
            <OkBtn
              className="FunctionButton"
              style={{ color: "white" }}
              onClick={() => window.location.reload()}
            />
          </>
        ),
      });
      return;
    }
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/AddDepartment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
        body: JSON.stringify(PageData),
      }
    );
    console.log(localStorage.getItem("JwtToken"));
    const departmentList = await res.json();
    if (departmentList.resCode === 200) {
      window.location.reload();
    }
  }

  return (
    <div>
      <AppHeader data={ProfileData} />

      <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row pt-1 pb-1">
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>Department</h2>
              </nav>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                <li className="breadcrumb-item">
                  <a href="/Dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Department
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div
        className="containner p-4"
        style={{
          overflow: "auto",
          backgroundColor: "#f3f5f9",
        }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="bg-boxshadow">
              <div className="ibox-content">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">
                        Department
                        <span
                          style={{ paddingLeft: "50px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <input
                          className="docinput"
                          type="text"
                          value={Department}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setDepartment(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box-footer">
                  <center style={{ padding: "10px" }}>
                    <button
                      className="FunctionButton"
                      style={{ backgroundColor: "#da251c" }}
                      onClick={DocSearchReser}
                    >
                      Reset
                    </button>
                    <button
                      className="FunctionButton"
                      style={{ backgroundColor: "#183985" }}
                      onClick={AddDepartment}
                    >
                      Submit
                    </button>
                    <button
                      className="FunctionButton"
                      style={{ backgroundColor: "#e8d105", color: "black" }}
                      onClick={NavBack}
                    >
                      Back
                    </button>
                  </center>
                </div>
              </div>

              <hr></hr>

              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      borderColor: "#000000",
                      headerBg: "#da251c",
                      headerColor: "white",
                      cellFontSizeMD: 14,
                      rowHoverBg: "#abc4af",
                      fontSize: 16,
                      cellPaddingBlock: 0,
                    },
                  },
                }}
              >
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={tableParams.pagination}
                  loading={loading}
                  onChange={handleTableChange}
                  style={{ overflowX: "auto" }}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
