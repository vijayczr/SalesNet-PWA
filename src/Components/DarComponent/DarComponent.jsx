import React from 'react'

function DarComponent(data) {
    const { ProfileData } = data;
  return (
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
                      onChange={(e) => { setPrincipalId(e.target.value) }}
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
                    <button className="FunctionButton5" style={{ backgroundColor: "#e8d105", color: "black", width: "120px" }} >Add Product</button>
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


              <label class="col-md-12 mt-2">Opprtunity Status<span style={{ color: "red" }}>*</span></label>
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
                  </div>:null}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  )
}

export default DarComponent