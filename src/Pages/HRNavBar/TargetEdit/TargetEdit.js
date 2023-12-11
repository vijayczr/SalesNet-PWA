import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ConfigProvider, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';


export default function TargetEdit(props) {
    const navigate = useNavigate();
    const [ProfileData, setProfileData] = useState("");
    const [Branch, setBranch] = useState("");
    const [searchparams] = useSearchParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const [SearchValue, setSearchValue] = useState("");

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            position: ["topRight"]
        },
    });

    const columns = [
        {
            title: 'empTargetDetailId',
            dataIndex: 'empTargetDetailId',
            key: 'empTargetDetailId',
            width: '0%',
            hidden: true
        },
        {
            title: 'Quarter',
            dataIndex: 'quarter',
            key: 'quarter',
            width: '12.5%',
        },
        {
            title: 'Vertical',
            dataIndex: 'vertical',
            key: 'vertical',
            width: '12.5%',
        },
        {
            title: 'Principal',
            dataIndex: 'principal',
            key: 'principal',
            width: '25%',
        },
        {
            title: 'Target Amount',
            dataIndex: 'targetAmount',
            key: 'targetAmount',
            width: '20%',
        },
        {
            title: 'Classify Target',
            dataIndex: 'classifyTarget',
            key: 'classifyTarget',
            width: '20%',
        },
        {
            title: 'Action',
            dataIndex: 'stActionatus',
            key: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <button type="button" data-toggle="modal" data-target="#exampleModalCenter2" class="viewbutton" style={{ marginRight: "0px" }} ><EditOutlined /> </button>
                    {/* <button type="button" data-toggle="modal" data-target="#exampleModalCenter1" class="viewbutton1" style={{ marginLeft: "0px", marginRight: "0px" }} ><FolderViewOutlined /> </button> */}
                    <button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="viewbutton2" style={{ marginLeft: "0px", marginRight: "0px", marginTop: "0px", marginBottom: "0px" }}><DeleteFilled /> </button>

                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <h5>Do you really want to delete this ENTRY </h5>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Space>
            ),
            width: '10%',
        }
    ].filter(item => !item.hidden);;

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
            EmpId: searchparams.get("id")
        };
        console.log(PageData);
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/HrManual/HrEmpTargetList`,
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
        const TargetData = await res.json();
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
                }
            })
        }
    }

    const DocumentSearch = () => {
        TargetList();
      }


    return (
        <div>
            <AppHeader data={ProfileData} />

            <div class="breadcrumb-area">
                <div class="container-fluid">
                    <div class="row pt-1 pb-1">
                        <div class="col-md-6">
                            <nav aria-label="breadcrumb">
                                <h2>Employee Target</h2>
                            </nav>
                        </div>
                        <div class="col-md-6">
                            <ol class="breadcrumb d-flex justify-content-end bg-transparent">
                                <li class="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Employee Target</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className='containner p-4' style={{ height: "600px", overflow: "auto", backgroundColor: "#f3f5f9" }} >

                <div class="row">
                    <div class="col-lg-12">
                        <div class="bg-boxshadow">

                            {/* <div class="ibox-content">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="d-flex">
                                            <label for="inputEmail3" class="col-md-5 mt-1">Department<span style={{ paddingLeft: "50px" }} class="pull-right">:</span></label>
                                            <div class="col-md-7">
                                                <input
                                                    class="docinput"
                                                    type='text'
                                                    value={Department}
                                                    onChange={(e) => { console.log(e.target.value); setDepartment(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="box-footer">
                                    <center style={{ padding: "10px" }}>
                                        <button class="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                                        <button class="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={AddDepartment}>Submit</button>
                                        <button class="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                                    </center>
                                </div>

                            </div> */}
                            <div class="col-md-4 mt-3">
                                <div class="d-flex">
                                    <label for="inputEmail3" class="col-md-5">Search<span style={{ paddingLeft: "30px" }} class="pull-right">:</span></label>
                                    <div class="col-md-7" style={{ paddingLeft: "10px" }}>
                                        <input
                                            type='text'
                                            value={SearchValue}
                                            onChange={(e) => { console.log(e.target.value); setSearchValue(e.target.value); DocumentSearch()}}
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
