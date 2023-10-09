import React, { useEffect, useState } from 'react'
import AppHeader from "../../Components/Header/AppHeader";
import "../HolidayList/HolidayList.css";
import { ConfigProvider,Table, Tag } from 'antd';

import { useNavigate } from "react-router-dom";

export default function HolidayList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ProfileData, setProfileData] = useState("");
  const [data, setData] = useState();
  const [Date, setDate] = useState(2023);
  const [Branch, setBranch] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '35%',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      width: '15%',
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

  async function HolidayList() {
    let PageData = {
      Year: `Jan 1, ${Date}`,
      branchName: Branch,
      pageNumber: tableParams.pagination.current,
      pageSize: 10,
    };
    console.log(PageData);
    const userToken = localStorage.getItem("JwtToken");
    console.log(PageData);
    const res = await fetch(
      "https://localhost:44388/Holidays/HolidayList",
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
  const DocumentSearch = () => {
    HolidayList();
  }
  const NavBack = () => {
    navigate(-1);
  }




  useEffect(() => {
    HolidayList();
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
                <h2>Holiday Lists</h2>
              </nav>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Holiday Lists</li>
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
                  <div class="col-lg-6">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">YEAR<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        {/* <input
                          class="docinput"
                          type='number'
                          value={Date}
                          onChange={(e) => { console.log(e.target.value); setDate(e.target.value) }}
                        /> */}

                        <select value={Date}
                          onChange={(e) => { console.log(e.target.value); setDate(e.target.value) }}
                          style={{ width: "200px" }}>
                          <option value={2019}>2019</option>
                          <option value={2020}>2020</option>
                          <option value={2021}>2021</option>
                          <option value={2022}>2022</option>
                          <option value={2023}>2023</option>
                          <option value={2024}>2024</option>
                          <option value={2025}>2025</option>
                        </select>

                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Branch<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        {/* <input
                          class="docinput"
                          type='text'
                          value={Branch}
                          onChange={(e) => { console.log(e.target.value); setBranch(e.target.value) }}
                        /> */}

                        <select value={Branch}
                          onChange={(e) => { console.log(e.target.value); setBranch(e.target.value) }}
                          style={{ width: "200px" }}>
                          <option value={"All"}>All</option>
                          <option value={"Delhi"}>Delhi</option>
                          <option value={"Dehradun"}>Dehradun</option>
                          <option value={"Bangalore"}>Bangalore</option>
                          <option value={"Chennei"}>Chennei</option>
                          <option value={"Hydrabad"}>Hydrabad</option>
                          <option value={"Kolkata"}>Kolkata</option>
                          <option value={"Pune"}>Pune</option>
                        </select>

                      </div>
                    </div>
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

              <hr></hr>

              {/* <div class="row">
                <p style={{paddingLeft:"20px"}}>Show</p>
                <div style={{paddingLeft:"20px"}} >
                  <select value={value} onChange={handleChange}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <p style={{paddingLeft:"20px"}}>entries.</p>
              </div> */}

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
