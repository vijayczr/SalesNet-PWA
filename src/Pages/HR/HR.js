import React, { useEffect, useState } from 'react'
import "../HR/HR.css";
import AppHeader from "../../Components/Header/AppHeader";
import { useNavigate, Link, createSearchParams } from "react-router-dom";
import { ConfigProvider, Space, Table, Tag } from 'antd';
import { EyeOutlined, EditOutlined, FolderViewOutlined, DeleteFilled ,FileAddOutlined} from '@ant-design/icons';
import EmpListDropdown from '../../Components/EmplistDropdown/EmpListDropdown';

export default function HR() {
  const navigate = useNavigate();
  const [ProfileData, setProfileData] = useState("");
  const [Branch, setBranch] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [Groupname, setGroupname] = useState(null);
  const [BranchName, setBranchName] = useState(null);
  const [FilterName, setFilterName] = useState(null);
  const [FilterStatus, setFilterStatus] = useState("true");
  const [FilterVertical, setFilterVertical] = useState(7);
  const [FilterDesignation, setFilterDesignation] = useState(999);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      position: ["topRight"]
    },
  });

  const columns = [
    {
      title: 'LoginId',
      dataIndex: 'userId',
      key: 'userId',
      width: '7%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '18%',
    },
    {
      title: 'ReportingTo',
      dataIndex: 'reportingTo',
      key: 'reportingTo',
      width: '12.5%',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      width: '10.5%',
    },
    {
      title: 'Vertical',
      dataIndex: 'vertical',
      key: 'vertical',
      width: '10%',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '7%',
    },
    {
      title: 'Action',
      dataIndex: 'stActionatus',
      key: 'Action',
      render: (_, record) => (
        <Space size="middle">
          <button type="button" class="viewbutton" style={{ marginRight: "0px" }} onClick={() => EditEmpPage(record.userId)}><EditOutlined /> </button>
          <button type="button" class="viewbutton1" style={{ marginLeft: "0px", marginRight: "0px" }} onClick={() => ViewEmpPage(record.userId)}><FolderViewOutlined /> </button>
          <button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="viewbutton2" style={{ marginLeft: "0px", marginRight: "0px" }}><DeleteFilled /> </button>
          <button type="button" class="viewbutton3" style={{ marginLeft: "0px", marginRight: "0px" }} onClick={() => Empprdct(record.userId)}><FileAddOutlined /></button>


          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h5>Do you really want to delete user {record.name}</h5>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary" onClick={() => DelEmp(record.userId)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </Space>
      ),
      width: '15%',
    }
  ];

  const Empprdct = (e) => {
    navigate(
      {
        pathname: "/EmpProduct",
        search: createSearchParams({
          id: e
        }).toString()
      }
    );
  };

  async function DelEmp(e){
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/delEmp?EmpId=${e}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
    const Response = await res.json();
    if(Response.resCode === 200) {
      window.location.reload();
    }

  };


  const EditEmpPage = (e) => {
    navigate(
      {
        pathname: "/EditEmployee",
        search: createSearchParams({
          id: e
        }).toString()
      }
    );
  };

  const ViewEmpPage = (e) => {
    // navigate("/EditEmployee", { replace: true });
    navigate(
      {
        pathname: "/ViewEmployee",
        search: createSearchParams({
          id: e
        }).toString()
      }
    );
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) getProfiledata()
    return () => { ignore = true; }
  }, []);

  async function getProfiledata() {

    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Authentication/ProfileData`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
    const profileData = await res.json();
    if (profileData.resCode === 200) {
      console.log(profileData.resData);
      setProfileData(profileData.resData);
      console.log(ProfileData.branch);
      setBranch(profileData.resData.branch)
    }
  }

  const DocSearchReser = () => {
    window.location.reload();
  }

  const DocumentSearch = () => {
    HrEmpList();
  }
  const NavBack = () => {
    navigate(-1);
  }

  const NavAddEmployee = () => {
    navigate("/AddEmployee", { replace: true });
  }


  async function HrEmpList() {
    let PageData = {
      IsActive: (FilterStatus === "true") ? true : false,
      GroupName: (Groupname === "null") ? null : Groupname,
      Branch: (BranchName === "null") ? null : BranchName,
      Name: (FilterName === "null") ? true : FilterName,
      Vertical: (FilterVertical === "null") ? parseInt("7") : parseInt(FilterVertical),
      Designation: (FilterDesignation === "null") ? parseInt("999") : parseInt(FilterDesignation),
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
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
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
        }
      })
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



  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      
      <AppHeader data={ProfileData} />

      <div class="breadcrumb-area">
        <div class="container-fluid">
          <div class="row pt-1 pb-1">
            <div class="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>Employee Lists</h2>
              </nav>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Employee Lists</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className='containner p-4' style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }} >
        <div class="row">
          <div class="col-lg-12">
            <div class="bg-boxshadow">
              <div class="ibox-content">
                <div class="row">
                  <div class="col-md-4 mt-3">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5">Group Name<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <select value={Groupname}
                          onChange={(e) => { console.log(e.target.value); setGroupname(e.target.value) }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"null"}>Select</option>
                          <option value={"Corporate"}>Corporate</option>
                          <option value={"Branch"}>Branch</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mt-3">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5">Branch<span style={{ paddingLeft: "30px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <select value={BranchName}
                          onChange={(e) => { console.log(e.target.value); setBranchName(e.target.value) }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"null"}>Select</option>
                          {
                            (Groupname === "null")
                              ? <></>
                              :
                              (
                                (Groupname === "Branch")
                                  ? <>
                                    <option value={"Delhi"}>Delhi</option>
                                    <option value={"Dehradun"}>Dehradun</option>
                                    <option value={"Bangalore"}>Bangalore</option>
                                    <option value={"Chennai"}>Chennai</option>
                                    <option value={"Hydrabad"}>Hydrabad</option>
                                    <option value={"Kolkata"}>Kolkata</option>
                                    <option value={"Pune"}>Pune</option>
                                  </>
                                  : <option value={"Corporate"}>Corporate</option>)
                          }
                        </select>
                      </div>
                    </div>

                  </div>
                  <div class="col-md-4 mt-3">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5">Name<span class="float-right">:</span></label>
                      <div class="col-md-7" style={{ paddingLeft: "10px" }}>
                        <input
                          type='text'
                          style={{ width: "100%" }}
                          value={FilterName}
                          onChange={(e) => { console.log(e.target.value); setFilterName(e.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mt-3">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5">Status<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <select value={FilterStatus}
                          onChange={(e) => { console.log(e.target.value); setFilterStatus(e.target.value) }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"true"}>Active</option>
                          <option value={"false"}>Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mt-3">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5">Vertical<span style={{ paddingLeft: "30px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <select value={FilterVertical}
                          onChange={(e) => { console.log(e.target.value); setFilterVertical(e.target.value) }}
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
                  <div class="col-md-4 mt-3">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5">Designation<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <select value={FilterDesignation}
                          onChange={(e) => { console.log(e.target.value); setFilterDesignation(e.target.value) }}
                          style={{ width: "15vw" }}
                        >
                          <option value={"null"}>Select</option>
                          <EmpListDropdown />
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="box-footer mt-3">
                  <center style={{ padding: "10px" }}>
                    <button class="FunctionButton1" style={{ backgroundColor: "#183985" }} onClick={NavAddEmployee}>+ ADD EMPLOYEE</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#1b8532" }} onClick={DocumentSearch}>Search</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                  </center>
                </div>
              </div>
              <div class="col-md-4 mt-3">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5">Search<span style={{ paddingLeft: "30px" }} class="pull-right">:</span></label>
                      <div class="col-md-7" style={{ paddingLeft: "10px" }}>
                        <input
                          type='text'
                          value={FilterName}
                          onChange={(e) => { console.log(e.target.value); setFilterName(e.target.value) ;DocumentSearch() }}
                        />
                      </div>
                    </div>
                  </div>
              <br></br>


              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      borderColor: '#000000',
                      headerBg: '#da251c',
                      headerColor: 'white',
                      cellFontSizeMD: 14,
                      rowHoverBg: '#abc4af',
                      fontSize: 16,
                      cellPaddingBlock: 0
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
  )
}
