import React, { useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ConfigProvider, Space, Table } from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";

export default function TargetEdit() {
  const navigate = useNavigate();
  const [ProfileData, setProfileData] = useState("");
  const [Branch, setBranch] = useState("");
  const [searchparams] = useSearchParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [PrincipalList, setPrincipalList] = useState(null);
  const [FinancialYear, setFinancialYear] = useState("2023-2024");
  const [Principal, setPrincipal] = useState(null);
  const [Vertical, setVertical] = useState(null);
  const [AMJAmount, setAMJAmount] = useState(0);
  const [JASAmount, setJASAmount] = useState(0);
  const [ONDAmount, setONDAmount] = useState(0);
  const [JFMAmount, setJFMAmount] = useState(0);

  const [SearchValue, setSearchValue] = useState("");

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      position: ["topRight"],
    },
  });

  const columns = [
    {
      title: "empTargetDetailId",
      dataIndex: "empTargetDetailId",
      key: "empTargetDetailId",
      width: "0%",
      hidden: true,
    },
    {
      title: "Quarter",
      dataIndex: "quarter",
      key: "quarter",
      width: "12.5%",
    },
    {
      title: "Vertical",
      dataIndex: "vertical",
      key: "vertical",
      width: "12.5%",
    },
    {
      title: "Principal",
      dataIndex: "principal",
      key: "principal",
      width: "25%",
    },
    {
      title: "Target Amount",
      dataIndex: "targetAmount",
      key: "targetAmount",
      width: "20%",
    },
    {
      title: "Classify Target",
      dataIndex: "classifyTarget",
      key: "classifyTarget",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "stActionatus",
      key: "Action",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter2"
            className="viewbutton"
            style={{ marginRight: "0px" }}
          >
            <EditOutlined />{" "}
          </button>
          {/* <button type="button" data-toggle="modal" data-target="#exampleModalCenter1" className="viewbutton1" style={{ marginLeft: "0px", marginRight: "0px" }} ><FolderViewOutlined /> </button> */}
          <button
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            className="viewbutton2"
            style={{
              marginLeft: "0px",
              marginRight: "0px",
              marginTop: "0px",
              marginBottom: "0px",
            }}
          >
            <DeleteFilled />{" "}
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
                  <h5>Do you really want to delete this ENTRY </h5>
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
                    onClick={() => DelTarget(record.empTargetDetailId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Space>
      ),
      width: "10%",
    },
  ].filter((item) => !item.hidden);

  // run on initial load
  useEffect(() => {
    let ignore = false;

    if (!ignore) getProfiledata();
    PrincipalListdata();
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

  async function DelTarget(e) {
    const res = await fetch(
      `${localStorage.getItem(
        "BaseUrl"
      )}/HrManual/DelTarget?TargetDetailId=${e}`,
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

  async function PrincipalListdata() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/PrincipalList`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const PrincipalData = await res.json();
    if (PrincipalData.resCode === 200) {
      console.log(PrincipalData.resData);
      setPrincipalList(PrincipalData.resData);
    }
  }

  async function UploadTarget() {
    let PageData = {
      EmpId: searchparams.get("id"),
      FinancialYear: FinancialYear,
      Principal: Principal,
      Vertical: Vertical,
      TargetJFM: JFMAmount,
      TargetAMJ: AMJAmount,
      TargetJAS: JASAmount,
      TargetOND: ONDAmount,
    };


    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/AddTarget`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
        body: JSON.stringify(PageData),
      }
    );
    const PrincipalData = await res.json();
    if (PrincipalData.resCode === 200) {
      window.location.reload();
    }
  }

  // run on initial load
  useEffect(() => {
    TargetList();
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

  async function TargetList() {
    let PageData = {
      search: SearchValue,
      EmpId: searchparams.get("id"),
    };
    console.log(PageData);
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/HrEmpTargetList`,
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
    const TargetData = await res.json();
    // response data not coming: check it later
    if (TargetData.resCode === 200) {
      console.log(TargetData.resData);
      setData(TargetData.resData);
      console.log(data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          //   total: HrMAnualData.resData.totalCount,
        },
      });
    }
  }

  const DocumentSearch = () => {
    TargetList();
  };

  const DocSearchReser = () => {
    window.location.reload();
  };
  const NavBack = () => {
    navigate(-1);
  };

  const AddTarget = () => {
    UploadTarget();
  };

  return (
    <div>
      <AppHeader data={ProfileData} />

      <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row pt-1 pb-1">
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>Employee Target</h2>
              </nav>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                <li className="breadcrumb-item">
                  <a href="/Dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Employee Target
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
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">
                        Financial Year
                        <span
                          style={{ paddingLeft: "50px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <input
                          type="text"
                          value={FinancialYear}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setFinancialYear(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">
                        Principal
                        <span
                          style={{ paddingLeft: "50px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <select
                          style={{ width: "100%" }}
                          onChange={(e) => {
                            setPrincipal(e.target.value);
                          }}
                        >
                          <option value={"null"}>Select</option>
                          {PrincipalList
                            ? PrincipalList.map((e) => (
                                <option
                                  key={e.principalId}
                                  value={e.principalId}
                                >
                                  {e.principalName}
                                </option>
                              ))
                            : null}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">
                        Financial Year
                        <span
                          style={{ paddingLeft: "50px" }}
                          className="pull-right"
                        >
                          :
                        </span>
                      </label>
                      <div className="col-md-7">
                        <select
                          onChange={(e) => {
                            console.log(e.target.value);
                            setVertical(e.target.value);
                          }}
                          style={{ width: "100%" }}
                          required
                        >
                          <option value={null}>Select</option>
                          <option value={1}>ASG</option>
                          <option value={2}>ISG</option>
                          <option value={3}>PSG</option>
                          <option value={4}>Corporate</option>
                          <option value={5}>Support Staff</option>
                          <option value={6}>ESG</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="d-flex mt-3">
                      <label
                        for="inputEmail3"
                        className="col-md-5 mt-1"
                        style={{ paddingLeft: "150px", fontWeight: "bold" }}
                      >
                        Quarter
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex mt-3">
                      <label
                        for="inputEmail3"
                        className="col-md-5 mt-1"
                        style={{ paddingLeft: "50px", fontWeight: "bold" }}
                      >
                        Target
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label
                        for="inputEmail3"
                        className="col-md-5 mt-1"
                        style={{ paddingLeft: "150px" }}
                      >
                        AMJ
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <div className="col-md-7">
                        <input
                          type="text"
                          style={{ paddingLeft: "50px" }}
                          value={AMJAmount}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setAMJAmount(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label
                        for="inputEmail3"
                        className="col-md-5 mt-1"
                        style={{ paddingLeft: "150px" }}
                      >
                        JAS
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <div className="col-md-7">
                        <input
                          type="text"
                          style={{ paddingLeft: "50px" }}
                          value={JASAmount}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setJASAmount(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4"></div>

                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label
                        for="inputEmail3"
                        className="col-md-5 mt-1"
                        style={{ paddingLeft: "150px" }}
                      >
                        OND
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <div className="col-md-7">
                        <input
                          type="text"
                          style={{ paddingLeft: "50px" }}
                          value={ONDAmount}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setONDAmount(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label
                        for="inputEmail3"
                        className="col-md-5 mt-1"
                        style={{ paddingLeft: "150px" }}
                      >
                        JFM
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <div className="col-md-7">
                        <input
                          type="text"
                          style={{ paddingLeft: "50px" }}
                          value={JFMAmount}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setJFMAmount(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4"></div>
                </div>

                <div className="box-footer">
                  <center style={{ padding: "10px" }}>
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
                      onClick={AddTarget}
                    >
                      Submit
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

              <br></br>
              <div className="col-md-4 mt-3">
                <div className="d-flex">
                  <label for="inputEmail3" className="col-md-5">
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
                      value={SearchValue}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSearchValue(e.target.value);
                        DocumentSearch();
                      }}
                    />
                  </div>
                </div>
              </div>

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
