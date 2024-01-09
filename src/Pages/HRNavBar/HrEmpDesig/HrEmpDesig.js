import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Space, Table, Tag } from 'antd';
import EmpListDropdown from '../../../Components/EmplistDropdown/EmpListDropdown';
import { EyeOutlined, EditOutlined, FolderViewOutlined, DeleteFilled, FileAddOutlined } from '@ant-design/icons';


export default function HrEmpDesig() {
    const navigate = useNavigate();
    const [ProfileData, setProfileData] = useState("");
    const [Branch, setBranch] = useState("");
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [DesignName, setDesignName] = useState();
    const [parentId, setparentId] = useState();
    const [teamType, setteamType] = useState();
    const [isActive, setisActive] = useState("Active");
    const [DesignName1, setDesignName1] = useState();
    const [parentId1, setparentId1] = useState();
    const [teamType1, setteamType1] = useState();
    const [isActive1, setisActive1] = useState("Active");
    const [FilterName, setFilterName] = useState(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const columns = [
        {
            title: 'designationId',
            dataIndex: 'designationId',
            key: 'designationId',
            width: '0%',
            hidden: true
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            width: '35%',
        },
        {
            title: 'Parent',
            dataIndex: 'parent',
            key: 'parent',
            width: '20%',
        },
        {
            title: 'Team Type',
            dataIndex: 'teamType',
            key: 'teamType',
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '10%',
        },
        {
            title: 'Action',
            dataIndex: 'stActionatus',
            key: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <button type="button" data-toggle="modal" data-target="#exampleModalCenter2" className="viewbutton" style={{ marginRight: "0px" }} onClick={() => ViewEmpPage(record.designationId)} ><EditOutlined /> </button>
                    <button type="button" data-toggle="modal" data-target="#exampleModalCenter1" className="viewbutton1" style={{ marginLeft: "0px", marginRight: "0px" }} onClick={() => ViewEmpPage(record.designationId)}><FolderViewOutlined /> </button>
                    <button type="button" data-toggle="modal" data-target="#exampleModalCenter" className="viewbutton2" style={{ marginLeft: "0px", marginRight: "0px" }}><DeleteFilled /> </button>

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
                                    <h5>Do you really want to delete this ENTRY {record.name}</h5>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={() => DelEmp(record.designationId)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                            <label for="inputEmail3" className="col-md-5 mt-1">Designation<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input placeholder={DesignName} className="form-control" disabled readonly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">teamType<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input placeholder={teamType} className="form-control" disabled readonly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Parent<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={parentId}
                                                    style={{ width: "15vw" }}
                                                    disabled
                                                >
                                                    <option value={"null"}>Select</option>
                                                    <EmpListDropdown />
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">isActive<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input placeholder={(isActive === true) ? "Active" : "In-Active"} className="form-control" disabled readonly />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
                                            <label for="inputEmail3" className="col-md-5 mt-1">Designation<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setDesignName(e.target.value); }}
                                                    value={DesignName} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">teamType<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setteamType(e.target.value); }}
                                                    value={teamType} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Parent<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select 
                                                value={parentId}
                                                    onChange={(e) => { setparentId(e.target.value) }}
                                                    style={{ width: "15vw" }}
                                                >
                                                    <option value={"null"}>Select</option>
                                                    <EmpListDropdown />
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">isActive<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                {/* <input placeholder={(isActive === true) ? "Active" : "In-Active"} className="form-control" /> */}
                                                <select value={(isActive === true) ? "Active" : "In-Active"}
                                                    onChange={(e) => { setisActive(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value={"Active"}>Active</option>
                                                    <option value={"In-Active"}>In-Active</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={() => EditDesig(record.designationId)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Space>
            ),
            width: '15%',
        }
    ].filter(item => !item.hidden);;

    async function DelEmp(e) {
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/DeleteDesignation?DesignationId=${e}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            }
        );
        const Response = await res.json();
        if (Response.resCode === 200) {
            window.location.reload();
        }

    };

    async function ViewEmpPage(e) {
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/ViewDesignation?DesignationId=${e}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            }
        );
        const Response = await res.json();
        if (Response.resCode === 200) {
            setDesignName(Response.resData.designationName)
            setparentId(Response.resData.parentId)
            setteamType(Response.resData.teamType)
            setisActive(Response.resData.isActive)
        }

    };

    async function EditDesig(e) {
        let PageData = {
            DesignationId: e,
            Designation: DesignName,
            TeamType: teamType,
            ParentId: parentId,
            Status: (isActive === true) ? 'Active' : 'In-Active'
        };
        console.log(PageData);
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/EditDesignation`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
                body: JSON.stringify(PageData),
            }
        );
        const Response = await res.json();
        if (Response.resCode === 200) {
            console.log("ok");
            window.location.reload();
        }

    };

    const AddDesignation = () => {
        AddDesignation1();
    }

    const DocumentSearch = () => {
        ManageDesignation();
      }

    async function AddDesignation1() {
        let PageData = {
            Designation: DesignName1,
            TeamType: teamType1,
            ParentId: parentId1,
            Status: (isActive1 === true) ? 'Active' : 'In-Active'
        };
        console.log(PageData);
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/AddDesignation`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
                body: JSON.stringify(PageData),
            }
        );
        const Response = await res.json();
        if (Response.resCode === 200) {
            console.log("ok");
            window.location.reload();
        }

    };


    const ResetDesignation = () => {
        window.location.reload();
    }


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
            console.log(profileData.resData);
            setProfileData(profileData.resData);
            console.log(ProfileData.branch);
            setBranch(profileData.resData.branch)
        }
    }

    async function ManageDesignation() {
        let PageData = {
            search: FilterName,
            pageNumber: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
        };
        console.log(PageData);
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/EmpDesignationList`,
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
        const ManageDesignationData = await res.json();
        if (ManageDesignationData.resCode === 200) {
            console.log(ManageDesignationData.resData);
            setData(ManageDesignationData.resData.data);
            console.log(data);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: ManageDesignationData.resData.totalData,
                }
            })
        }
    }

    useEffect(() => {
        ManageDesignation();
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

            <div className="breadcrumb-area">
                <div className="container-fluid">
                    <div className="row pt-1 pb-1">
                        <div className="col-md-6">
                            <nav aria-label="breadcrumb">
                                <h2>Employee Designation</h2>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Employee Design</li>
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
                                            <label for="inputEmail3" className="col-md-5 mt-1">Designation<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setDesignName1(e.target.value); }}
                                                    value={DesignName1} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Team Type<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setteamType1(e.target.value); }}
                                                    value={teamType1} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Parent Designation<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={parentId1}
                                                    onChange={(e) => { setparentId1(e.target.value) }}
                                                    style={{ width: "15vw" }}
                                                >
                                                    <option value={"null"}>Select</option>
                                                    <EmpListDropdown />
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Status<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={isActive1}
                                                    onChange={(e) => { setisActive1(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value={"Active"}>Active</option>
                                                    <option value={"In-Active"}>In-Active</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="box-footer">
                                    <center style={{ padding: "10px" }}>
                                        <button className="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={ResetDesignation}>Reset</button>
                                        <button className="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={AddDesignation}>Submit</button>
                                    </center>
                                </div>

                            </div>

                            <div className="col-md-4 mt-3">
                                <div className="d-flex">
                                    <label for="inputEmail3" className="col-md-5">Search<span style={{ paddingLeft: "30px" }} className="pull-right">:</span></label>
                                    <div className="col-md-7" style={{ paddingLeft: "10px" }}>
                                        <input
                                            type='text'
                                            value={FilterName}
                                            onChange={(e) => { console.log(e.target.value); setFilterName(e.target.value); DocumentSearch() }}
                                        />
                                    </div>
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
