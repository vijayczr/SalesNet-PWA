import React, { useState, useEffect } from 'react'
import AppHeader from "../../Components/Header/AppHeader";
import "../KnowledgeShare/KnowledgeShare.css"
import { ConfigProvider, Space, Table, Tag } from 'antd';
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from '@ant-design/icons';
import Knowledgefile from '../../Components/AddKnowledgeFile/Knowledgefile';

export default function KnowledgeShare() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ProfileData, setProfileData] = useState("");
  const [data, setData] = useState();
  const [Branch, setBranch] = useState("");
  const [docType, setDocType] = useState("");
  const [subject, setsubject] = useState("");
  const [manualInfo, setmanualInfo] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns = [
    {
      dataIndex: 'knowledgeDocId',
      key: 'knowledgeDocId',
      width: '0%',
      hidden:true
    },
    {
      title: 'Document Type',
      dataIndex: 'documentType',
      key: 'documentType',
      width: '25%',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: '60%',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      render: (_, record) => (
        <Space size="middle">
                    <button type="button" data-toggle="modal" data-placement="top" data-target=".bd-example-modal-lg" class="viewbutton" onClick={() => manualPopup(record.knowledgeDocId)}> <EyeOutlined /> </button>
          {/* <button class="bg-Success " style={{ color: 'white' }}  onClick={() => FileDownload(record.type) }><a href={`https://localhost:44388/HrManual/ManualDownload?DocumentType=${record.type}`} >download</a></button> */}
          {/* <a class="downoadbutton" href={`https://localhost:44388/HrManual/ManualDownload?DocumentType=${record.type}`} >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </a> */}

          <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header" >

                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">
                  <div class="col-lg-12">
                    <div class="form-group d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Document Type <span class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input placeholder={manualInfo.documentType} class="form-control" disabled readonly />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Subject <span class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input value={manualInfo.subject} class="form-control" disabled readonly />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Description <span class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input placeholder={manualInfo.description} class="form-control" disabled readonly />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <a href={`https://localhost:44388/KnowledgeShare/KnowledgeDownload?KnowledgeId=${manualInfo.knowledgeId}`} ><button type="button" class="btn btn-primary">Download</button></a>
                </div>
              </div>
            </div>
          </div>

        </Space>
      ),
      width: '15%',
    }
  ].filter(item => !item.hidden);;

  async function manualPopup(a) {
    console.log(a);
    const res = await fetch(
      `https://localhost:44388/KnowledgeShare/knowledge-info?KnowledgeId=${a}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
    const manualinfo = await res.json();
    if (manualinfo.resCode === 200) {
      setmanualInfo(manualinfo.resData);
      console.log(manualInfo.knowledgeId);
    }

  }

  const NavBack = () => {
    navigate(-1);
  }

  const DocumentSearch = () => {
    KnowledgeShare();
  }

const DocSearchReser = () => {
    window.location.reload();
  }  




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


  async function KnowledgeShare() {
    let PageData = {
      documentType: docType,
      subject: subject,
      pageNumber: tableParams.pagination.current,
      pageSize: 10,
    };
    console.log(PageData);
    const userToken = localStorage.getItem("JwtToken");
    console.log(PageData);
    const res = await fetch(
      "https://localhost:44388/KnowledgeShare/knowledge-list",
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
    const KnowledgeShare = await res.json();
    if (KnowledgeShare.resCode === 200) {
      console.log(KnowledgeShare.resData);
      setData(KnowledgeShare.resData.data);
      console.log(data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: KnowledgeShare.resData.count,
        }
      })
    }
  }


  useEffect(() => {
    KnowledgeShare();
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
                <h2>Knowledge Sharing</h2>
              </nav>
            </div>
            <div class="col-md-6">
              <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Knowledge Sharing</li>
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
                      <label for="inputEmail3" class="col-md-5 mt-1">Document Type<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input
                          class="docinput"
                          type='text'
                          value={docType}
                          onChange={(e) => { console.log(e.target.value); setDocType(e.target.value) }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Subject<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input
                          class="docinput"
                          type='text'
                          value={subject}
                          onChange={(e) => { console.log(e.target.value); setsubject(e.target.value) }}
                        />

                      </div>
                    </div>
                  </div>
                </div>

                <div class="box-footer">
                  <center style={{ padding: "10px" }}>
                    <Knowledgefile/>
                    <button class="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button class="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={DocumentSearch}>Search</button>
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
