import React, { useEffect, useState } from 'react'
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ConfigProvider, DatePicker, Space, Select, Checkbox, Radio, Table } from 'antd';
import dayjs from 'dayjs';

export default function ViewDar(props) {

  const navigate = useNavigate();
  const [ProfileData, setProfileData] = useState("");
  const [Branch, setBranch] = useState("");
  const [AppEngList, setAppEngList] = useState(null);
  const [Appeng, setAppeng] = useState(null);
  const [LeadType, setLeadType] = useState(null);
  const [JoiningDate1, setJoiningDate1] = useState(null);
  const [MonthOfOrder, setMonthOfOrder] = useState(null);
  const [TodayTime, setTodayTime] = useState("01:00 PM");
  const [searchparams] = useSearchParams();

  const [CustomerList, setCustomerList] = useState(null);

  const [CustomerId, setCustomerId] = useState(null);
  const [CustContactList, setCustContactList] = useState(null);
  const [CustContactId, setCustContactId] = useState(null);
  const [CustPhone, setCustPhone] = useState(null);
  const [CustMobile, setCustMobile] = useState(null);
  const [CustDesig, setCustDesig] = useState(null);
  const [CustDept, setCustDept] = useState(null);
  const [CustEmail, setCustEmail] = useState(null);
  const [PrincipalList, setPrincipalList] = useState(null);
  const [PrincipalId, setPrincipalId] = useState(null);
  const [ProductName, setProductName] = useState(null);
  const [DarProductPrice, setDarProductPrice] = useState(null);
  const [QuotedPrice, setQuotedPrice] = useState(null);
  const [productValue, setproductValue] = useState(null);
  const [CallType, setCallType] = useState(null);
  const [CallStatus, setCallStatus] = useState(null);
  const [DarVertical, setDarVertical] = useState(null);
  const [ExpectedOrdervalue, setExpectedOrdervalue] = useState(null);
  const [DarStatus, setDarStatus] = useState();
  const [NextActionDate, setNextActionDate] = useState(null);
  const [ClosingDate, setClosingDate] = useState(null);
  const [LostReason, setLostReason] = useState(null);
  const [OpportunityStatus, setOpportunityStatus] = useState(null);
  const [IsFundAvailAble, setIsFundAvailAble] = useState(null);
  const [OrderValue, setOrderValue] = useState(null);
  const [Advance, setAdvance] = useState(null);
  const [GstPerc, setGstPerc] = useState();
  const [TaxPrice, setTaxPrice] = useState(null);
  const [Delivery, setDelivery] = useState(null);
  const [Training, setTraining] = useState(null);
  const [Actualvalue, setActualvalue] = useState(null);
  const [Remark, setRemark] = useState(null);
  const [DocumentName, setDocumentName] = useState(null);
  const [ProductList, setProductList] = useState(null);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      position: ["topRight"]
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  }

  const [CheckboxData, setCheckboxData] = useState(0);


  const plainOptions = [5, 18, 28];
  const columns = [
    {
      title: 'Add',
      key: 'employee',
      width: '7%',
      render: (_,record) =>(
        <input 
        type='checkbox'
        checked = {CheckboxData.productId === record.productId}
        onChange={()=>setCheckboxData(record)}
        />
      )
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      width: '16%',
    },
    {
      title: 'Price',
      dataIndex: 'techlabPrice',
      key: 'techlabPrice',
      width: '8%',
    },
    {
      title: 'Quoted Price',
      dataIndex: 'quotedPrice',
      key: 'quotedPrice',
      width: '12%',
    },
    {
      title: 'Product Value',
      dataIndex: 'productValue',
      key: 'productValue',
      width: '12%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '45%',
    }
  ]
  // setJoiningDate1(new Date().toLocaleDateString());
  // useEffect(() => {
  //   getProfiledata(); GetAppEnggList(); SearchCustomer();
  // }, []);

  useEffect(() => {
    let ignore = false;

    if (!ignore) DarData(); getProfiledata(); GetAppEnggList(); SearchCustomer(); GetPrincipalList();
    return () => { ignore = true; }
  }, []);


  var newDate = new Date().toLocaleDateString();

  async function DarData() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/ViewDar?DarId=${searchparams.get("id")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Response = await res.json();
    if (Response.resCode === 200) {
      setAppeng(Response.resData.appEngId);
      setLeadType(Response.resData.callTypeId);
      setJoiningDate1(Response.resData.visitDate);
      setTodayTime(Response.resData.visitTime);
      setCustomerId(Response.resData.customerId);



      setCustContactId(Response.resData.contactPersonId);
      setCustPhone(Response.resData.phoneNo);
      setCustMobile(Response.resData.mobileNo);
      setCustDesig(Response.resData.custDesgn);
      setCustDept(Response.resData.custDepartment);
      setCustEmail(Response.resData.email);

      GetCustContactList(Response.resData.customerId);

      // GetPrincipalList();

      setPrincipalId(Response.resData.principalId);
      setProductName(Response.resData.productName);
      setDarProductPrice(Response.resData.darProductPrice);
      setQuotedPrice(Response.resData.quotedPrice);
      setproductValue(Response.resData.productValue);
      setCallType(Response.resData.callTypeId);
      setCallStatus(Response.resData.callStatusId);
      setDarVertical(Response.resData.verticalId);
      setExpectedOrdervalue(Response.resData.price);
      setMonthOfOrder(Response.resData.monthOfOrder);
      setDarStatus(Response.resData.darStatusId);
      setNextActionDate(Response.resData.nextActionDate);
      setClosingDate(Response.resData.darClosingDate)
      setLostReason(Response.resData.lostReasonId);
      setOpportunityStatus(Response.resData.opportunityStatus);
      setIsFundAvailAble(Response.resData.isFundAvailable);
      setOrderValue(Response.resData.orderValue);
      setAdvance(Response.resData.advancePay);
      setGstPerc(Response.resData.gstPerc);
      setTaxPrice(Response.resData.gst);
      setDelivery(Response.resData.deliveryPay);
      setTraining(Response.resData.trainingPay);
      setActualvalue(Response.resData.actualValue);
      setRemark(Response.resData.darRemark);
      setDocumentName(Response.resData.filename);

      ProductLists(Response.resData.principalId);

      console.log(Response.resData);
    }
  }

  async function GetCustContactList(e) {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/CustpersonList?CustId=${e}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Response = await res.json();
    if (Response.resCode === 200) {
      console.log(Response.resData);
      setCustContactList(Response.resData);
    }
  }

  async function GetPrincipalList() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/PrincipalList`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Response = await res.json();
    if (Response.resCode === 200) {
      console.log(Response.resData);
      setPrincipalList(Response.resData);
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
    )
    const profileData = await res.json();
    if (profileData.resCode === 200) {
      console.log(profileData.resData);
      setProfileData(profileData.resData);
    }
  }

  const NavBack = () => {
    navigate("/DarSummary", { replace: true });
  }


  async function GetAppEnggList() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/AppEngineer`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    )
    const Response = await res.json();
    if (Response.resCode === 200) {
      console.log(Response.resData);
      setAppEngList(Response.resData)
    }
  }

  const Date2 = (date) => {
    console.log(date);
    setJoiningDate1(date);
  };
  const Date3 = (date) => {
    console.log(date);
    setMonthOfOrder(date);
  };
  const Date4 = (date) => {
    console.log(date);
    setNextActionDate(date);
  };
  const DateOfClosing = (date) => {
    console.log(date);
    setClosingDate(date);
  };
  // const GstvalueChange = (checkedValues) => {
  //   console.log('checked = ', checkedValues);
  //   GstPerc
  // };
  const GstvalueChange = ({ target: { value } }) => {
    setGstPerc(value);
  };

  function DgstValCal() {
    var x = OrderValue * (GstPerc / 100);
    setTaxPrice(x);
    console.log(x);
  };


  async function SearchCustomer() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/customerList?CustName`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      setCustomerList(Response.resData);
      console.log(Response.resData);
    }

  };
  const DarStatusfun = (e) => {
    // console.log(e);
    setDarStatus(e);
  }

  async function ProductLists(e) {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Dar/ProductListByPrincipalId?PrincipalId=${e}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
        },
      }
    );
    const Response = await res.json();
    if (Response.resCode === 200) {
      // setCustomerList(Response.resData);
      setProductList(Response.resData);
      console.log(Response.resData);
    }
  }

  function  ProductSelection() {
    console.log(CheckboxData);
    setProductName(CheckboxData.productName);
    setDarProductPrice(CheckboxData.techlabPrice);
    setQuotedPrice(CheckboxData.quotedPrice);
    setproductValue(CheckboxData.productValue);
  }


  return (
    <>


      <div>

        <AppHeader data={ProfileData} />

        <div className="breadcrumb-area">
          <div className="container-fluid">
            <div className="row pt-1 pb-1">
              <div className="col-md-6">
                <nav aria-label="breadcrumb">
                  <h2>View DAR</h2>
                </nav>
              </div>
              <div className="col-md-6">
                <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                  <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">View DAR</li>
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
                  <center >
                    {/* <button className="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
                    <button className="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={DocumentSearch}>Search</button> */}
                    <button className="FunctionButton" style={{ backgroundColor: "#e8d105", color: "black" }} onClick={NavBack}>Back</button>
                  </center>
                  <div className="row mt-3">

                    <div className="col-lg-4 ">
                      <div className="form-group d-flex">
                        <label className="col-md-5 mt-1 mb-0">Employee Name<span className="float-right">:</span></label>
                        <div className="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            value={ProfileData.userName}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 ">
                      <div className="form-group d-flex">
                        <label className="col-md-5 mt-1 mb-0">Application Engineer<span style={{ color: "red" }}>*</span> <span className="float-right">:</span></label>
                        <div className="col-md-7">
                          <select
                            style={{ width: "100%" }}
                            onChange={(e) => { setAppeng(e.target.value) }}
                            disabled
                            value={Appeng}
                          >
                            <option value={0}>Select</option>
                            {AppEngList ?
                              AppEngList.map((e) => (
                                <option key={e.empId} value={e.empId} >{e.empName}</option>
                              )) : null}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 ">
                      <div className="form-group d-flex">
                        <label className="col-md-5 mt-1 mb-0">Lead Type<span style={{ color: "red" }}>*</span> <span className="float-right">:</span></label>
                        <div className="col-md-7">
                          <select
                            style={{ width: "100%" }}
                            onChange={(e) => { setLeadType(e.target.value) }}
                            value={LeadType}
                            disabled
                          >
                            <option value={null}>Select</option>
                            <option value={1}>Self</option>
                            <option value={2}>Lead</option>

                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 ">
                      <div className="form-group d-flex">
                        <label className="col-md-5 mt-1 mb-0">Lead No<span style={{ color: "red" }}>*</span> <span className="float-right">:</span></label>
                        <div className="col-md-7">
                          <select
                            style={{ width: "100%" }}
                          // onChange={(e) => { setLeadType(e.target.value) }}
                          >
                            <option value={null}>Select</option>

                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group d-flex">
                        <label for="inputEmail3" className="col-md-5 mt-1">Date<span className="pull-right">:</span></label>
                        <div className="col-md-7">
                          {/* <Space >
                                                    <DatePicker style={{ width: "100%" }} onChange={Date2} />
                                                </Space> */}
                          <Space >
                            <ConfigProvider>
                              <DatePicker
                                defaultValue={dayjs(Date.now())}
                                value={dayjs(JoiningDate1)}
                                disabled
                                style={{ width: "100%" }} onChange={Date2} />
                            </ConfigProvider>
                          </Space>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 ">
                      <div className="form-group d-flex">
                        <label className="col-md-5 mt-1 mb-0">Visit Time<span className="float-right">:</span></label>
                        <div className="col-md-7">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            onChange={(e) => { setTodayTime(e.target.value); }}
                            value={TodayTime}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-8 ">
                      <div className="form-group d-flex">
                        <label className="col-md-3 mt-1 mb-0">Customer<span style={{ color: "red" }}>*</span><span className="float-right">:</span></label>
                        <div className="col-md-9">
                          <Select
                            showSearch
                            style={{ width: 400 }}
                            placeholder="Search to Select"
                            onChange={(e) => { console.log(e); }}
                            value={CustomerId}
                            disabled
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            filterSort={(optionA, optionB) =>
                              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={CustomerList}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="box bg-boxshadow" style={{ width: "43vw", boxShadow: "10px" }}>
                    <label class="col-md-12">Person Contacted</label>
                    <div className="col-md-12">
                      <select
                        style={{ width: "100%" }}
                        onChange={(e) => { setCustContactId(e.target.value) }}
                        disabled
                        value={CustContactId}
                      >
                        <option value={0}>Select</option>
                        {CustContactList ?
                          CustContactList.map((e) => (
                            <option key={e.custId} value={e.custId} >{e.contactPerson}</option>
                          )) : null}
                      </select>
                    </div>
                    <label class="col-md-12 mt-2">Designation</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type='text'
                        disabled
                        onChange={(e) => { setCustDesig(e.target.value); }}
                        value={CustDesig}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Department</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type='text'
                        disabled
                        onChange={(e) => { setCustDept(e.target.value); }}
                        value={CustDept}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Mobile</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type='text'
                        disabled
                        onChange={(e) => { setCustMobile(e.target.value); }}
                        value={CustMobile}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Phone</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type='text'
                        disabled
                        onChange={(e) => { setCustPhone(e.target.value); }}
                        value={CustPhone}
                      />
                    </div>
                    <label class="col-md-12 mt-2">E-mail</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type='text'
                        disabled
                        onChange={(e) => { setCustEmail(e.target.value); }}
                        value={CustEmail}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Principal</label>
                    <div className="col-md-12">
                      <div className="form-group d-flex">
                        <div className="col-md-8">
                          <select
                            style={{ width: "100%" }}
                            onChange={(e) => { setPrincipalId(e.target.value); ProductLists(e.target.value); }}
                            disabled
                            value={PrincipalId}
                          >
                            <option value={0}>Select</option>
                            {PrincipalList ?
                              PrincipalList.map((e) => (
                                <option key={e.principalId} value={e.principalId} >{e.principalName}</option>
                              )) : null}
                          </select>
                        </div>
                        <div class="col-md-4">
                          <button
                            data-toggle="modal" data-target=".bd-example-modal-lg"
                            className="FunctionButton5"
                            disabled
                            style={{ backgroundColor: "#e8d105", color: "black", width: "120px" }}
                          >Add Product
                          </button>
                          <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl">
                              <div class="modal-content">
                                <div className="modal-header">
                                  <h3>Product List</h3>
                                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
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
                                      dataSource={ProductList}
                                      pagination={tableParams.pagination}
                                      onChange={handleTableChange}
                                      style={{ overflowX: "auto" }}
                                    />
                                  </ConfigProvider>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-primary" onClick={ProductSelection} data-dismiss="modal" >Add Product</button>
                                  {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="box" style={{ border: "solid" }}>
                      <div class="col-md-12">
                        <div className="form-group d-flex">
                          <div className="col-lg-3">
                            <div className="d-flex mt-1" >
                              <label className="col-md-12 m-0" style={{ fontWeight: "bold", padding: "0px" }}>Product</label>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="d-flex mt-1">
                              <label className="col-md-12 m-0" style={{ fontWeight: "bold", padding: "0px" }}>Techlab MRP</label>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="d-flex mt-1">
                              <label className="col-md-12 m-0" style={{ fontWeight: "bold", padding: "0px" }}>Product Value</label>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="d-flex mt-1">
                              <label className="col-md-12 m-0" style={{ fontWeight: "bold", padding: "0px" }}>Quoted Price</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12">
                        <div className="form-group d-flex">
                          <div className="col-lg-3">
                            <div className="d-flex mt-1" >
                              {/* <label  className="col-md-12 m-0" style={{ fontWeight: "bold",padding:"0px" }}>Product</label> */}
                              <input
                                className="col-md-12 m-0"
                                style={{ width: "100%" }}
                                type='text'
                                value={ProductName}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="d-flex mt-1">
                              <input
                                className="col-md-12 m-0"
                                style={{ width: "100%" }}
                                type='text'
                                value={DarProductPrice}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="d-flex mt-1">
                              <input
                                className="col-md-12 m-0"
                                style={{ width: "100%" }}
                                type='text'
                                value={QuotedPrice}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="d-flex mt-1">
                              <input
                                className="col-md-12 m-0"
                                style={{ width: "100%" }}
                                type='text'
                                value={productValue}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <label class="col-md-12 mt-2">Call Type<span style={{ color: "red" }}>*</span></label>
                    <div className="col-md-12">
                      <select
                        style={{ width: "100%" }}
                        onChange={(e) => { setCallType(e.target.value) }}
                        value={CallType}
                        disabled
                      >
                        <option value={null}>Select</option>
                        <option value={1}>Phone</option>
                        <option value={2}>Physical</option>
                        <option value={3}>Other</option>
                      </select>
                    </div>
                    <label class="col-md-12 mt-2">Call Status<span style={{ color: "red" }}>*</span></label>
                    <div className="col-md-12">
                      <select
                        style={{ width: "100%" }}
                        onChange={(e) => { setCallStatus(e.target.value) }}
                        value={CallStatus}
                        disabled
                      >
                        <option value={null}>Select</option>
                        <option value={1}>Hot</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Cold</option>
                      </select>
                    </div>
                    <label class="col-md-12 mt-2">Vertical<span style={{ color: "red" }}>*</span></label>
                    <div className="col-md-12">
                      <select
                        style={{ width: "100%" }}
                        onChange={(e) => { setDarVertical(e.target.value) }}
                        value={DarVertical}
                        disabled
                      >
                        <option value={null}>Select</option>
                        <option value={1}>ASG</option>
                        <option value={2}>ISG</option>
                        <option value={3}>PSG</option>
                      </select>
                    </div>
                    <label class="col-md-12 mt-2">Expected Order Value<span style={{ color: "red" }}>*</span></label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type='text'
                        disabled
                        onChange={(e) => { setExpectedOrdervalue(e.target.value); }}
                        value={ExpectedOrdervalue}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Month of Order</label>
                    <div className="col-md-12">
                      <Space >
                        <ConfigProvider>
                          <DatePicker
                            defaultValue={dayjs(Date.now())}
                            value={dayjs(MonthOfOrder)}
                            disabled
                            style={{ width: "100%" }} onChange={Date3} />
                        </ConfigProvider>
                      </Space>
                    </div>
                    <label class="col-md-12 mt-2">Status<span style={{ color: "red" }}>*</span></label>
                    <div className="col-md-12">
                      <select
                        style={{ width: "100%" }}
                        onChange={(e) => { DarStatusfun(e.target.value) }}
                        value={DarStatus}
                        disabled
                      >
                        <option value={null}>Select</option>
                        <option value={3}>Open</option>
                        <option value={2}>Closed</option>
                        <option value={1}>Lost</option>
                      </select>
                    </div>

                    {DarStatus == 3 ?
                      <div>
                        <label class="col-md-12 mt-2">Next Action Date</label><div className="col-md-12">
                          <Space>
                            <ConfigProvider>
                              <DatePicker
                                defaultValue={dayjs(Date.now())}
                                value={dayjs(NextActionDate)}
                                disabled
                                style={{ width: "100%" }} onChange={Date4} />
                            </ConfigProvider>
                          </Space>
                        </div></div> : null
                    }
                    {DarStatus == 2 &&
                      <div>
                        <label class="col-md-12 mt-2">Closing Date</label><div className="col-md-12">
                          <Space>
                            <ConfigProvider>
                              <DatePicker
                                defaultValue={dayjs(Date.now())}
                                value={dayjs(ClosingDate == null ? Date.now() : ClosingDate)}
                                disabled
                                style={{ width: "100%" }} onChange={DateOfClosing} />
                            </ConfigProvider>
                          </Space>
                        </div></div>
                    }
                    {DarStatus == 1 &&
                      <div>
                        <label class="col-md-12 mt-2">Lost Reason</label><div className="col-md-12">
                          <select
                            style={{ width: "100%" }}
                            onChange={(e) => { setLostReason(e.target.value) }}
                            value={LostReason}
                            disabled
                          >
                            <option value={0}>Select</option>
                            <option value={1}>Insufficient Fund</option>
                            <option value={2}>Higher price</option>
                            <option value={3}>Technically not qualified</option>
                            <option value={4}>Competitor</option>
                            <option value={5}>Others</option>
                          </select>
                        </div></div>
                    }


                    <label class="col-md-12 mt-2">Opportunity Status<span style={{ color: "red" }}>*</span></label>
                    <div className="col-md-12">
                      <select
                        style={{ width: "100%" }}
                        onChange={(e) => { setOpportunityStatus(e.target.value) }}
                        value={OpportunityStatus}
                        disabled
                      >
                        <option value={null}>Select</option>
                        <option value={1}>Introduction Call (10%)</option>
                        <option value={2}>Demo Done (10%)</option>
                        <option value={3}>Quotation Submitted (20%)</option>
                        <option value={4}>Fund Available (20%)</option>
                        <option value={5}>Final Negotiation (20%)</option>
                        <option value={6}>Order Received (15%)</option>
                        <option value={7}>Payment Received (5%)</option>
                        <option value={8}>Installation/Training</option>
                        <option value={9}>Payment Followup</option>
                        <option value={10}>Technical Support / AMC</option>
                        <option value={11}>InOffice</option>
                      </select>
                    </div>
                    {(OpportunityStatus >= 4) ?
                      <div>
                        <label class="col-md-12 mt-2">Is Fund Available</label><div className="col-md-12">
                          <select
                            style={{ width: "100%" }}
                            onChange={(e) => { setIsFundAvailAble(e.target.value) }}
                            value={IsFundAvailAble}
                            disabled
                          >
                            <option value={null}>Select</option>
                            <option value={"Yes"}>Yes</option>
                            <option value={"No"}>No</option>
                          </select>
                        </div></div> : null
                    }
                    {OpportunityStatus > 5 ?
                      <div>
                        <label class="col-md-12 mt-2">Order Value</label>
                        <div className="col-md-12">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            disabled
                            onChange={(e) => { setOrderValue(e.target.value); console.log(TaxPrice); }}
                            value={OrderValue}
                          />
                        </div>
                        <label class="col-md-12 mt-2">Advance %</label>
                        <div className="col-md-12">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            disabled
                            onChange={(e) => { setAdvance(e.target.value); }}
                            value={Advance}
                          />
                        </div>
                        <label class="col-md-12 mt-2">GST</label>
                        <div className="col-md-12 ">
                          {/* <Checkbox.Group options={plainOptions} defaultValue={[5]} onChange={GstvalueChange} /> */}
                          <Radio.Group options={plainOptions} onChange={GstvalueChange} disabled defaultValue={GstPerc} />
                        </div>
                        <div className="col-md-12 mt-3">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            disabled
                            onChange={(e) => { setTaxPrice(e.target.value); }}
                            value={TaxPrice}
                          />
                        </div>
                        <div className="col-md-12 mt-3">
                          <button className="FunctionButton5" style={{ backgroundColor: "#e8d105", color: "black", width: "120px" }} onClick={DgstValCal} >Calculate1</button>
                        </div>
                        <label class="col-md-12 mt-2">Delivery %</label>
                        <div className="col-md-12">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            disabled
                            onChange={(e) => { setDelivery(e.target.value); }}
                            value={Delivery}
                          />
                        </div>
                        <label class="col-md-12 mt-2">Training %</label>
                        <div className="col-md-12">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            disabled
                            onChange={(e) => { setTraining(e.target.value); }}
                            value={Training}
                          />
                        </div>
                        <label class="col-md-12 mt-2">Actual Value</label>
                        <div className="col-md-12">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            disabled
                            onChange={(e) => { setActualvalue(e.target.value); console.log(TaxPrice); }}
                            value={Actualvalue}
                          />
                        </div>

                      </div>
                      : null
                    }
                    <label class="col-md-12 mt-2">Remark</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type='text'
                        disabled
                        onChange={(e) => { setRemark(e.target.value); }}
                        value={Remark}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Documents (if any)</label>
                    <div className="col-md-12">
                      <input
                        type='file'
                        disabled
                      // onChange={AttachmentUpload}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Uploaded Document</label>
                    <div className="col-md-12">
                      <div className="form-group d-flex">
                        <div className="col-md-8">
                          <input
                            style={{ width: "100%" }}
                            type='text'
                            disabled
                            onChange={(e) => { setDocumentName(e.target.value); console.log(TaxPrice); }}
                            value={DocumentName}
                          />
                        </div>
                        {DocumentName != null ?
                          <div class="col-md-4">
                            <a href={`${localStorage.getItem("BaseUrl")}/Dar/DarDownloadFile?DarId=${searchparams.get("id")}`} ><button className="FunctionButton5" style={{ backgroundColor: "#e8d105", color: "black", width: "120px" }} >Download</button></a>
                          </div> : null}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}
