import React from "react";
import {
  ConfigProvider,
  DatePicker,
  Space,
  Select,
  Input,
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
  darFormData,
  setDarFormData,
  formIndex,
  customerContactList,
  principalList,
}) {
  const { contactPerson } = darFormData;

  const calculate = () => {
    const FivePercent =
      darFormData?.opportunityStatusData?.orderValue *
      (darFormData?.opportunityStatusData?.gst / 100);
    // setTaxPrice(x);
    setDarFormData((prev) => {
      let newData = [...prev];
      newData[formIndex] = {
        ...prev[formIndex],
        opportunityStatusData: {
          ...prev[formIndex]?.opportunityStatusData,
          taxPrice: FivePercent,
        },
      };
      return newData;
    });
  };

  return (
    <div
      className="containner p-4"
      style={{ height: "70vh", overflow: "auto", backgroundColor: "#f3f5f9" }}
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="bg-boxshadow mb-4">
            <div className="ibox-content pt-4">
              <div
                class="box bg-boxshadow"
                style={{ width: "43vw", boxShadow: "10px" }}
              >
                <label class="col-md-12">Person Contacted</label>
                <div className="col-md-12">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={(personValue) => {
                      let personData = customerContactList?.find(
                        (item) => item?.custId === personValue
                      );

                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          contactPerson: {
                            ...prev[formIndex]?.contactPerson,
                            ...personData,
                          },
                        };
                        return newData;
                      });
                    }}
                    value={contactPerson?.contactPerson?.contacPerson}
                  >
                    {customerContactList?.map((contactList) => (
                      <option
                        key={contactList.custId}
                        value={contactList.custId}
                      >
                        {contactList.contactPerson}
                      </option>
                    ))}
                  </Select>
                </div>
                <label class="col-md-12 mt-2">Designation</label>
                <div className="col-md-12">
                  <Input
                    size={"middle"}
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Select"
                    // disabled
                    onChange={(e) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          contactPerson: {
                            ...prev[formIndex]?.contactPerson,
                            designation: e?.target?.value,
                          },
                        };
                        return newData;
                      });
                    }}
                    value={contactPerson?.designation}
                  />
                </div>
                <label class="col-md-12 mt-2">Department</label>
                <div className="col-md-12">
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    // disabled
                    placeholder="Select"  
                    onChange={(e) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          contactPerson: {
                            ...prev[formIndex].contactPerson,
                            department: e?.target?.value,
                          },
                        };
                        return newData;
                      });
                    }}
                    value={contactPerson?.department}
                  />
                </div>
                <label class="col-md-12 mt-2">Mobile</label>
                <div className="col-md-12">
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    // disabled
                    placeholder="Select"
                    onChange={(e) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          contactPerson: {
                            ...prev[formIndex].contactPerson,
                            mobileNo: e?.target?.value,
                          },
                        };
                        return newData;
                      });
                    }}
                    value={contactPerson?.mobileNo}
                  />
                </div>
                <label class="col-md-12 mt-2">Phone</label>
                <div className="col-md-12">
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    // disabled
                    placeholder="Select"
                    onChange={(e) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          contactPerson: {
                            ...prev[formIndex]?.contactPerson,
                            phoneNo: e?.target?.value,
                          },
                        };
                        return newData;
                      });
                    }}
                    value={contactPerson?.phoneNo}
                  />
                </div>
                <label class="col-md-12 mt-2">E-mail</label>
                <div className="col-md-12">
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    // disabled
                    placeholder="Select"
                    onChange={(e) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          contactPerson: {
                            ...prev[formIndex]?.contactPerson,
                            email: e?.target?.value,
                          },
                        };
                        return newData;
                      });
                    }}
                    value={contactPerson?.email}
                  />
                </div>
                <label class="col-md-12 mt-2">Principal</label>
                <div className="col-md-12">
                  <div className="form-group d-flex">
                    <div className="col-md-8">
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select"
                        onChange={(principalValue) => {
                          let principalData = principalList?.find(
                            (item) => item?.custId === principalValue
                          );
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              prinicipal: principalData,
                            };
                            return newData;
                          });
                        }}
                        // disabled
                        value={darFormData?.principal}
                      >
                        {principalList?.map((e) => (
                          <option key={e.principalId} value={e.principalId}>
                            {e.principalName}
                          </option>
                        ))}
                      </Select>
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
                          <Input
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
                          <Input
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
                          <Input
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
                          <Input
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
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={(callTypeValue) => {
                      let callTypeData = CallTypeList?.find(
                        (item) => item?.id === callTypeValue
                      );
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          callType: callTypeData,
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.callType}
                  >
                    {CallTypeList?.map((type) => (
                      <option value={type.id}>{type.value}</option>
                    ))}
                  </Select>
                </div>
                <label class="col-md-12 mt-2">
                  Call Status<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={(callStatusValue) => {
                      let callTypeData = CallStatusList?.find(
                        (item) => item?.id === callStatusValue
                      );
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          callStatus: callTypeData,
                        };
                        return newData;
                      });
                    }}
                    value={darFormData.callStatus?.value}
                    // disabled
                  >
                    {CallStatusList?.map((type) => (
                      <option key={`${type?.id}${type.value}`} value={type.id}>
                        {type.value}
                      </option>
                    ))}
                  </Select>
                </div>
                <label class="col-md-12 mt-2">
                  Vertical<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={(verticalValue) => {
                      let verticalData = DAR_VerticalList?.find(
                        (item) => item?.id === verticalValue
                      );
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          darVertical: verticalData,
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.darVertical}
                    // disabled
                  >
                    {DAR_VerticalList?.map((type) => (
                      <option key={type?.id} value={type.id}>
                        {type.value}
                      </option>
                    ))}
                  </Select>
                </div>
                <label class="col-md-12 mt-2">
                  Expected Order Value<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <Input
                    style={{ width: "100%" }}
                    type="number"
                    onChange={(e) => {
                      // setExpectedOrdervalue(e.target.value);
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          expectedOrderValue: e.target.value,
                        };
                        return newData;
                      });
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
                        // disabled
                        style={{ width: "100%" }}
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              monthOfOrder: event?.target?.value,
                            };
                            return newData;
                          });
                        }}
                      />
                    </ConfigProvider>
                  </Space>
                </div>
                <label class="col-md-12 mt-2">
                  Status<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={(salesStatusValue) => {
                      let salesStatusData = SalesStatus?.find(
                        (item) => item?.id === salesStatusValue
                      );
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          status: salesStatusData,
                          statusData: {},
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.status}
                  >
                    {SalesStatus?.map((item) => (
                      <option key={item?.id} value={item?.id}>
                        {item?.value}
                      </option>
                    ))}
                  </Select>
                </div>

                {darFormData?.status?.id === 3 && (
                  <div>
                    <label class="col-md-12 mt-2">Next Action Date</label>
                    <div className="col-md-12">
                      <Space>
                        <ConfigProvider>
                          <DatePicker
                            defaultValue={dayjs(Date.now())}
                            value={
                              dayjs(darFormData?.statusData?.nextActionDate) ||
                              dayjs(Date.now())
                            }
                            // disabled
                            style={{ width: "100%" }}
                            onChange={(event) => {
                              setDarFormData((prev) => {
                                let newData = [...prev];
                                newData[formIndex] = {
                                  ...prev[formIndex],
                                  statusData: {
                                    // ...prev[formIndex]?.statusData,
                                    nextActionDate: event,
                                  },
                                };
                                return newData;
                              });
                            }}
                          />
                        </ConfigProvider>
                      </Space>
                    </div>
                  </div>
                )}
                {darFormData?.status?.id === 2 && (
                  <div>
                    <label class="col-md-12 mt-2">Closing Date</label>
                    <div className="col-md-12">
                      <Space>
                        <ConfigProvider>
                          <DatePicker
                            defaultValue={dayjs(Date.now())}
                            value={
                              dayjs(darFormData?.statusData?.closingDate) ||
                              dayjs(Date.now())
                            }
                            // disabled
                            style={{ width: "100%" }}
                            onChange={(event) => {
                              setDarFormData((prev) => {
                                let newData = [...prev];
                                newData[formIndex] = {
                                  ...prev[formIndex],
                                  statusData: {
                                    // ...prev[formIndex]?.statusData,
                                    closingDate: event,
                                  },
                                };
                                return newData;
                              });
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
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select"
                        onChange={(lostReasonValue) => {
                          let lostReasonData = LostReasonList?.find(
                            (item) => item?.id === lostReasonValue
                          );
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              statusData: {
                                ...prev[formIndex]?.statusData,
                                lostReason: lostReasonData,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.statusData?.lostReason}
                      >
                        {LostReasonList?.map((item) => (
                          <option
                            key={`${item?.id}${item?.value}`}
                            value={item?.id}
                          >
                            {item?.value}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}

                <label class="col-md-12 mt-2">
                  Opportunity Status<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={(opportunityStatusValue) => {
                      let opportunityData = OpportunityStatusList?.find(
                        (item) => item?.id === opportunityStatusValue
                      );
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          opportunityStatus: opportunityData,
                          opportunityStatusData: {}
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.OpportunityStatus}
                  >
                    {OpportunityStatusList?.map((item) => (
                      <option
                        key={`${item?.id}${item?.value}`}
                        value={item?.id}
                      >
                        {item?.value}
                      </option>
                    ))}
                  </Select>
                </div>
                {darFormData?.opportunityStatus?.id >= 4 && (
                  <div>
                    <label class="col-md-12 mt-2">Is Fund Available</label>
                    <div className="col-md-12">
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select"
                        onChange={(fundAvailableValue) => {
                          let fundAvailableData =
                            FundAvailableOptionsList?.find(
                              (item) => item?.id === fundAvailableValue
                            );
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                isFundAvailable: fundAvailableData?.id,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={
                          darFormData?.opportunityStatusData?.isFundAvailable
                        }
                        // disabled
                      >
                        {FundAvailableOptionsList?.map((item, index) => (
                          <option
                            key={`${item?.id}${item?.index}`}
                            value={item?.id}
                          >
                            {item?.value}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                )}
                {darFormData?.opportunityStatus?.id > 5 && (
                  <div>
                    <label class="col-md-12 mt-2">Order Value</label>
                    <div className="col-md-12">
                      <Input
                        size={"middle"}
                        style={{ width: "100%" }}
                        type="text"
                        // disabled
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                orderValue: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.orderValue}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Advance %</label>
                    <div className="col-md-12">
                      <Input
                        size={"middle"}
                        style={{ width: "100%" }}
                        type="text"
                        // disabled
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                advance: event?.target?.value,
                              },
                            };
                            return newData;
                          });
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
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                gst: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        // disabled
                        defaultValue={darFormData?.opportunityStatusData?.gst}
                      />
                    </div>
                    <div className="col-md-12 mt-3">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        // disabled
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                taxPrice: event?.target?.value,
                              },
                            };
                            return newData;
                          });
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
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        // disabled
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                delivery: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.delivery}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Training %</label>
                    <div className="col-md-12">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        // disabled
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                training: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.training}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Actual Value</label>
                    <div className="col-md-12">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        // disabled
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                actualValue: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.actualValue}
                      />
                    </div>
                  </div>
                )}
                <label class="col-md-12 mt-2">Remark</label>
                <div className="col-md-12">
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    // disabled
                    onChange={(event) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          remark: event?.target?.value
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.remark}
                  />
                </div>
                <label class="col-md-12 mt-2">Documents (if any)</label>
                <div className="col-md-12">
                  <Input
                    type="file"
                    // disabled
                    // onChange={AttachmentUpload}
                  />
                </div>
                <label class="col-md-12 mt-2">Uploaded Document</label>
                {/* <div className="col-md-12">
                  <div className="form-group d-flex">
                    <div className="col-md-8">
                      <Input
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
