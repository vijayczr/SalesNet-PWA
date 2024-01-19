import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfigProvider,
  DatePicker,
  TimePicker,
  Space,
  Select,
  Checkbox,
  Radio,
} from "antd";
import dayjs from "dayjs";
import {
  CallStatusList,
  CallTypeList,
  DAR_VerticalList,
  FundAvailableOptionsList,
  LostReasonList,
  OpportunityStatusList,
  SalesStatus,
  plainOptions,
} from "../../utils/data";

function DarComponent({
  // DarHeaderData,
  // setDarHeaderData,
  // AppEngList,
  // LeadList,
  // customerList,
  darFormData,
  setDarFormData,
  customerContactList,
  principalList,
}) {
  // const { ProfileData, ApplicationEngineer, LeadType } = DarHeaderData;
  const { contactPerson } = darFormData;
  const navigate = useNavigate();

  const calculate = () => {
    const FivePercent = darFormData?.opportunityStatusData?.orderValue * (darFormData?.opportunityStatusData?.gst / 100);
    // setTaxPrice(x);
    setDarFormData((prev) => ({
      ...prev,
      opportunityStatusData: {
        ...prev?.statusData,
        taxPrice: FivePercent,
      },
    }));
  }

  return (
    <div
      className="containner p-4"
      style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }}
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="bg-boxshadow">
            <div className="ibox-content">
              <div
                class="box bg-boxshadow"
                style={{ width: "43vw", boxShadow: "10px" }}
              >
                <label class="col-md-12">Person Contacted</label>
                <div className="col-md-12">
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        contactPerson: e?.target?.value,
                      }));
                    }}
                    disabled
                    value={contactPerson?.contactPerson}
                  >
                    <option value={0}>Select</option>
                    {customerContactList.map((contactList) => (
                      <option
                        key={contactList.custId}
                        value={contactList.custId}
                      >
                        {contactList.contactPerson}
                      </option>
                    ))}
                  </select>
                </div>
                <label class="col-md-12 mt-2">Designation</label>
                <div className="col-md-12">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    disabled
                    onChange={(e) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        contactPerson: {
                          ...prev.ContactPerson,
                          designation: e?.target?.value,
                        },
                      }));
                    }}
                    value={contactPerson?.designation}
                  />
                </div>
                <label class="col-md-12 mt-2">Department</label>
                <div className="col-md-12">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    disabled
                    onChange={(e) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        contactPerson: {
                          ...prev.ContactPerson,
                          department: e?.target?.value,
                        },
                      }));
                    }}
                    value={contactPerson?.department}
                  />
                </div>
                <label class="col-md-12 mt-2">Mobile</label>
                <div className="col-md-12">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    disabled
                    onChange={(e) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        contactPerson: {
                          ...prev.ContactPerson,
                          mobileNo: e?.target?.value,
                        },
                      }));
                    }}
                    value={contactPerson?.mobileNo}
                  />
                </div>
                <label class="col-md-12 mt-2">Phone</label>
                <div className="col-md-12">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    disabled
                    onChange={(e) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        contactPerson: {
                          ...prev.ContactPerson,
                          phoneNo: e?.target?.value,
                        },
                      }));
                    }}
                    value={contactPerson?.phoneNo}
                  />
                </div>
                <label class="col-md-12 mt-2">E-mail</label>
                <div className="col-md-12">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    disabled
                    onChange={(e) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        contactPerson: {
                          ...prev.ContactPerson,
                          email: e?.target?.value,
                        },
                      }));
                    }}
                    value={contactPerson?.email}
                  />
                </div>
                <label class="col-md-12 mt-2">Principal</label>
                <div className="col-md-12">
                  <div className="form-group d-flex">
                    <div className="col-md-8">
                      <select
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          // setPrincipalId(e.target.value);
                          setDarFormData((prev) => ({
                            ...prev,
                            principal: e.target.value,
                          }));
                        }}
                        disabled
                        value={darFormData?.principal}
                      >
                        <option value={0}>Select</option>
                        {principalList.map((e) => (
                          <option key={e.principalId} value={e.principalId}>
                            {e.principalName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="col-md-4">
                      <button
                        className="FunctionButton5"
                        style={{
                          backgroundColor: "#e8d105",
                          color: "black",
                          width: "120px",
                        }}
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div class="box" style={{ border: "solid" }}>
                  <div class="col-md-12">
                    <div className="form-group d-flex">
                      <div className="col-lg-3">
                        <div className="d-flex mt-1">
                          <label
                            className="col-md-12 m-0"
                            style={{ fontWeight: "bold", padding: "0px" }}
                          >
                            Product
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="d-flex mt-1">
                          <label
                            className="col-md-12 m-0"
                            style={{ fontWeight: "bold", padding: "0px" }}
                          >
                            Techlab MRP
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="d-flex mt-1">
                          <label
                            className="col-md-12 m-0"
                            style={{ fontWeight: "bold", padding: "0px" }}
                          >
                            Product Value
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="d-flex mt-1">
                          <label
                            className="col-md-12 m-0"
                            style={{ fontWeight: "bold", padding: "0px" }}
                          >
                            Quoted Price
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div className="form-group d-flex">
                      <div className="col-lg-3">
                        <div className="d-flex mt-1">
                          <input
                            className="col-md-12 m-0"
                            style={{ width: "100%" }}
                            type="text"
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
                            type="text"
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
                            type="text"
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
                            type="text"
                            value={productValue}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <label class="col-md-12 mt-2">
                  Call Type<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        callType: e?.target?.value,
                      }));
                    }}
                    value={darFormData?.callType}
                  >
                    {CallTypeList.map((type) => (
                      <option value={type.id}>type.value</option>
                    ))}
                    {/* <option value={null}>Select</option>
                    <option value={1}>Phone</option>
                    <option value={2}>Physical</option>
                    <option value={3}>Other</option> */}
                  </select>
                </div>
                <label class="col-md-12 mt-2">
                  Call Status<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      // setCallStatus(e.target.value);
                      setDarFormData((prev) => ({
                        ...prev,
                        callStatus: e.target.value,
                      }));
                    }}
                    value={darFormData.callStatus?.value}
                    disabled
                  >
                    {CallStatusList.map((type) => (
                      <option value={type.id}>type.value</option>
                    ))}
                    {/* <option value={null}>Select</option>
                    <option value={1}>Hot</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Cold</option> */}
                  </select>
                </div>
                <label class="col-md-12 mt-2">
                  Vertical<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      // setDarVertical(e.target.value);
                      setDarFormData((prev) => ({
                        ...prev,
                        darVertical: e.target.value,
                      }));
                    }}
                    value={darFormData?.darVertical}
                    disabled
                  >
                    {DAR_VerticalList.map((type) => (
                      <option value={type.id}>type.value</option>
                    ))}
                    {/* <option value={null}>Select</option>
                    <option value={1}>ASG</option>
                    <option value={2}>ISG</option>
                    <option value={3}>PSG</option> */}
                  </select>
                </div>
                <label class="col-md-12 mt-2">
                  Expected Order Value<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <input
                    style={{ width: "100%" }}
                    type="number"
                    onChange={(e) => {
                      // setExpectedOrdervalue(e.target.value);
                      setDarFormData((prev) => ({
                        ...prev,
                        expectedOrderValue: e.target.value,
                      }));
                    }}
                    value={darFormData?.expectedOrderValue}
                  />
                </div>
                <label class="col-md-12 mt-2">Month of Order</label>
                <div className="col-md-12">
                  <Space>
                    <ConfigProvider>
                      <DatePicker
                        defaultValue={dayjs(Date.now())}
                        value={dayjs(darFormData?.monthOfOrder)}
                        disabled
                        style={{ width: "100%" }}
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            monthOfOrder: event?.target?.value,
                          }));
                        }}
                      />
                    </ConfigProvider>
                  </Space>
                </div>
                <label class="col-md-12 mt-2">
                  Status<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        status: e?.target?.value,
                      }));
                    }}
                    value={darFormData?.status}
                    disabled
                  >
                    {/* <option value={null}>Select</option>
                    <option value={3}>Open</option>
                    <option value={2}>Closed</option>
                    <option value={1}>Lost</option> */}
                    {SalesStatus?.map((item) => {
                      <option value={item?.id}>item?.value</option>;
                    })}
                  </select>
                </div>

                {darFormData?.status?.id === 3 ? (
                  <div>
                    <label class="col-md-12 mt-2">Next Action Date</label>
                    <div className="col-md-12">
                      <Space>
                        <ConfigProvider>
                          <DatePicker
                            defaultValue={dayjs(Date.now())}
                            value={dayjs(
                              darFormData?.statusData?.nextActionDate
                            )}
                            disabled
                            style={{ width: "100%" }}
                            onChange={(event) => {
                              setDarFormData((prev) => ({
                                ...prev,
                                statusData: {
                                  ...prev?.statusData,
                                  nextActionDate: event?.target?.value,
                                },
                              }));
                            }}
                          />
                        </ConfigProvider>
                      </Space>
                    </div>
                  </div>
                ) : null}
                {darFormData?.status?.id === 2 && (
                  <div>
                    <label class="col-md-12 mt-2">Closing Date</label>
                    <div className="col-md-12">
                      <Space>
                        <ConfigProvider>
                          <DatePicker
                            defaultValue={dayjs(Date.now())}
                            value={dayjs(darFormData?.statusData?.closingDate)}
                            disabled
                            style={{ width: "100%" }}
                            onChange={(event) => {
                              setDarFormData((prev) => ({
                                ...prev,
                                statusData: {
                                  ...prev?.statusData,
                                  closingDate: event?.target?.value,
                                },
                              }));
                            }}
                          />
                        </ConfigProvider>
                      </Space>
                    </div>
                  </div>
                )}
                {darFormData?.status?.id === 1 && (
                  <div>
                    <label class="col-md-12 mt-2">Lost Reason</label>
                    <div className="col-md-12">
                      <select
                        style={{ width: "100%" }}
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            statusData: {
                              ...prev?.statusData,
                              lostReason: event?.target?.value,
                            },
                          }));
                        }}
                        value={darFormData?.statusData?.lostReason || ""}
                        disabled
                      >
                        {/* <option value={0}>Select</option>
                        <option value={1}>Insufficient Fund</option>
                        <option value={2}>Higher price</option>
                        <option value={3}>Technically not qualified</option>
                        <option value={4}>Competitor</option>
                        <option value={5}>Others</option> */}
                        {LostReasonList?.map((item) => (
                          <option
                            key={`${item?.id}${item?.value}`}
                            value={item?.id}
                          >
                            item?.value
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <label class="col-md-12 mt-2">
                  Opportunity Status<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      // setOpportunityStatus(e.target.value);
                      setDarFormData((prev) => ({
                        ...prev,
                        OpportunityStatus: e?.target?.value,
                      }));
                    }}
                    value={darFormData?.OpportunityStatus}
                  >
                    {/* <option value={null}>Select</option>
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
                    <option value={11}>InOffice</option> */}
                    {OpportunityStatusList?.map((item) => (
                      <option
                        key={`${item?.id}${item?.value}`}
                        value={item?.id}
                      >
                        item?.value
                      </option>
                    ))}
                  </select>
                </div>
                {darFormData?.OpportunityStatus?.id >= 4 && (
                  <div>
                    <label class="col-md-12 mt-2">Is Fund Available</label>
                    <div className="col-md-12">
                      <select
                        style={{ width: "100%" }}
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            opportunityStatusData: {
                              ...prev?.statusData,
                              isFundAvailable: event?.target?.value,
                            },
                          }));
                        }}
                        value={
                          darFormData?.opportunityStatusData?.isFundAvailable
                        }
                        disabled
                      >
                        {/* <option value={null}>Select</option>
                        <option value={"Yes"}>Yes</option>
                        <option value={"No"}>No</option> */}
                        {FundAvailableOptionsList?.map((item, index) => (
                          <option
                            key={`${item?.id}${item?.index}`}
                            value={item?.id}
                          >
                            Yes
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {darFormData?.OpportunityStatus?.id > 5 && (
                  <div>
                    <label class="col-md-12 mt-2">Order Value</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        disabled
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            opportunityStatusData: {
                              ...prev?.statusData,
                              orderValue: event?.target?.value,
                            },
                          }));
                        }}
                        value={darFormData?.opportunityStatusData?.orderValue}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Advance %</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        disabled
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            opportunityStatusData: {
                              ...prev?.statusData,
                              advance: event?.target?.value,
                            },
                          }));
                        }}
                        value={darFormData?.opportunityStatusData?.advance}
                      />
                    </div>
                    <label class="col-md-12 mt-2">GST</label>
                    <div className="col-md-12 ">
                      {/* <Checkbox.Group options={plainOptions} defaultValue={[5]} onChange={GstvalueChange} /> */}
                      <Radio.Group
                        options={plainOptions}
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            opportunityStatusData: {
                              ...prev?.statusData,
                              gst: event?.target?.value,
                            },
                          }));
                        }}
                        // disabled
                        defaultValue={darFormData?.opportunityStatusData?.gst}
                      />
                    </div>
                    <div className="col-md-12 mt-3">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        // disabled
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            opportunityStatusData: {
                              ...prev?.statusData,
                              taxPrice: event?.target?.value,
                            },
                          }));
                        }}
                        value={darFormData?.opportunityStatusData?.taxPrice}
                      />
                    </div>
                    <div className="col-md-12 mt-3">
                      <button
                        className="FunctionButton5"
                        style={{
                          backgroundColor: "#e8d105",
                          color: "black",
                          width: "120px",
                        }}
                        onClick={calculate}
                      >
                        Calculate
                      </button>
                    </div>
                    <label class="col-md-12 mt-2">Delivery %</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        disabled
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            opportunityStatusData: {
                              ...prev?.statusData,
                              delivery: event?.target?.value,
                            },
                          }));
                        }}
                        value={darFormData?.opportunityStatusData?.delivery}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Training %</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        disabled
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            opportunityStatusData: {
                              ...prev?.statusData,
                              training: event?.target?.value,
                            },
                          }));
                        }}
                        value={darFormData?.opportunityStatusData?.training}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Actual Value</label>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        disabled
                        onChange={(event) => {
                          setDarFormData((prev) => ({
                            ...prev,
                            opportunityStatusData: {
                              ...prev?.statusData,
                              actualValue: event?.target?.value,
                            },
                          }));
                        }}
                        value={darFormData?.opportunityStatusData?.actualValue}
                      />
                    </div>
                  </div>
                ) }
                <label class="col-md-12 mt-2">Remark</label>
                <div className="col-md-12">
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    disabled
                    onChange={(event) => {
                      setDarFormData((prev) => ({
                        ...prev,
                        opportunityStatusData: {
                          ...prev?.statusData,
                          remark: event?.target?.value,
                        },
                      }));
                    }}
                    value={darFormData?.opportunityStatusData?.remark}
                  />
                </div>
                <label class="col-md-12 mt-2">Documents (if any)</label>
                <div className="col-md-12">
                  <input
                    type="file"
                    disabled
                    // onChange={AttachmentUpload}
                  />
                </div>
                <label class="col-md-12 mt-2">Uploaded Document</label>
                {/* <div className="col-md-12">
                  <div className="form-group d-flex">
                    <div className="col-md-8">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        disabled
                        onChange={(e) => {
                          setDocumentName(e.target.value);
                          console.log(TaxPrice);
                        }}
                        value={DocumentName}
                      />
                    </div>
                    {DocumentName != null && (
                      <div class="col-md-4">
                        <a
                          href={`${localStorage.getItem(
                            "BaseUrl"
                          )}/Dar/DarDownloadFile?DarId=${searchparams.get(
                            "id"
                          )}`}
                        >
                          <button
                            className="FunctionButton5"
                            style={{
                              backgroundColor: "#e8d105",
                              color: "black",
                              width: "120px",
                            }}
                          >
                            Download
                          </button>
                        </a>
                      </div>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DarComponent;
