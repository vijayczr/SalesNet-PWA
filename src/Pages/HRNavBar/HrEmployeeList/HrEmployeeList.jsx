import { useEffect, useState } from "react"
import AppHeader from "../../../Components/Header/AppHeader";
import { createSearchParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../../Components/Navbars/AdminNavbar";
import RouteBar from "../../../Components/RouteBar/RouteBar";
import { ConfigProvider, Space, Table } from "antd";
import { DeleteFilled, EditOutlined, FileAddOutlined, FolderViewOutlined } from "@ant-design/icons";
import EmpListDropdown from "../../../Components/EmplistDropdown/EmpListDropdown";


function HrEmployeeList() {
  const [profileData, setProfileData] = useState("");
  const navigate = useNavigate();

  const [Branch, setBranch] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [Groupname, setGroupname] = useState(null);
  const [BranchName, setBranchName] = useState(null);
  const [FilterName, setFilterName] = useState(null);
  const [FilterStatus, setFilterStatus] = useState("true");
  const [FilterVertical, setFilterVertical] = useState(7);
  const [DelEmpId, SetDelEmpId] = useState(null);

  const [FilterDesignation, setFilterDesignation] = useState(999);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      // position: ["topRight"]
    },
  });

  const columns = [
    {
      title: "LoginId",
      dataIndex: "userId",
      key: "userId",
      width: "7%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "18%",
    },
    {
      title: "ReportingTo",
      dataIndex: "reportingTo",
      key: "reportingTo",
      width: "12.5%",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      width: "10.5%",
    },
    {
      title: "Vertical",
      dataIndex: "vertical",
      key: "vertical",
      width: "10%",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "7%",
    },
    {
      title: "Action",
      dataIndex: "stActionatus",
      key: "Action",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            className="viewbutton"
            style={{ marginRight: "0px" }}
            onClick={() => EditEmpPage(record.userId)}
          >
            <EditOutlined />{" "}
          </button>
          <button
            type="button"
            className="viewbutton1"
            style={{ marginLeft: "0px", marginRight: "0px" }}
            onClick={() => ViewEmpPage(record.userId)}
          >
            <FolderViewOutlined />{" "}
          </button>
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            className="viewbutton2"
            style={{ marginLeft: "0px", marginRight: "0px" }}
            onClick={() => SetDelEmpId(record.userId)}
          >
            <DeleteFilled />{" "}
          </button>
          <button
            type="button"
            className="viewbutton3"
            style={{ marginLeft: "0px", marginRight: "0px" }}
            onClick={() => Empprdct(record.userId)}
          >
            <FileAddOutlined />
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
                  <h5>Do you really want to delete user {DelEmpId}</h5>
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
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => DelEmp(DelEmpId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Space>
      ),
      width: "15%",
    },
  ];

  const Empprdct = (e) => {
    navigate({
      pathname: "/EmpProduct",
      search: createSearchParams({
        id: e,
      }).toString(),
    });
  };

  async function DelEmp(e) {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/delEmp?EmpId=${e}`,
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

  const EditEmpPage = (e) => {
    navigate({
      pathname: "/EditEmployee",
      search: createSearchParams({
        id: e,
      }).toString(),
    });
  };

  const ViewEmpPage = (e) => {
    // navigate("/EditEmployee", { replace: true });
    navigate({
      pathname: "/ViewEmployee",
      search: createSearchParams({
        id: e,
      }).toString(),
    });
  };

  const DocSearchReser = () => {
    window.location.reload();
  };

  const DocumentSearch = () => {
    HrEmpList();
  };

  const SErchWord = (e) => {
    // HrEmpList();
    var value = e;
    console.log(value);
    setFilterName(value);
    console.log(FilterName);
    DocumentSearch();
  };

  const NavBack = () => {
    navigate(-1);
  };

  const NavAddEmployee = () => {
    navigate("/AddEmployee", { replace: true });
  };

  async function HrEmpList() {
    // body to be sent to the server
    try {
      let PageData = {
        IsActive: FilterStatus === "true" ? true : false,
        GroupName: Groupname === "null" ? null : Groupname,
        Branch: BranchName === "null" ? null : BranchName,
        Name: FilterName === "null" ? true : FilterName,
        Vertical: FilterVertical === "null" ? parseInt("7") : parseInt(FilterVertical),
        Designation:
          FilterDesignation === "null"
            ? parseInt("999")
            : parseInt(FilterDesignation),
        pageNumber: tableParams.pagination.current,
        pageSize: tableParams.pagination.pageSize,
      };
      console.log(PageData);
      const res = await fetch(
        `${localStorage.getItem("BaseUrl")}/HrManual/HrEmpList`,
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
      const HrMAnualData = await res.json();
      if (HrMAnualData.resCode === 200) {
        console.log(HrMAnualData.resData);
        setData(HrMAnualData.resData.data);
        console.log(data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: HrMAnualData.resData.totalCount,
          },
        });
      }
    } catch(err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    HrEmpList();
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
  
  useEffect(() => {
    async function getProfiledata() {
        try{
        const res = await fetch(
          `${localStorage.getItem("BaseUrl")}/Authentication/ProfileData`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
            },
          }
        )
        const profileData = await res.json();
        if (profileData.resCode === 200) {
          console.log(profileData.resData);
          setProfileData(profileData.resData);
          setBranch(profileData.resData.branch);
        }
        }catch(e) {
          console.log("ok");
          navigate("/", { replace: true });
        }
        // const profileData = await res.json();
        // if (profileData.resCode === 200) {
        //   console.log(profileData.resData);
        //   setProfileData(profileData.resData);
        // }
      }

      getProfiledata();
  }, [])
  return (
    <div>
        <AppHeader data={profileData} />
        <AdminNavbar />
        <RouteBar heading="Employee List(s)" />

        <div className="row p-4">
          <div className="col-lg-12">
            <div className="bg-boxshadow">
              <div className="ibox-content">
                <div className="row">
                  <div className="col-md-4 mt-3">
                    <div className="d-flex">
                      <label htmlFor="inputEmail3" className="col-md-5">
                        Group Name
                        <span
                          style={{ paddingLeft: "50px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <select
                          value={Groupname}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setGroupname(e.target.value);
                          }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"null"}>Select</option>
                          <option value={"Corporate"}>Corporate</option>
                          <option value={"Branch"}>Branch</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-3">
                    <div className="d-flex">
                      <label htmlFor="inputEmail3" className="col-md-5">
                        Branch
                        <span
                          style={{ paddingLeft: "30px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <select
                          value={BranchName}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setBranchName(e.target.value);
                          }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"null"}>Select</option>
                          {Groupname === "null" ? (
                            <></>
                          ) : Groupname === "Branch" ? (
                            <>
                              <option value={"Delhi"}>Delhi</option>
                              <option value={"Dehradun"}>Dehradun</option>
                              <option value={"Bangalore"}>Bangalore</option>
                              <option value={"Chennai"}>Chennai</option>
                              <option value={"Hydrabad"}>Hydrabad</option>
                              <option value={"Kolkata"}>Kolkata</option>
                              <option value={"Pune"}>Pune</option>
                            </>
                          ) : (
                            <option value={"Corporate"}>Corporate</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-3">
                    <div className="d-flex">
                      <label htmlFor="inputEmail3" className="col-md-5">
                        Name<span className="float-right">:</span>
                      </label>
                      <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                        <input
                          type="text"
                          style={{ width: "100%" }}
                          value={FilterName}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setFilterName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-3">
                    <div className="d-flex">
                      <label htmlFor="inputEmail3" className="col-md-5">
                        Status
                        <span
                          style={{ paddingLeft: "50px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <select
                          value={FilterStatus}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setFilterStatus(e.target.value);
                          }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"true"}>Active</option>
                          <option value={"false"}>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-3">
                    <div className="d-flex">
                      <label htmlFor="inputEmail3" className="col-md-5">
                        Vertical
                        <span
                          style={{ paddingLeft: "30px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <select
                          value={FilterVertical}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setFilterVertical(e.target.value);
                          }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"null"}>Select</option>
                          <option value={1}>ASG</option>
                          <option value={2}>ISG</option>
                          <option value={3}>PSG</option>
                          <option value={4}>Corporate</option>
                          <option value={5}>Support staff</option>
                          <option value={6}>ESG</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-3">
                    <div className="d-flex">
                      <label htmlFor="inputEmail3" className="col-md-5">
                        Designation
                        <span
                          style={{ paddingLeft: "50px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <select
                          value={FilterDesignation}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setFilterDesignation(e.target.value);
                          }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"null"}>Select</option>
                          <EmpListDropdown />
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-footer mt-3">
                  <center style={{ padding: "10px" }}>
                    {/* add employee btn */}
                    <button
                      className="FunctionButton1"
                      style={{ backgroundColor: "#183985" }}
                      onClick={NavAddEmployee}
                    >
                      + ADD EMPLOYEE
                    </button>
                    {/* reset btn */}
                    <button
                      className="FunctionButton"
                      style={{ backgroundColor: "#da251c" }}
                      onClick={DocSearchReser}
                    >
                      Reset
                    </button>
                    {/* document search btn */}
                    <button
                      className="FunctionButton"
                      style={{ backgroundColor: "#1b8532" }}
                      onClick={DocumentSearch}
                    >
                      Search
                    </button>
                    {/* back btn */}
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
              <div className="col-md-4 mt-3">
                <div className="d-flex">
                  <label htmlFor="inputEmail3" className="col-md-5">
                    Search
                    <span
                      style={{ paddingLeft: "30px" }}
                      className="pull-right"
                    >
                      :
                    </span>
                  </label>
                  <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                    <input
                      type="text"
                      value={FilterName}
                      onChange={(e) => {
                        console.log(e.target.value);
                        SErchWord(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-5" style={{ paddingLeft: "10px" }}>
                    <a
                      href={`${localStorage.getItem(
                        "BaseUrl"
                      )}/HrManual/EmployeeCSVDownload`}
                    >
                      <button
                        className="FunctionButton1"
                        style={{ backgroundColor: "#1b8532" }}
                      >
                        Download CSV
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <br></br>

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
  )
}

export default HrEmployeeList
