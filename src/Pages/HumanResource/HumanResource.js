import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppHeader from "../../Components/Header/AppHeader";
import '../HumanResource/HumanResource.css'
import { ConfigProvider, Space, Table, Tag } from 'antd';
import { colors } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

export default function HumanResource() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [DocumentType, setDocumentType] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });


  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '60%',
    },
    {
      title: 'Document',
      dataIndex: 'document',
      key: 'document',
      width: '25%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button class="bg-success" style={{color:"white"}} onClick={() => FileDownload(record.type) }>View</button>
          <button class="bg-danger " style={{ color: 'white' }}  onClick={() => FileDownload(record.type) }>download</button>
        </Space>
      ),
      width: '15%',
    },
  ];

  const FileDownload =(a) => {
    const res =  fetch(
      `https://localhost:44388/HrManual/ManualDownload?DocumentType=${a}`,
      {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
  }



  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });


  const DocSearchReser = () =>{
    window.location.reload();
  }


  async function HrManual() {
    let PageData = {
      Type: DocumentType,
      pageNumber: tableParams.pagination.current,
      pageSize: 10,
    };
    const userToken = localStorage.getItem("JwtToken");
    console.log(PageData);
    const res = await fetch(
      "https://localhost:44388/HrManual/ManualList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
        body: JSON.stringify(PageData),
      }
    );
    const HrMAnualData = await res.json();
    if (HrMAnualData.resCode === 200) {
      console.log(HrMAnualData.resData);
      setData(HrMAnualData.resData.hrmanuals);
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
  const DocumentSearch = () => {
    HrManual();
  }
  const NavBack = () => {
    navigate(-1);
  }




  useEffect(() => {
    HrManual();
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
      <AppHeader />
      <div class="breadcrumb-area">
        <div class="container-fluid">
          <div class="row pt-1 pb-1">
            <div class="col-md-6">
              <nav aria-label="breadcrumb">
                <h2> HR Manuals</h2>
              </nav>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">HR Manuals</li>
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
                  <div class="col-lg-4">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">DocumentType <span class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input
                          style={{ borderColor: "#a1b1c9" }}
                          type='text'
                          value={DocumentType}
                          onChange={(e) => { console.log(e.target.value); setDocumentType(e.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="box-footer">
                  <center style={{ padding: "10px" }}>
                    <button class="FunctionButton" style={{backgroundColor: "#da251c"}} onClick={DocSearchReser}>Reset</button>
                    <button class="FunctionButton" style={{backgroundColor: "#183985"}} onClick={DocumentSearch}>Search</button>
                    <input type="button" value="VIEW PROFILE" class="btn btn-info pull-center" onclick="ViewEmployee()" style={{ marginRight: "10px", backgroundColor: "#183985" }} />
                    <button class="FunctionButton" style={{backgroundColor: "#e8d105" , color:"black"}} onClick={NavBack}>Back</button>

                  </center>
                </div>

              </div>

              <hr></hr>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      borderColor: '#000000',
                      headerBg: '#da251c',
                      headerColor: 'white',
                      cellFontSizeMD: 14,
                      rowHoverBg: '#99a19b',
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