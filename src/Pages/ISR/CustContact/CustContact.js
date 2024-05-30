import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppHeader from '../../../Components/Header/AppHeader';
import { ConfigProvider, Table, Space, Modal } from "antd";
import {
    EditOutlined,
    FolderViewOutlined,
    DeleteFilled,
    UserAddOutlined
} from "@ant-design/icons";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function CustContact() {
    const [searchparams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ProfileData, setProfileData] = useState("");
    const [data, setData] = useState();
    const [jwtStoredValue, setJwtStoredValue] = useLocalStorage("JwtToken");

    const [CustName, setCustName] = useState(null);
    const [ContactId, setContactId] = useState(0);

    const [Contpersnname, setContpersnname] = useState(null);
    const [contemail, setcontemail] = useState(null);
    const [contphone, setcontphone] = useState(null);
    const [contmobile, setcontmobile] = useState(null);
    const [contdesignation, setcontdesignation] = useState(null);
    const [contdepartment, setcontdepartment] = useState(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            // position: ["topRight"],
        },
    });

    const columns = [
        {
            title: 'contactId',
            dataIndex: 'contactId',
            key: 'contactId',
            width: '0%',
            hidden: true
        },
        {
            title: "Contact Person",
            dataIndex: "contactPerson",
            key: "contactPerson",
            width: "20%",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            width: "8%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "19%",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: "8%",
        },
        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation",
            width: "15%",
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
            width: "15%",
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
                        onClick={() => {
                            setContactId(record.contactId);
                            setContpersnname(record.contactPerson);
                            setcontemail(record.email);
                            setcontphone(record.phone);
                            setcontmobile(record.mobile);
                            setcontdesignation(record.designation);
                            setcontdepartment(record.department);
                        }}
                    >
                        <EditOutlined />{" "}
                    </button>
                    <button
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        className="viewbutton2"
                        style={{ marginLeft: "0px", marginRight: "0px" }}
                        onClick={() => setContactId(record.contactId)}
                    >
                        <DeleteFilled />
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
                                        onClick={() => { DeleteCust() }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle"></h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5 mt-1">Contact Person<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setContpersnname(e.target.value); }}
                                                    value={Contpersnname} className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5 mt-1">Designation<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => {setcontdesignation(e.target.value); }}
                                                    value={contdesignation} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5 mt-1">Department<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                            <input
                                                    onChange={(e) => { setcontdepartment(e.target.value); }}
                                                    value={contdepartment} className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5 mt-1">Mobile<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                            <input
                                                    onChange={(e) => { setcontmobile(e.target.value); }}
                                                    value={contmobile} className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5 mt-1">Phone<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                            <input
                                                    onChange={(e) => { setcontphone(e.target.value); }}
                                                    value={contphone} className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5 mt-1">Email<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                            <input
                                                    onChange={(e) => { setcontemail(e.target.value); }}
                                                    value={contemail} className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={()=>ModifyCont()}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Space>
            ),
            width: "15%",
        },
    ].filter(item => !item.hidden);

    useEffect(() => {
        let ignore = false;

        if (!ignore) getProfiledata();
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

    async function DeleteCust() {
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/DeleteContact?ContactId=${ContactId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            }
        );
        const profileData = await res.json();
        if (profileData.resCode === 200) {
            DocSearchReser();
        }
    }

    const NavBack = () => {
        navigate(-1);
    };
    const DocSearchReser = () => {
        window.location.reload();
    };

    async function ContactList() {
        let PageData = {
            // Search: FilterName,
            // Name: CustName,
            // Branch: CustBranch,
            // Vertical: CustVertical,
            CustId: searchparams.get("id"),
            pageNumber: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
        };
        console.log(PageData);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/ISR/CustContactList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtStoredValue}`,
            },
            body: JSON.stringify(PageData),
        });
        const ContactList = await res.json();
        if (ContactList.resCode === 200) {
            setData(ContactList.resData.contList);
            setCustName(ContactList.resMessage)
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: ContactList.resData.totalCount,
                },
            });
        }
    }

    // run on initial load
    useEffect(() => {
        ContactList();
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

    async function ModifyCont() {
        let PageData = {
            CustId: Number(searchparams.get("id")),
            ContactId: Number(ContactId),
            ContactName: Contpersnname,
            Phone: contphone,
            Email: contemail,
            Mobile: contmobile,
            Designation: contdesignation,
            Department: contdepartment,
        };
        console.log(PageData);

        // if any of the form fields are empty
        if(!Contpersnname || !contphone || !contemail || !contmobile || !contdesignation || !contdepartment) {
            Modal.confirm({
                title: "Error",
                content: "Enter Required Field",
                footer: (_, { OkBtn }) => (
                  <>
                    <OkBtn className="FunctionButton" style={{ color: "white" }} />
                  </>
                ),
              });
            return;
        }
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/AddContact`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtStoredValue}`,
                },
                body: JSON.stringify(PageData),
            }
        );
        const ContData = await res.json();
        if (ContData.resCode === 200) {
            console.log(ContData.resData);
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
                                <h2>Contact List</h2>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Contact List</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>


            <div
                className="containner p-4"
                style={{ overflow: "auto", backgroundColor: "#f3f5f9" }}
            >
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bg-boxshadow">
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5">Contact Person<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setContpersnname(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5">Designation<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setcontdesignation(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5">Department<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setcontdepartment(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5">Mobile<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setcontmobile(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5">Phone<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setcontphone(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label htmlFor="inputEmail3" className="col-md-5">Email<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setcontemail(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
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
                                            style={{ backgroundColor: "#0b2087" }}
                                            onClick={ModifyCont}
                                        >
                                            + ADD
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

                            <div className="col-md-6 mt-3 mb-4">
                                <div className="d-flex">
                                    <label htmlFor="inputEmail3" className="col-md-5">Customer Name<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                                    <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                        <h4>{CustName}</h4>
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
