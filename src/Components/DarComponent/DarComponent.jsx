import React, { useEffect, useState } from "react";
import {
  ConfigProvider,
  DatePicker,
  Space,
  Select,
  Input,
  Radio,
  Button,
  Upload,
  Modal,
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

import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { getPersonContactedData } from "../../utils/api";
import useLocalStorage from "../../hooks/useLocalStorage";

function DarComponent({
  darFormData,
  setDarFormData,
  formIndex,
  customerContactList,
  principalList,
  disabledField,
  removeForm,
}) {
  const [jwtStoredValue, setJwtStoredValue] = useLocalStorage("JwtToken");
  const [uploadFile, setUploadFile] = useState([]);
  const [previewFile, setPreviewFile] = useState();
  const [showPreview, setShowPreview] = useState();

  const { contactPerson } = darFormData;

  const handleRemove = async (file) => {
    let indexOfFile = uploadFile.indexOf(file);
    setUploadFile((prev) => {
      let newAr = [...prev];
      newAr = newAr.splice(indexOfFile, indexOfFile);
      return newAr;
    });
  };

  const handlePreview = async (file) => {
    console.log(file, "File");
    if (file && file?.type.includes("image/")) {
      let previewUrl = URL.createObjectURL(uploadFile[0]);
      setPreviewFile(previewUrl);
      setShowPreview(true);
    } else if (file && file?.type.includes("application/pdf")) {
      let url = URL.createObjectURL(file);
      window.open(url, "_blank");
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    URL.revokeObjectURL(previewFile);
  };

  useEffect(() => {
    if (uploadFile[0]) {
      let previewUrl = URL.createObjectURL(uploadFile[0]);
      setPreviewFile(previewUrl);
    }
  }, [uploadFile]);

  const calculate = () => {
    const FivePercent =
      darFormData?.opportunityStatusData?.orderValue *
      (darFormData?.opportunityStatusData?.gst / 100);
    setDarFormData((prev) => {
      let newData = [...prev];
      newData[formIndex] = {
        ...prev[formIndex],
        opportunityStatusData: {
          ...prev[formIndex]?.opportunityStatusData,
          taxPrice: FivePercent.toFixed(2),
        },
      };
      return newData;
    });

    if (
      darFormData?.opportunityStatusData?.orderValue &&
      darFormData?.opportunityStatusData?.taxPrice
    ) {
      const calculatedActualValue =
        darFormData?.opportunityStatusData?.orderValue -
        darFormData?.opportunityStatusData?.taxPrice;

      console.log(calculatedActualValue, "cla dat");
      setDarFormData((prev) => {
        let newData = [...prev];
        newData[formIndex] = {
          ...prev[formIndex],
          opportunityStatusData: {
            ...prev[formIndex]?.opportunityStatusData,
            actualValue: calculatedActualValue,
          },
        };
        return newData;
      });
    }
  };
  useEffect(() => console.log(darFormData), [darFormData]);

  useEffect(() => {
    if (typeof darFormData?.contactPerson?.custId === "number") {
      getPersonContactedData(
        darFormData?.contactPerson?.custId,
        jwtStoredValue
      ).then((data) => {
        console.log("updating data");
        setDarFormData((prev) => {
          let newData = [...prev];
          newData[formIndex] = {
            ...prev[formIndex],
            contactPerson: {
              ...prev[formIndex].contactPerson,
              custId: data?.custId,
              mobileNo: data?.mobileNo,
              phoneNo: data?.phoneNo,
              contactPerson: data?.contactPerson,
              department: data?.custDepartment,
              designation: data?.custDesgn,
              email: data?.email,
            },
          };
          return newData;
        });
      });
    }
  }, [darFormData?.contactPerson?.custId]);

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="bg-boxshadow mb-4">
            {!disabledField && (
              <Button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  outline: "none",
                  width: "2.6rem",
                  height: "2.6rem",
                }}
                onClick={() => removeForm(formIndex)}
              >
                <DeleteOutlined style={{ fontSize: "1.8rem" }} />
              </Button>
            )}
            <div>
              <div style={{ width: "43vw", boxShadow: "10px" }}>
                <label class="col-md-12">Person Contacted</label>
                <div className="col-md-12">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={(personValue) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          contactPerson: {
                            ...prev[formIndex]?.contactPerson,
                            custId: personValue,
                          },
                        };
                        return newData;
                      });
                    }}
                    value={contactPerson?.custId}
                    disabled={disabledField}
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                      // let callTypeData = CallTypeList?.find(
                      //   (item) => item?.id === callTypeValue
                      // );
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          callType: callTypeValue,
                        };
                        return newData;
                      });
                    }}
                    disabled={disabledField}
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
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          callStatus: callStatusValue,
                        };
                        return newData;
                      });
                    }}
                    value={darFormData.callStatus}
                    disabled={disabledField}
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
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          darVertical: verticalValue,
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.darVertical}
                    disabled={disabledField}
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
                    disabled={disabledField}
                  />
                </div>
                <label class="col-md-12 mt-2">Month of Order</label>
                <div className="col-md-12">
                  <Space>
                    <ConfigProvider>
                      <DatePicker
                        defaultValue={dayjs(Date.now())}
                        value={dayjs(darFormData?.monthOfOrder)}
                        disabled={disabledField}
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
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          status: salesStatusValue,
                          statusData: {},
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.status}
                    disabled={disabledField}
                  >
                    {SalesStatus?.map((item) => (
                      <option key={item?.id} value={item?.id}>
                        {item?.value}
                      </option>
                    ))}
                  </Select>
                </div>

                {darFormData?.status?.id === 1 && (
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
                            disabled={disabledField}
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
                              dayjs(darFormData?.statusData?.darClosingDate) ||
                              dayjs(Date.now())
                            }
                            disabled={disabledField}
                            style={{ width: "100%" }}
                            onChange={(event) => {
                              setDarFormData((prev) => {
                                let newData = [...prev];
                                newData[formIndex] = {
                                  ...prev[formIndex],
                                  statusData: {
                                    // ...prev[formIndex]?.statusData,
                                    darClosingDate: event,
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
                {darFormData?.status?.id === 3 && (
                  <div>
                    <label class="col-md-12 mt-2">Lost Reason</label>
                    <div className="col-md-12">
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select"
                        onChange={(lostReasonValue) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              statusData: {
                                ...prev[formIndex]?.statusData,
                                lostReasonId: lostReasonValue,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.statusData?.lostReasonId}
                        disabled={disabledField}
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
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          opportunityStatus: opportunityStatusValue,
                          opportunityStatusData: {},
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.opportunityStatus}
                    disabled={disabledField}
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
                {darFormData?.opportunityStatus >= 4 && (
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
                        disabled={disabledField}
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
                {darFormData?.opportunityStatus > 5 && (
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
                        disabled={disabledField}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Advance %</label>
                    <div className="col-md-12">
                      <Input
                        size={"middle"}
                        style={{ width: "100%" }}
                        type="text"
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                advancePay: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.advancePay}
                        disabled={disabledField}
                      />
                    </div>
                    <label class="col-md-12 mt-2">GST</label>
                    <div className="col-md-12 ">
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
                        value={darFormData?.opportunityStatusData?.gst}
                        disabled={disabledField}
                      />
                    </div>
                    <div className="col-md-12 mt-3">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
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
                        disabled={disabledField}
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
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                deliveryPay: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.deliveryPay}
                        disabled={disabledField}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Training %</label>
                    <div className="col-md-12">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                trainingPay: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.trainingPay}
                        disabled={disabledField}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Actual Value</label>
                    <div className="col-md-12">
                      <Input
                        style={{ width: "100%" }}
                        type="text"
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
                        disabled={disabledField}
                      />
                    </div>
                  </div>
                )}
                <label class="col-md-12 mt-2">Remark</label>
                <div className="col-md-12">
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    onChange={(event) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          remark: event?.target?.value,
                        };
                        return newData;
                      });
                    }}
                    value={darFormData?.remark}
                    disabled={disabledField}
                  />
                </div>
                <label class="col-md-12 mt-2">Documents (if any)</label>
                <div style={{ marginLeft: "1rem" }}>
                  <Upload
                    accept="image/*, application/*"
                    beforeUpload={(file) => {
                      setUploadFile([file]);
                      return false;
                    }}
                    showUploadList={{
                      showPreviewIcon: false,
                      showDownloadIcon: true,
                    }}
                    onPreview={handlePreview}
                    onRemove={handleRemove}
                    fileList={uploadFile}
                    style={{ outline: "none", border: "none" }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </div>
                <Modal
                  open={showPreview}
                  footer={null}
                  onCancel={closePreview}
                  width={"38vw"}
                  style={{ top: 10 }}
                >
                  <img
                    alt="Preview"
                    style={{ width: "100%" }}
                    src={previewFile}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DarComponent;
