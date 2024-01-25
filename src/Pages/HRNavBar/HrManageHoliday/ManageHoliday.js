import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, DatePicker, Space, Table, Tag } from 'antd';
import {  EditOutlined, DeleteFilled } from '@ant-design/icons';
import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

export default function ManageHoliday() {
    const navigate = useNavigate();
    const [ProfileData, setProfileData] = useState("");
    const [Branch, setBranch] = useState("");
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [FilterName, setFilterName] = useState(null);
    const [isActive1, setisActive1] = useState("Active");
    const [HolidayName1, setHolidayName1] = useState();
    const [Description1, setDescription1] = useState();
    const [BranchName, setBranchName] = useState(null);
    const [JoiningDate, setJoiningDate] = useState(null);


    const [isActive, setisActive] = useState("Active");
    const [HolidayName, setHolidayName] = useState();
    const [Description, setDescription] = useState();
    const [BranchName1, setBranchName1] = useState(null);
    const [JoiningDate1, setJoiningDate1] = useState(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            position: ["topRight"]
        },
        
    });

    const columns = [
        {
            title: 'holidayId',
            dataIndex: 'holidayId',
            key: 'holidayId',
            width: '0%',
            hidden: true
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '27%',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: '13%',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '27%',
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            width: '13%',
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
                    <button type="button" data-toggle="modal" data-target="#exampleModalCenter2" className="viewbutton" style={{ marginRight: "0px" }} onClick={() => ViewHoliday(record.holidayId)} ><EditOutlined /> </button>
                    {/* <button type="button" data-toggle="modal" data-target="#exampleModalCenter1" className="viewbutton1" style={{ marginLeft: "0px", marginRight: "0px" }} ><FolderViewOutlined /> </button> */}
                    <button type="button" data-toggle="modal" data-target="#exampleModalCenter" className="viewbutton2" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "0px", marginBottom: "0px" }}><DeleteFilled /> </button>

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
                                    <button type="button" className="btn btn-primary" onClick={() => DelHolday(record.holidayId)}>Delete</button>
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
                                            <label for="inputEmail3" className="col-md-5 mt-1">Holiday Name<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setHolidayName(e.target.value); }}
                                                    value={HolidayName} className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Description<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setDescription(e.target.value); }}
                                                    value={Description} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Date<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                {/* <Space >
                                                    <DatePicker style={{ width: "100%" }} onChange={Date2} />
                                                </Space> */}
                                                <Space >
                                                    <ConfigProvider locale={locale}>
                                                        <DatePicker value={dayjs((JoiningDate1 === null) ? '2000-01-01' : JoiningDate1)} style={{ width: "100%" }} onChange={Date2} />
                                                    </ConfigProvider>
                                                </Space>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Branch<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={BranchName1}
                                                    onChange={(e) => { console.log(e.target.value); setBranchName1(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value={null}>Select</option>

                                                    <option value={"Delhi"}>Delhi</option>
                                                    <option value={"Dehradun"}>Dehradun</option>
                                                    <option value={"Bangalore"}>Bangalore</option>
                                                    <option value={"Chennai"}>Chennai</option>
                                                    <option value={"Hydrabad"}>Hydrabad</option>
                                                    <option value={"Kolkata"}>Kolkata</option>
                                                    <option value={"Pune"}>Pune</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">isActive<span className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={isActive}
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
                                    <button type="button" className="btn btn-primary" onClick={() => EditHoliday(record.holidayId)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </Space>
            ),
            width: '10%',
        }
    ].filter(item => !item.hidden);;


    async function ViewHoliday(e) {
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/ViewHoliday?HolidayId=${e}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            }
        );
        const Response = await res.json();
        if (Response.resCode === 200) {
            setHolidayName(Response.resData.name)
            setJoiningDate1(Response.resData.date)
            setDescription(Response.resData.description)
            setBranchName1(Response.resData.branch)
            setisActive(Response.resData.status)
        }

    };
    async function EditHoliday(e) {
        let PageData = {
            HolidayId: e,
            Name: HolidayName,
            Date: JoiningDate1,
            Description: Description,
            Branch: BranchName1,
            Status: isActive,
        };
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/AddHoliday`,
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
            window.location.reload();
        }

    };

    async function DelHolday(e) {
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/DeleteHoliday?HoidayId=${e}`,
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

    async function ManageHoliday() {
        let PageData = {
            search: FilterName,
            pageNumber: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
        };
        console.log(PageData);
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/HrHolidayList`,
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
        const ManageHolidayData = await res.json();
        if (ManageHolidayData.resCode === 200) {
            console.log(ManageHolidayData.resData);
            setData(ManageHolidayData.resData.data);
            console.log(data);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: ManageHolidayData.resData.totalCount,
                }
            })
        }
    }

    useEffect(() => {
        ManageHoliday();
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
        ManageHoliday();
    }

    const SubmiteHoliday = () => {
        AddHoliday()
    }
    async function AddHoliday() {
        let PageData = {
            Name: HolidayName1,
            Date: JoiningDate,
            Description: Description1,
            Branch: BranchName,
            Status: isActive1,
        };
        console.log(PageData);
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/AddHoliday`,
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
            window.location.reload();
        }
    }

    const Date1 = (date) => {
        console.log(date);
        setJoiningDate(date);
        console.log(JoiningDate);
    };

    const Date2 = (date) => {
        console.log(date);
        setJoiningDate1(date);
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
                                <h2>Holidays</h2>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Holidays</li>
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
                                            <label for="inputEmail3" className="col-md-5 mt-1">HolidayName<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setHolidayName1(e.target.value); }}
                                                    value={HolidayName1} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Date<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <Space >
                                                    <DatePicker style={{ width: "100%" }} onChange={Date1} />
                                                </Space>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Description<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <input
                                                    onChange={(e) => { setDescription1(e.target.value); }}
                                                    value={Description1} className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mt-3">
                                        <div className="d-flex">
                                            <label for="inputEmail3" className="col-md-5 mt-1">Branch<span style={{ paddingLeft: "50px" }} className="pull-right">:</span></label>
                                            <div className="col-md-7">
                                                <select value={BranchName}
                                                    onChange={(e) => { console.log(e.target.value); setBranchName(e.target.value) }}
                                                    style={{ width: "100%" }}
                                                >
                                                    <option value={null}>Select</option>

                                                    <option value={"Delhi"}>Delhi</option>
                                                    <option value={"Dehradun"}>Dehradun</option>
                                                    <option value={"Bangalore"}>Bangalore</option>
                                                    <option value={"Chennai"}>Chennai</option>
                                                    <option value={"Hydrabad"}>Hydrabad</option>
                                                    <option value={"Kolkata"}>Kolkata</option>
                                                    <option value={"Pune"}>Pune</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mt-3">
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
                                        <button className="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                                        <button className="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={SubmiteHoliday}>Submit</button>
                                        <button className="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
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
                                    // pagination={{
                                    //     position: ["topLeft"],
                                    //   }}
                                    // pagination={{pageSize:tableParams.pagination.pageSize ,current: tableParams.pagination.current , position:["topLeft"]}}
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
