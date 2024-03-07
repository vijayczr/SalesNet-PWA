import React, { useContext, useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useNavigate, createSearchParams } from "react-router-dom";
import {DatePicker, ConfigProvider, Table, Select, Space } from "antd";
import {
    EditOutlined,
    FolderViewOutlined,
    DeleteFilled,
    UserAddOutlined
} from "@ant-design/icons";

export default function CreateQuotation() {
    const [ProfileData, setProfileData] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [jwtStoredValue, setJwtStoredValue] = useLocalStorage("JwtToken");
    const [data, setData] = useState();

    const [CustName, setCustName] = useState(null);
    const [Empname, setEmpname] = useState(null);
    const [JoiningDate, setJoiningDate] = useState(null);
    const [EngList, setEngList] = useState(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            // position: ["topRight"],
        },
    });

    const columns = [
        {
            title: 'LeadId',
            dataIndex: 'leadId',
            key: 'leadId',
            width: '2%'
        },
        {
            title: 'DarId',
            dataIndex: 'darId',
            key: 'darId',
            width: '2%'
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
            width: "14%",
        },
        {
            title: "Contact Person",
            dataIndex: "contactPerson",
            key: "contactPerson",
            width: "10%",
        },
        {
            title: "Vertical",
            dataIndex: "vertical",
            key: "vertical",
            width: "4%",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: "5%",
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email",
            width: "10%",
        },
        {
            title: "Principal",
            dataIndex: "principal",
            key: "principal",
            width: "10%",
        },
        {
            title: "Employee",
            dataIndex: "employee",
            key: "employee",
            width: "10%",
        },
        {
            title: "Action",
            dataIndex: "stActionatus",
            key: "Action",
            render: (_, record) => (
                <Space size="middle">
                    {/* <button
                        type="button"
                        className="viewbutton"
                        style={{ marginRight: "0px" }}
                        onClick={() => EditCustomer(record.custId)}
                    >
                        <EditOutlined />{" "}
                    </button>
                    <button
                        type="button"
                        className="viewbutton1"
                        style={{ marginLeft: "0px", marginRight: "0px" }}
                        onClick={() => ViewCustomer(record.custId)}
                    >
                        <FolderViewOutlined />{" "}
                    </button> */}
                    <button
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        className="viewbutton2"
                        style={{ marginLeft: "0px", marginRight: "0px" }}
                    // onClick={() => setDeleteddarId(record.custId)} 
                    >
                        <DeleteFilled />
                    </button>
                    {/* <button
                        type="button"
                        className="viewbutton3"
                        style={{ marginLeft: "0px", marginRight: "0px" }}
                        onClick={() => AddContact(record.custId)}
                    >
                        <UserAddOutlined />
                    </button> */}

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
                                    <h5>Do you really want to delete ??</h5>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button type="button"
                                        data-dismiss="modal"
                                        aria-label="Close" className="btn btn-primary"
                                    // onClick={() => { DeleteDar(DeleteddarId) }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Space>
            ),
            width: "5%",
        },
    ].filter(item => !item.hidden);



    useEffect(() => {
        let ignore = false;

        if (!ignore) getProfiledata();EngineerList();
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

    async function EngineerList() {

        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/EngListForQuot`,
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
            setEngList(profileData.resData);
        }
    }


    async function QuotDarList() {
        let PageData = {
            EmpId: Number(Empname),
            CustId: Number(CustName),
            VisitDate: JoiningDate,
            pageNumber: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
        };
        console.log(PageData);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/ISR/QuotDarList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtStoredValue}`,
            },
            body: JSON.stringify(PageData),
        });
        const QuotDarList = await res.json();
        if (QuotDarList.resCode === 200) {
            setData(QuotDarList.resData.data);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: QuotDarList.resData.totalCount,
                },
            });
        }
    }

    useEffect(() => {
        QuotDarList();
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
    };
    const DocSearchReser = () => {
        window.location.reload();
    };

    
  const VisitDate = (date) => {
    console.log(date);
    setJoiningDate(date);
    console.log(JoiningDate);
  };


    return (
        <div>
            <AppHeader data={ProfileData} />

            <div className="breadcrumb-area">
                <div className="container-fluid">
                    <div className="row pt-1 pb-1">
                        <div className="col-md-6">
                            <nav aria-label="breadcrumb">
                                <h2>Create Quotation</h2>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Create Quotation</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="containner p-4"
                style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }}
            >
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bg-boxshadow">
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Customer<span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setCustName(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Employee<span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setEmpname(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Visit Date<span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <Space >
                                                    <DatePicker style={{ width: "100%" }} onChange={VisitDate} />
                                                </Space>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <center style={{ padding: "10px" }}>
                                        <button
                                            className="FunctionButton"
                                            style={{ backgroundColor: "#06960b", width: "85px" }}
                                            onClick={QuotDarList}
                                        >
                                            Search
                                        </button>
                                        <button
                                            className="FunctionButton"
                                            style={{ backgroundColor: "#da251c" }}
                                            onClick={DocSearchReser}
                                        >
                                            Reset
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

                            <hr></hr>

                            <div className="col-md-4 mt-3 mb-4">
                                <div className="d-flex">
                                    <label for="inputEmail3" className="col-md-5">Search<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                                    <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                        <input
                                            type='text'
                                        // value={FilterName}
                                        // onChange={(e) => { console.log(e.target.value); SErchWord(e.target.value); }}
                                        />
                                    </div>
                                    {/* <div className="col-md-5" style={{ paddingLeft: "10px" }}>
                                        <a href={`${localStorage.getItem("BaseUrl")}/HrManual/EmployeeCSVDownload`} ><button className="FunctionButton1" style={{ backgroundColor: "#1b8532" }}>Download CSV</button></a>

                                    </div> */}

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
                                            // cellPaddingBlock: 0,
                                            cellPaddingInlineSM: 2,
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
