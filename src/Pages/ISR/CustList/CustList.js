import React, { useContext, useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, createSearchParams } from "react-router-dom";
import { ConfigProvider, Table,  Select, Space } from "antd";
import {
    EditOutlined,
    FolderViewOutlined,
    DeleteFilled,
    UserAddOutlined
} from "@ant-design/icons";
import useLocalStorage from "../../../hooks/useLocalStorage";
import "../CustList/CustList.css"

export default function CustList() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [CustName, setCustName] = useState(null);
    const [CustBranch, setCustBranch] = useState(0);
    const [CustVertical, setCustVertical] = useState(0);
    const [ProfileData, setProfileData] = useState("");
    const [BranchandVertical, setBranchandVertical] = useState(null);
    const [FilterName, setFilterName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [jwtStoredValue, setJwtStoredValue] = useLocalStorage("JwtToken");
    const [DeleteddarId, setDeleteddarId] = useState(null);
    const [customerList, setcustomerList] = useState(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            // position: ["topRight"],
        },
    });

    const columns = [
        {
            title: 'custId',
            dataIndex: 'custId',
            key: 'custId',
            width: '0%',
            hidden: true
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "40%",
        },
        {
            title: "Branch",
            dataIndex: "branch",
            key: "branch",
            width: "10%",
        },
        {
            title: "Vertical",
            dataIndex: "vertical",
            key: "vertical",
            width: "10%",
        },
        {
            title: "Sub-Vertical",
            dataIndex: "subVertical",
            key: "subVertical",
            width: "10%",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "10%",
        },
        {
            title: "Action",
            dataIndex: "stActionatus",
            key: "Action",
            render: (_, record) => (
                <Space size="middle">
                    <button
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
                    </button>
                    <button
                        type="button"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                        className="viewbutton2"
                        style={{ marginLeft: "0px", marginRight: "0px" }}
                        onClick={() => setDeleteddarId(record.custId)} >
                        <DeleteFilled />
                    </button>
                    <button
                        type="button"
                        className="viewbutton3"
                        style={{ marginLeft: "0px", marginRight: "0px" }}
                        onClick={() => AddContact(record.custId)}
                    >
                        <UserAddOutlined />
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
                                        onClick={() => { DeleteDar(DeleteddarId) }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Space>
            ),
            width: "20%",
        },
    ].filter(item => !item.hidden);

    const EditCustomer = (e) => {
        navigate(
            {
                pathname: "/EditCustomer",
                search: createSearchParams({
                    id: e
                }).toString(),
                // state: { name: 'John Doe', age: 25 }
            },
        );
    };

    const AddContact = (e) => {
        navigate(
            {
                pathname: "/CustContact",
                search: createSearchParams({
                    id: e
                }).toString(),
                // state: { name: 'John Doe', age: 25 }
            },
        );
    };

    const ViewCustomer = (e) => {
        navigate(
            {
                pathname: "/ViewCustomer",
                search: createSearchParams({
                    id: e
                }).toString(),
                // state: { name: 'John Doe', age: 25 }
            },
        );
    };

    const DeleteDar = async (e) => {
        console.log(e);
        const res = await fetch(
            `${process.env.REACT_APP_BASE_URL}/ISR/DeleteCustomer?customerId=${e}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtStoredValue}`,
                },
            }
        );
        const personResponse = await res.json();
        if (personResponse.resCode === 200) {

            window.location.reload();
            return personResponse?.resData;
        } else {
            console.log("Couldn't fetch contacted person data");
        }
    };


    useEffect(() => {
        let ignore = false;

        if (!ignore) getProfiledata(); getBranchAndVertical(); SearchCustomer();
        return () => { ignore = true; }
    }, []);

    async function SearchCustomer() {
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/Dar/customerList?CustName`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtStoredValue}`,
                },
            }
        );
        const Response = await res.json();
        if (Response.resCode === 200) {
            setcustomerList(Response.resData);
        }
    }

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

    async function getBranchAndVertical() {

        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/BranchAndVertical`,
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
            setBranchandVertical(profileData.resData);
        }
    }

    async function ISRCustList() {
        let PageData = {
            Search: FilterName,
            Name: CustName,
            Branch: CustBranch,
            Vertical: CustVertical,
            pageNumber: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
        };
        console.log(PageData);
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/ISR/CustomerList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtStoredValue}`,
            },
            body: JSON.stringify(PageData),
        });
        const IsrCustList = await res.json();
        if (IsrCustList.resCode === 200) {
            setData(IsrCustList.resData.data);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: IsrCustList.resData.totalCount,
                },
            });
        }
    }

    useEffect(() => {
        ISRCustList();
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

    const ModifyCust = () => {
        navigate(
            {
                pathname: "/modifyCust",
                // search: createSearchParams({
                //   id: e
                // }).toString(),
                // state: { name: 'John Doe', age: 25 }
            },
        );
    };

    const SErchWord = (e) => {
        // HrEmpList();
        var value = e;
        console.log(value);
        setFilterName(value);

        console.log(FilterName);
        ISRCustList()
    }




    return (
        <div>
            <AppHeader data={ProfileData} />

            <div className="breadcrumb-area">
                <div className="container-fluid">
                    <div className="row pt-1 pb-1">
                        <div className="col-md-6">
                            <nav aria-label="breadcrumb">
                                <h2>Customer List</h2>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Customer List</li>
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
                                            <label for="inputEmail3" className="col-md-5">Customer Name<span className="float-right">:</span></label>
                                            <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                                <input
                                                    type='text'
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => { console.log(e.target.value); setCustName(e.target.value) }}
                                                />
                                                {/* <Select
                                                    showSearch
                                                    style={{ width: 250 }}
                                                    placeholder="Select"
                                                    onChange={(e) => console.log(e)}
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? "")
                                                            .toLowerCase()
                                                            .includes(input.toLowerCase())
                                                    }
                                                    options={customerList}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Branch<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={CustBranch}
                                                    onChange={(e) => { console.log(e.target.value); setCustBranch(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value={0}>Select</option>
                                                    {
                                                        (BranchandVertical == null)
                                                            ? <></>
                                                            :
                                                            (
                                                                BranchandVertical.branch ?
                                                                    BranchandVertical.branch.map((e) => (
                                                                        <option value={e.branchId} >{e.branchName}</option>
                                                                    )) : null)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5">Vertical<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={CustVertical}
                                                    onChange={(e) => { console.log(e.target.value); setCustVertical(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value={0}>Select</option>
                                                    {
                                                        (BranchandVertical == null)
                                                            ? <></>
                                                            :
                                                            (
                                                                BranchandVertical.vertical ?
                                                                    BranchandVertical.vertical.map((e) => (
                                                                        <option value={e.verticalId} >{e.verticalName}</option>
                                                                    )) : null)

                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <center style={{ padding: "10px" }}>
                                        <button
                                            className="FunctionButton"
                                            style={{ backgroundColor: "#06960b", width: "150px" }}
                                            onClick={ISRCustList}
                                        >
                                            Search Customer
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
                                            style={{ backgroundColor: "#0b2087" }}
                                            onClick={ModifyCust}
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

                            <div className="col-md-4 mt-3 mb-4">
                                <div className="d-flex">
                                    <label for="inputEmail3" className="col-md-5">Search<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                                    <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                        <input
                                            type='text'
                                            value={FilterName}
                                            onChange={(e) => { console.log(e.target.value); SErchWord(e.target.value); }}
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

