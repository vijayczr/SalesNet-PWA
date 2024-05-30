import React, { useState, useEffect } from "react";
import AppHeader from "../../Components/Header/AppHeader";
import "../KnowledgeShare/KnowledgeShare.css";
import { ConfigProvider, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import Knowledgefile from "../../Components/AddKnowledgeFile/Knowledgefile";

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

  // table data
  const columns = [
    {
      dataIndex: "knowledgeDocId",
      key: "knowledgeDocId",
      width: "0%",
      hidden: true,
    },
    {
      title: "Document Type",
      dataIndex: "documentType",
      key: "documentType",
      width: "25%",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      width: "59%",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            data-toggle="modal"
            data-placement="top"
            data-target=".bd-example-modal-lg"
            className="viewbutton"
            onClick={() => manualPopup(record.knowledgeDocId)}
          >
            {" "}
            <EyeOutlined />{" "}
          </button>
          {/* <button className="bg-Success " style={{ color: 'white' }}  onClick={() => FileDownload(record.type) }><a href={`https://localhost:44388/HrManual/ManualDownload?DocumentType=${record.type}`} >download</a></button> */}
          {/* <a className="downoadbutton" href={`https://localhost:44388/HrManual/ManualDownload?DocumentType=${record.type}`} >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-download" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
            </svg>
          </a> */}
          
          {/* document details modal box */}
          <div
            className="modal fade bd-example-modal-lg"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
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
                        Document Type <span className="pull-right">:</span>
                      </label>
                      <div className="col-md-7">
                        <input
                          placeholder={manualInfo.documentType}
                          className="form-control"
                          disabled
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">
                        Subject <span className="pull-right">:</span>
                      </label>
                      <div className="col-md-7">
                        <input
                          value={manualInfo.subject}
                          className="form-control"
                          disabled
                          readonly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">
                        Description <span className="pull-right">:</span>
                      </label>
                      <div className="col-md-7">
                        <input
                          placeholder={manualInfo.description}
                          className="form-control"
                          disabled
                          readonly
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
                    Close
                  </button>
                  <a
                    href={`${localStorage.getItem(
                      "BaseUrl"
                    )}/KnowledgeShare/KnowledgeDownload?KnowledgeId=${
                      manualInfo.knowledgeId
                    }`}
                  >
                    <button type="button" className="btn btn-primary">
                      Download
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Space>
      ),
      width: "26%",
    },
  ].filter((item) => !item.hidden);

  async function manualPopup(a) {
    console.log(a);
    const res = await fetch(
      `${localStorage.getItem(
        "BaseUrl"
      )}/KnowledgeShare/knowledge-info?KnowledgeId=${a}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
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
  };

  const DocumentSearch = () => {
    KnowledgeShare();
  };

  const DocSearchReser = () => {
    window.location.reload();
  };

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

  // this function runs on initial render as well as on the click of "Search" btn.
  async function KnowledgeShare() {
    let PageData = {
      documentType: docType,
      subject: subject,
      pageNumber: tableParams.pagination.current,
      pageSize: 10,
    };
    console.log(PageData);
    const userToken = localStorage.getItem("JwtToken");
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/KnowledgeShare/knowledge-list`,
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
        },
      });
    }
  }

  // run on initial load and whenever the table pagination changes.
  useEffect(() => {
    KnowledgeShare();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination)
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

      <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row pt-1 pb-1">
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>Knowledge Sharing</h2>
              </nav>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                <li className="breadcrumb-item">
                  <a href="/Dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Knowledge Sharing
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
                        Document Type
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
                          value={docType}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setDocType(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">
                        Subject
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
                          value={subject}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setsubject(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="box-footer">
                  <center style={{ padding: "10px" }}>
                    {/* Add document button */}
                    <Knowledgefile /> 
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
                      onClick={DocumentSearch}
                    >
                      Search
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

              <hr />

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
