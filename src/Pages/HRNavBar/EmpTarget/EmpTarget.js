import React, { useEffect, useState } from 'react'
import "../../HR/HR.css";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, Link, createSearchParams } from "react-router-dom";
import { ConfigProvider, Space, Table, Tag } from 'antd';
import { EyeOutlined, EditOutlined, FolderViewOutlined, DeleteFilled ,FileAddOutlined} from '@ant-design/icons';
import EmpListDropdown from '../../../Components/EmplistDropdown/EmpListDropdown';

export default function EmpTarget() {
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
        title: 'Manager',
        dataIndex: 'reportingTo',
        key: 'reportingTo',
        width: '15.5%',
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
        width: '4%',
      },
      {
        title: 'Action',
        dataIndex: 'stActionatus',
        key: 'Action',
        render: (_, record) => (
          <Space size="middle">
            <button type="button" className="viewbutton" style={{ marginRight: "0px" }} onClick={() => EditTarget(record.userId)}><EditOutlined /> </button>
           
          </Space>
        ),
        width: '15%',
      }
    ];

    const EditTarget = (e) => {
        navigate(
          {
            pathname: "/HrEmpTarget",
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
  
        <div className="breadcrumb-area">
          <div className="container-fluid">
            <div className="row pt-1 pb-1">
              <div className="col-md-6">
                <nav aria-label="breadcrumb">
                  <h2>Employee Target Lists</h2>
                </nav>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                  <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Employee Target Lists</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
  
        <div className='containner p-4' style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }} >
          <div className="row">
            <div className="col-lg-12">
              <div className="bg-boxshadow">
                <div className="ibox-content">
                  <div className="row">
                    <div className="col-md-4 mt-3">
                      <div className="d-flex">
                        <label for="inputEmail3" className="col-md-5">Group Name<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                        <div className="col-md-7">
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
                    <div className="col-md-4 mt-3">
                      <div className="d-flex">
                        <label for="inputEmail3" className="col-md-5">Branch<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                        <div className="col-md-7">
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
                    <div className="col-md-4 mt-3">
                      <div className="d-flex">
                        <label for="inputEmail3" className="col-md-5">Name<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                        <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                          <input
                            type='text'
                            value={FilterName}
                            onChange={(e) => { console.log(e.target.value); setFilterName(e.target.value) }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mt-3">
                      <div className="d-flex">
                        <label for="inputEmail3" className="col-md-5">Status<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                        <div className="col-md-7">
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
                    <div className="col-md-4 mt-3">
                      <div className="d-flex">
                        <label for="inputEmail3" className="col-md-5">Vertical<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                        <div className="col-md-7">
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
                    <div className="col-md-4 mt-3">
                      <div className="d-flex">
                        <label for="inputEmail3" className="col-md-5">Designation<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                        <div className="col-md-7">
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
                  <div className="box-footer mt-3">
                    <center style={{ padding: "10px" }}>
                      <button className="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                      <button className="FunctionButton" style={{ backgroundColor: "#1b8532" }} onClick={DocumentSearch}>Search</button>
                      <button className="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                    </center>
                  </div>
                </div>
                <div className="col-md-4 mt-3">
                      <div className="d-flex">
                        <label for="inputEmail3" className="col-md-5">Search<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                        <div className="col-md-7" style={{ paddingLeft: "10px" }}>
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
