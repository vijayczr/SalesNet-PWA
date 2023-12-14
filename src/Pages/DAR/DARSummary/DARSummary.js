import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { ConfigProvider, Table,Space } from 'antd';
import {  EditOutlined, FolderViewOutlined, DeleteFilled ,FileAddOutlined} from '@ant-design/icons';


import { useNavigate } from "react-router-dom";

export default function DARSummary() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ProfileData, setProfileData] = useState("");
  const [data, setData] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      position: ["topRight"]
    },
  });

  const columns = [
    {
      title: 'DAR Id',
      dataIndex: 'darId',
      key: 'darId',
      width: '7%',
    },
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      width: '12%',
    },
    {
      title: 'Lead Id',
      dataIndex: 'leadid',
      key: 'leadid',
      width: '7%',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      width: '21.5%',
    },
    {
      title: 'Contact person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      width: '15%',
    },
    {
      title: 'Visit Date',
      dataIndex: 'visitDate',
      key: 'visitDate',
      width: '10%',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      width: '12.s%',
    },
    {
      title: 'Action',
      dataIndex: 'stActionatus',
      key: 'Action',
      render: (_, record) => (
        <Space size="middle">
          <button type="button" class="viewbutton" style={{ marginRight: "0px" }} ><EditOutlined /> </button>
          <button type="button" class="viewbutton1" style={{ marginLeft: "0px", marginRight: "0px" }} ><FolderViewOutlined /> </button>
          <button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="viewbutton2" style={{ marginLeft: "0px", marginRight: "0px" }}><DeleteFilled /> </button>
          <button type="button" class="viewbutton3" style={{ marginLeft: "0px", marginRight: "0px" }} ><FileAddOutlined /></button>


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
                  <button type="button" class="btn btn-primary" >Delete</button>
                </div>
              </div>
            </div>
          </div>
        </Space>
      ),
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
    }
  }


  async function DarList() {
    let PageData = {
      // branchName: Branch,
      pageNumber: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    };
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/DarList`,
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
          total: HrMAnualData.resData.totalcount,
        }
      })
    }
  }


  useEffect(() => {
    DarList();
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

  const NavBack = () => {
    navigate(-1);
  }

  const DocSearchReser = () => {
    window.location.reload();
  }

  return (
    <div>
      <AppHeader data={ProfileData} />

      <div class="breadcrumb-area">
        <div class="container-fluid">
          <div class="row pt-1 pb-1">
            <div class="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>DAR Summary</h2>
              </nav>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">DAR Summary</li>
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
        

        <div class="box-footer">
          <center style={{ padding: "10px" }}>
            <button class="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
            <button class="FunctionButton" style={{ backgroundColor: "#183985" }}>Search</button>
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
              cellFontSizeSM :6,
              rowHoverBg: '#abc4af',
              // cellPaddingBlock: 0,
              cellPaddingInlineSM : 2
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
