import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppHeader from "../../Components/Header/AppHeader";
import '../HumanResource/HumanResource.css'
import { ConfigProvider, Space, Table, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Group } from '@mui/icons-material';

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
  const [manualInfo, setmanualInfo] = useState("");
console.log(manualInfo);

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
          <button type="button" data-toggle="modal" data-placement="top" data-target=".bd-example-modal-lg" class="viewbutton" onClick={()=>manualPopup(record.type)}> <EyeOutlined /> </button>
          {/* <button class="bg-Success " style={{ color: 'white' }}  onClick={() => FileDownload(record.type) }><a href={`https://localhost:44388/HrManual/ManualDownload?DocumentType=${record.type}`} >download</a></button> */}
          <a class="downoadbutton" href={`https://localhost:44388/HrManual/ManualDownload?DocumentType=${record.type}`} >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </a>

          <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">

                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">
                <div class="col-lg-12">
                    <div class="form-group d-flex">
                        <label for="inputEmail3" class="col-md-5 mt-1">Group <span class="pull-right">:</span></label>
                        <div class="col-md-7">
                            <input value={manualInfo.group} class="form-control" disabled readonly />
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="form-group d-flex">
                        <label for="inputEmail3" class="col-md-5 mt-1">Department <span class="pull-right">:</span></label>
                        <div class="col-md-7">
                            <input value={manualInfo.department} class="form-control" disabled readonly />
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="form-group d-flex">
                        <label for="inputEmail3" class="col-md-5 mt-1">Document <span class="pull-right">:</span></label>
                        <div class="col-md-7">
                            <input value={manualInfo.document} class="form-control"disabled readonly />
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="form-group d-flex">
                        <label for="inputEmail3" class="col-md-5 mt-1">Type <span class="pull-right">:</span></label>
                        <div class="col-md-7">
                            <input value={manualInfo.type} class="form-control"disabled readonly />
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="form-group d-flex">
                        <label for="inputEmail3" class="col-md-5 mt-1">Instruction <span class="pull-right">:</span></label>
                        <div class="col-md-7">
                            <input value={manualInfo.instruction} class="form-control"disabled readonly />
                        </div>
                    </div>
                </div>
            </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <a href={`https://localhost:44388/HrManual/ManualDownload?DocumentType=${record.type}`} ><button type="button" class="btn btn-primary">Download</button></a>
                  
                </div>
              </div>
            </div>
          </div>

        </Space>
      ),
      width: '15%',
    },
  ];


  async function manualPopup(a){
    console.log(a);
    const res = await fetch(
      `https://localhost:44388/HrManual/ManualInfo?DocumentType=${a}`,
      {
        method :"GET",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
    const manualinfo = await res.json();
    if(manualinfo.resCode ===200)
    {
        setmanualInfo(manualinfo.resData);
        
    }

  }

  const FileDownload = (a) => {
    console.log(a);
    fetch(
      `https://localhost:44388/HrManual/ManualDownload?DocumentType=${a}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    console.log(a);
    ;

    //   fetch(`https://localhost:44388/HrManual/ManualDownload?DocumentType=${a}`, {
    //     method: "GET",
    //     headers: {
    //         Accept: "application/pdf",
    //         "Content-Type": "application/pdf",
    //     },

    // }).then(response => response.blob())
    //     .then(response => {
    //         var blob=response
    //         var reader = new window.FileReader();
    //         reader.readAsDataURL(blob);
    //         reader.onloadend = function() {
    //         var base64data = reader.result;
    //         console.log(base64data);
    //         window.open(base64data);
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
  }



  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });


  const DocSearchReser = () => {
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
                          class="docinput"
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
                    <button class="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={DocumentSearch}>Search</button>
                    <input type="button" value="VIEW PROFILE" class="btn btn-info pull-center" onclick="ViewEmployee()" style={{ marginRight: "10px", backgroundColor: "#183985" }} />
                    <button class="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>

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




