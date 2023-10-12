import React, { useEffect, useState } from 'react'
import "../HR/HR.css";
import AppHeader from "../../Components/Header/AppHeader";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Table, Tag } from 'antd';

export default function HR() {
  const navigate = useNavigate();
  const [ProfileData, setProfileData] = useState("");
  const [Branch, setBranch] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [Groupname, setGroupname] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
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
      title: 'Branch/Head office',
      dataIndex: 'branch',
      key: 'branch',
      width: '9.5%',
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
      dataIndex: 'status',
      key: 'status',
      width: '16%',
    }
  ];



  useEffect(() => {
    let ignore = false;

    if (!ignore) getProfiledata()
    return () => { ignore = true; }
  }, []);

  async function getProfiledata() {

    const res = await fetch(
      "https://localhost:44388/Authentication/ProfileData",
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
      IsActive: true,
      GroupName: (Groupname === "null")? null : Groupname,
      pageNumber: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    };
    console.log(PageData);
    const res = await fetch(
      "https://localhost:44388/HrManual/HrEmpList",
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
    <div>
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

      <div className='containner p-4' style={{ height: "600px", overflow: "auto", backgroundColor: "#f3f5f9" }} >
        <div class="row">
          <div class="col-lg-12">
            <div class="bg-boxshadow">
              <div class="ibox-content">
                <div class="row">
                  <div class="col-md-4">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5">Group Name<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <select value={Groupname}
                          onChange={(e) => { console.log(e.target.value); setGroupname(e.target.value) }}
                          style={{ width: "200px" }}
                        >
                          <option value={"null"}>Select</option>
                          <option value={"Corporate"}>Corporate</option>
                          <option value={"Branch"}>Branch</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                  </div>
                  <div class="col-md-4">
                  </div>
                </div>
                <div class="box-footer">
                  <center style={{ padding: "10px" }}>
                    <button class="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={DocumentSearch}>Search</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                  </center>
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
