import React, { useEffect, useState } from 'react'
import AppHeader from "../../Components/Header/AppHeader";
import { ConfigProvider,Space, Table, Tag } from 'antd';
import { useNavigate, useSearchParams } from "react-router-dom";
import { DeleteFilled } from '@ant-design/icons';


export default function EmpProduct(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ProfileData, setProfileData] = useState("");
  const [data, setData] = useState();
  const [ProdStatus, setProdStatus] = useState("Active");
  const [Vertical, setVertical] = useState("null");
  const [searchparams] = useSearchParams();

  const columns = [
    {
      dataIndex: 'productverticalId',
      key: 'productverticalId',
      width: '0%',
      hidden:true
    },
    {
      title: 'Vertical',
      dataIndex: 'vertical',
      key: 'vertical',
      width: '34%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '33%',
    },
    {
      title: 'Action',
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => (
        <Space size="middle">
          <button type="button"  className="viewbutton2" style={{ marginLeft: "0px", marginRight: "0px" }} onClick={() => DelEmpProd(record.productverticalId)}><DeleteFilled /> </button>
        </Space>
      ),
      width: '33%',
    }
  ].filter(item => !item.hidden);

  async function DelEmpProd(e){
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/ProdDel?verticalId=${e}`,
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

  useEffect(() => {
    let ignore = false;

    if (!ignore) getProfiledata(); EmpProductList();
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

  async function EmpProductList() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/EmpProduct?EmpId=${searchparams.get("id")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
    const profileData = await res.json();
    console.log(profileData.resData);
    setData(profileData.resData)
  }

  const NavBack = () => {
    navigate(-1);
  }
  // const DocumentSearch = () => {
  //   HolidayList();
  // }
  const DocSearchReser = () => {
    window.location.reload();
  }
  
  async function AddProd(){
    let request = {
      EmpId:searchparams.get("id"),
      vertical : Vertical ,
      status : ProdStatus
    }
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/HrManual/AddEmpProduct`,
      {
          method: "POST",
          headers: { "Content-Type": "application/json" ,
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`},
          body: JSON.stringify(request),
      }
  );
  const Response = await res.json();
  if (Response.resCode === 200) {
    console.log(Response.resData);
    window.location.reload();
}
  }



  return (
    <div>
      <AppHeader data={ProfileData} />

      <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row pt-1 pb-1">
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>Employee Products</h2>
              </nav>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">Employee Products</li>
              </ol>
            </div>
          </div>
        </div>
      </div>



      <div className='containner p-4' style={{ height: "600px", overflow: "auto", backgroundColor: "#f3f5f9" }} >

        <div className="row">
          <div className="col-lg-12">
            <div className="bg-boxshadow">
              <div className="ibox-content">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">Verticals<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                      <div className="col-md-7">
                        {/* <input
                        className="docinput"
                        type='number'
                        value={Date}
                        onChange={(e) => { console.log(e.target.value); setDate(e.target.value) }}
                      /> */}

                        <select
                          value={Vertical}
                          onChange={(e) => { console.log(e.target.value); setVertical(e.target.value); }}
                          style={{ width: "100%" }}
                        >
                          <option value={"null"}>Select</option>
                          <option value={"ASG"}>ASG</option>
                          <option value={"ISG"}>ISG</option>
                          <option value={"PSG"}>PSG</option>
                          <option value={"Corporate"}>Corporate</option>
                          <option value={"Support Staff"}>Support Staff</option>
                          <option value={"ESG"}>ESG</option>
                        </select>

                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex">
                      <label for="inputEmail3" className="col-md-5 mt-1">Status<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                      <div className="col-md-7">
                        {/* <input
                        className="docinput"
                        type='text'
                        value={Branch}
                        onChange={(e) => { console.log(e.target.value); setBranch(e.target.value) }}
                      /> */}

                        <select value={ProdStatus}
                          onChange={(e) => { console.log(e.target.value); setProdStatus(e.target.value) }}
                          style={{ width: "100%" }}>
                          <option value={"Active"}>Active</option>
                          <option value={"In-Active"}>In-Active</option>
                        </select>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="box-footer">
                  <center style={{ padding: "10px" }}>
                    <button className="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button className="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={AddProd}>Add</button>
                    <button className="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                  </center>
                </div>

              </div>

              <hr></hr>

              {/* <div className="row">
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

              <div style={{marginBottom:"50px"}}>
                <h2>Employee Target List</h2>
              </div>

              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      borderColor: '#000000',
                      headerBg: '#da251c',
                      headerColor: 'white',
                      cellFontSizeMD: 10,
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
                  loading={loading}
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
