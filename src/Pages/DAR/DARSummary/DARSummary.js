import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { ConfigProvider, Table, Space } from 'antd';
import { EditOutlined, FolderViewOutlined, DeleteFilled, FileAddOutlined } from '@ant-design/icons';


import { useNavigate,createSearchParams } from "react-router-dom";

export default function DARSummary() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ProfileData, setProfileData] = useState("");
  const [data, setData] = useState();
  const [FilterName, setFilterName] = useState(null);

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
          <button type="button" className="viewbutton" style={{ marginRight: "0px" }} ><EditOutlined /> </button>
          <button type="button" className="viewbutton1" style={{ marginLeft: "0px", marginRight: "0px" }} onClick={() => Viewdar(record.darId)}><FolderViewOutlined /> </button>
          <button type="button" data-toggle="modal" data-target="#exampleModalCenter" className="viewbutton2" style={{ marginLeft: "0px", marginRight: "0px" }}><DeleteFilled /> </button>
          <button type="button" className="viewbutton3" style={{ marginLeft: "0px", marginRight: "0px" }} ><FileAddOutlined /></button>


          <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle"></h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h5>Do you really want to delete user {record.name}</h5>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" >Delete</button>
                </div>
              </div>
            </div>
          </div>
        </Space>
      ),
      width: '15%',
    }
  ];

  const Viewdar = (e) => {
    // navigate("/EditEmployee", { replace: true });
    navigate(
      {
        pathname: "/ViewDar",
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
      setProfileData(profileData.resData);
    }
  }


  async function DarList() {
    let PageData = {
      Search: FilterName,
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
    const HrMAnualData = await res.json();
    if (HrMAnualData.resCode === 200) {
      setData(HrMAnualData.resData.data);
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

  const DocumentSearch = () => {
    DarList();
  }

  const AddDarPage = () => {
    navigate("/AddDar", { replace: true });
  }


  return (
    <div>
      <AppHeader data={ProfileData} />

      <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row pt-1 pb-1">
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>DAR Summary</h2>
              </nav>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active" aria-current="page">DAR Summary</li>
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


                <div className="box-footer">
                  <center style={{ padding: "10px" }}>
                    <button className="FunctionButton" style={{ backgroundColor: "#06960b" ,width: "150px" }} onClick={AddDarPage}>ADD DAR</button>
                    <button className="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button className="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                    <button className="FunctionButton" type="button"  data-toggle="modal" data-target="#exampleModalCenter1" style={{ backgroundColor: "#183985", width: "150px" }}>Incentive Rule</button>

                    <div className="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Incentive Rule</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <p className="pt-0">1. Achievement {'>'}= 75 and Achievement {'<'} 76 <br></br> Achievement = 40%  <br></br>2. Achievement {'>'}= 76 and Achievement {'<'} 86 <br></br>Achievement = 50% <br></br>3. Achievement {'>'}= 86 and Achievement {'<'} 91 <br></br> Achievement = 70% <br></br>4. Achievement {'>'}= 91 <br></br>same as Achievement  </p>
                            {/* <p className="pt-0">Achievement = 40% </p>
                            <p className="pt-0">2. Achievement {'>'}= 76 and Achievement {'<'} 86 </p>
                            <p className="pt-0">Achievement = 50% </p>
                            <p className="pt-0">3. Achievement {'>'}= 86 and Achievement {'<'} 91 </p>
                            <p className="pt-0">Achievement = 70% </p>
                            <p className="pt-0">4. Achievement {'>'}= 91</p>
                            <p className="pt-0">same as Achievement </p> */}
                          </div>
                          {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          </div> */}
                        </div>
                      </div>
                    </div>


                  </center>
                </div>



              </div>



              <hr></hr>


              <div className="col-md-4 mt-3">
                <div className="d-flex">
                  <label for="inputEmail3" className="col-md-5">Customer Search<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                  <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                    <input
                      type='text'
                      value={FilterName}
                      onChange={(e) => { console.log(e.target.value); setFilterName(e.target.value); DocumentSearch() }}
                    />
                  </div>
                </div>
              </div>

              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      borderColor: '#000000',
                      headerBg: '#da251c',
                      headerColor: 'white',
                      cellFontSizeSM: 6,
                      rowHoverBg: '#abc4af',
                      // cellPaddingBlock: 0,
                      cellPaddingInlineSM: 2
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
