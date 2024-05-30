import { useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import AdminNavbar from "../../../Components/Navbars/AdminNavbar";
import RouteBar from "../../../Components/RouteBar/RouteBar";
import useProfileData from "../../../hooks/useProfileData";
import { Asterisk } from "../AdmPrincipal/AdmPrincipal";
import { ConfigProvider, Input, Select, Space, Table } from "antd";
import "./adm-product.css";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";

function AdmProduct() {
  const { profileData } = useProfileData();
  const [principalCategoryData, setPrincipalCategoryData] = useState([]);
  const [verticalData, setVerticalData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(null);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [searchData, setSearchData] = useState({
    principal: 0,
    vertical: 0,
  });

  // table columns
  const columns = [
    {
      title: "Pid",
      dataIndex: "pid",
      key: "pid",
      width: "0%",
      hidden: true,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: "15%",
    },
    {
      title: "Principal",
      dataIndex: "principal",
      key: "principal",
      width: "15%",
    },
    {
      title: "Vertical",
      dataIndex: "vertical",
      key: "vertical",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: "45%",
    },
    {
      title: "Action",
      dataIndex: "stActionatus",
      key: "Action",
      render: (_, record) => {
        return (
          <Space size="middle">
            {/* edit button */}
            <button
              type="button"
              className="viewbutton"
              style={{ marginRight: "0px" }}
              data-toggle="modal"
              data-target="#exampleEditModalCenter"
              title="Edit"
            >
              <EditOutlined />{" "}
            </button>
            {/* open the delete modal on the click of this btn and set the id of the record to be deleted */}
            <button
              type="button"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              className="viewbutton2"
              style={{ marginLeft: "0px", marginRight: "0px" }}
              title="Delete"
            >
              <DeleteFilled />
            </button>
          </Space>
        );
      },
      width: "15%",
    },
  ].filter((item) => !item.hidden);

  // run on initial load
  useEffect(() => {
    async function getPrincipalCategories() {
      try {
        const req = await fetch(
          `${localStorage.getItem("BaseUrl")}/Dar/PrincipalList`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
            },
          }
        );

        if (req.ok) {
          const res = await req.json();
          if (res.resCode === 200) {
            setPrincipalCategoryData(res.resData);
          }
        } else {
          throw new Error("request error");
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    async function getVerticals() {
      try {
        const req = await fetch(
          `${localStorage.getItem("BaseUrl")}/ISR/BranchAndVertical`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
            },
          }
        );

        if (req.ok) {
          const res = await req.json();
          setVerticalData(res.resData.vertical);
        } else {
          throw new Error("request error");
        }
      } catch (err) {
        console.log(err);
      }
    }

    getPrincipalCategories();
    getVerticals();
  }, []);

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

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  return (
    <div>
      <AppHeader data={profileData} />
      <AdminNavbar />
      <RouteBar heading="Product List(s)" />
      <div className="container-fluid">
        <div className="row px-4">
          <div className="bg-boxshadow w-100">
            <div className="ibox-content">
              {/* search input row */}
              <form>
                <div className="row">
                  <div className="col-4 mt-3 d-flex justify-content-between align-items-center">
                    <label htmlFor="principal" style={{ fontSize: "14px", marginBottom: 0 }}>
                      Principal
                      <Asterisk />
                    </label>
                    <span className="mx-2">:</span>
                    <Select
                      style={{ minWidth: "250px", height: "2rem" }}
                      placeholder="Select"
                      // value={searchData.principal}
                      onChange={(pid) => {
                        setSearchData((prev) => {
                          return {
                            ...prev,
                            principal: pid,
                          };
                        });
                      }}
                    >
                      {principalCategoryData.map((principal) => {
                        return (
                          <Select.Option
                            style={{ width: "300px" }}
                            key={principal.principalId}
                            value={principal.principalId}
                          >
                            {principal.principalName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className="col-4 mt-3 d-flex justify-content-between align-items-center">
                    <label htmlFor="principal" style={{ fontSize: '14px', marginBottom: 0 }}>
                      Verticals
                      <Asterisk />
                      <span className="mx-2">:</span>
                    </label>
                    <Select
                      style={{ minWidth: "250px", height: "2rem" }}
                      placeholder="Select"
                      // value={searchData.vertical}
                      onChange={(vid) => {
                        setSearchData((prev) => {
                          return {
                            ...prev,
                            vertical: vid,
                          };
                        });
                      }}
                    >
                      {verticalData.map((vertical) => {
                        return (
                          <Select.Option
                            key={vertical.verticalId}
                            value={vertical.verticalId}
                          >
                            {vertical.verticalName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>

                <div className="row mt-5 mb-1">
                  <div className="d-flex justify-content-center align-items-center w-100">
                    <button className="bg-danger text-white border-0 btn">
                      Reset
                    </button>
                    <button
                      className="text-white border-0 mx-1 btn"
                      style={{ background: "#27AE60" }}
                    >
                      Search
                    </button>
                    <button
                      className="text-white border-0 btn"
                      style={{ background: "#045CA5" }}
                    >
                      + ADD PRODUCT
                    </button>
                    <button
                      className="border-0 text-secondary ml-1 btn"
                      style={{ background: "#F1C40F" }}
                    >
                      Back
                    </button>
                  </div>
                </div>
                <hr />
              </form>

              <div className="my-4">
                  <div className="search-row">
                    <label htmlFor="search" className="mr-4" style={{ minHeight: '100%', fontSize: '14px' }}>Search: </label>
                    <Input placeholder="Search" id="search" type="text" style={{ width: '200px' }} value={search} onChange={handleSearch} />
                  </div>
              </div>

              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      borderColor: "#000000",
                      headerBg: "#da251c",
                      headerColor: "white",
                      cellFontSizeSM: 6,
                      rowHoverBg: "#abc4af",
                      cellPaddingInlineSM: 2,
                    },
                  },
                }}
                key={columns[0].key}
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

export default AdmProduct;
