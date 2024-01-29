import React, { useEffect, useLayoutEffect, useState } from "react";
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
  Table,
  InputNumber,
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
  productColumns,
} from "../../utils/data";
import "../DarComponent/DarComponent.css";

import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { getPersonContactedData, getProductLists } from "../../utils/api";
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
  const [previewFile, setPreviewFile] = useState();
  const [showPreview, setShowPreview] = useState();
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { contactPerson } = darFormData;

  const handleRemove = async (file) => {
    setDarFormData((prev) => {
      let newAr = [...prev];
      newAr[formIndex] = {
        ...prev[formIndex],
        uploadFile: null,
      };
      return newAr;
    });
  };

  const handlePreview = async (file) => {
    if (file && file?.type.includes("image/")) {
      let previewUrl = URL.createObjectURL(darFormData?.uploadFile);
      setPreviewFile(previewUrl);
      setShowPreview(true);
    } else if (file && file?.type.includes("application/pdf")) {
      let url = URL.createObjectURL(file);
      window.open(url, "_blank");
    } else {
      let downloadLink = document.createElement("a");
      downloadLink.download = "Uploaded File";
      downloadLink.href = URL.createObjectURL(file);
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href);
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    URL.revokeObjectURL(previewFile);
  };

  useEffect(() => {
    if (darFormData?.uploadFile) {
      let previewUrl = URL.createObjectURL(darFormData?.uploadFile);
      setPreviewFile(previewUrl);
    }
  }, [darFormData?.uploadFile]);

  const calculate = () => {
    if (
      darFormData?.opportunityStatusData?.orderValue &&
      darFormData?.opportunityStatusData?.gstPerc
    ) {
      const FivePercent = Number(
        darFormData?.opportunityStatusData?.orderValue *
          (darFormData?.opportunityStatusData?.gstPerc / 100)
      );

      const calculatedActualValue =
        darFormData?.opportunityStatusData?.orderValue - FivePercent.toFixed(2);

      setDarFormData((prev) => {
        let newData = [...prev];
        newData[formIndex] = {
          ...prev[formIndex],
          opportunityStatusData: {
            ...prev[formIndex]?.opportunityStatusData,
            gst: Number(FivePercent.toFixed(2)),
            actualValue: calculatedActualValue,
          },
        };
        return newData;
      });
    }
  };

  useEffect(() => {
    getProductLists(darFormData?.principal, jwtStoredValue).then((data) => {
      setProductList(data);
    });
  }, [darFormData?.principal]);

  useEffect(() => {
    if (typeof darFormData?.contactPerson?.custId === "number") {
      getPersonContactedData(
        darFormData?.contactPerson?.custId,
        jwtStoredValue
      ).then((data) => {
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

  useEffect(() => console.log(darFormData, "dar form"), [darFormData]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setDarFormData((prev) => {
        let newData = [...prev];
        newData[formIndex] = {
          ...prev[formIndex],
          selectedProducts: selectedRows,
        };
        return newData;
      });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="bg-boxshadow mb-4">
            {!disabledField && (
              <Button
                style={{
                  backgroundColor: "#da251c",
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
                <div className="col-md-12" style={{ padding: 0 }}>
                  <div className="form-group d-flex">
                    <div className="col-md-8">
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select"
                        onChange={(value) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              selectedProducts: [],
                              principal: value,
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.principal}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={principalList?.map((item) => ({
                          label: item?.principalName,
                          value: item?.principalId,
                        }))}
                        disabled={disabledField}
                      />
                    </div>
                    <div class="col-md-4">
                      <Button
                        // data-toggle="modal"
                        // data-target=".bd-example-modal-lg"
                        className="FunctionButton5"
                        style={{
                          backgroundColor: "#e8d105",
                          color: "black",
                          width: "120px",
                          fontWeight: "bolder",
                        }}
                        onClick={() => setIsModalOpen(true)}
                        disabled={disabledField}
                      >
                        Add Product
                      </Button>
                      <div>
                        <Modal
                          width={"90%"}
                          style={{ top: "1rem" }}
                          title={() => (
                            <div className="modal-header">
                              <h3>Product List</h3>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                          )}
                          footer={[
                            <Button
                              key="back"
                              size={"large"}
                              style={{
                                backgroundColor: "#007bff",
                                color: "#ffffff",
                              }}
                              onClick={() => setIsModalOpen(false)}
                            >
                              Close
                            </Button>,
                          ]}
                          open={isModalOpen}
                          onOk={() => setIsModalOpen(false)}
                          onCancel={() => setIsModalOpen(false)}
                        >
                          <div className="modal-body">
                            <ConfigProvider
                              theme={{
                                components: {
                                  Table: {
                                    borderColor: "#000000",
                                    headerBg: "#da251c",
                                    headerColor: "white",
                                    cellFontSizeSM: 6,
                                    rowHoverBg: "#abc4af",
                                    cellPaddingInlineSM: 2,
                                  },
                                },
                              }}
                            >
                              <Table
                                rowSelection={{
                                  type: "checkbox",
                                  ...rowSelection,
                                }}
                                columns={productColumns}
                                dataSource={productList}
                              />
                            </ConfigProvider>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>

                {darFormData?.selectedProducts?.length > 0 && (
                  <div style={{ overflow: "auto" }}>
                    <div>
                      <table className="product-table">
                        <thead>
                          <tr className="product-heading-row">
                            <th>Product</th>
                            <th>Techlab MRP</th>
                            <th>Quoted Price</th>
                            <th>Product Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {darFormData?.selectedProducts?.map(
                            (
                              {
                                key: darProductId,
                                productName,
                                productValue,
                                quotedPrice,
                                techlabPrice,
                              },
                              productIndex
                            ) => (
                              <tr
                                key={darProductId}
                                className="product-body-row"
                              >
                                <td>
                                  <Input
                                    name="productName"
                                    value={productName}
                                    type="text"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="darProductPrice"
                                    value={techlabPrice}
                                    type="text"
                                    disabled
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="quotedPrice"
                                    value={quotedPrice}
                                    type="text"
                                    disabled={disabledField}
                                    onChange={(value) => {
                                      const newValue = value.target.value;
                                      setDarFormData((prev) => {
                                        let newData = [...prev];
                                        let selectedProductsCopy = [
                                          ...prev[formIndex].selectedProducts,
                                        ];
                                        selectedProductsCopy[productIndex] = {
                                          ...selectedProductsCopy[productIndex],
                                          quotedPrice: newValue,
                                        };
                                        newData[formIndex] = {
                                          ...prev[formIndex],
                                          selectedProducts:
                                            selectedProductsCopy,
                                        };

                                        return newData;
                                      });
                                    }}
                                  />
                                </td>
                                <td>
                                  <Input
                                    name="productValue"
                                    value={productValue}
                                    type="text"
                                    disabled={disabledField}
                                    onChange={(value) => {
                                      const newValue = value.target.value;
                                      setDarFormData((prev) => {
                                        let newData = [...prev];
                                        let selectedProductsCopy = [
                                          ...prev[formIndex].selectedProducts,
                                        ];
                                        selectedProductsCopy[productIndex] = {
                                          ...selectedProductsCopy[productIndex],
                                          productValue: newValue,
                                        };
                                        newData[formIndex] = {
                                          ...prev[formIndex],
                                          selectedProducts:
                                            selectedProductsCopy,
                                        };

                                        return newData;
                                      });
                                    }}
                                  />
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <label class="col-md-12 mt-2">
                  Call Type<span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-md-12">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select"
                    onChange={(callTypeValue) => {
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
                  <InputNumber
                    style={{ width: "100%" }}
                    type="number"
                    controls={false}
                    onChange={(eorValue) => {
                      setDarFormData((prev) => {
                        let newData = [...prev];
                        newData[formIndex] = {
                          ...prev[formIndex],
                          expectedOrderValue: eorValue,
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
                              monthOfOrder: event,
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

                {darFormData?.status === 1 && (
                  <div>
                    <label class="col-md-12 mt-2">Next Action Date</label>
                    <div className="col-md-12">
                      <Space>
                        <ConfigProvider>
                          <DatePicker
                            value={
                              darFormData?.statusData?.nextActionDate
                                ? dayjs(darFormData?.statusData?.nextActionDate)
                                : null
                            }
                            disabled={disabledField}
                            style={{ width: "100%" }}
                            onChange={(event) => {
                              setDarFormData((prev) => {
                                let newData = [...prev];
                                newData[formIndex] = {
                                  ...prev[formIndex],
                                  statusData: {
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
                {darFormData?.status === 2 && (
                  <div>
                    <label class="col-md-12 mt-2">Closing Date</label>
                    <div className="col-md-12">
                      <Space>
                        <ConfigProvider>
                          <DatePicker
                            defaultValue={dayjs(Date.now())}
                            value={
                              darFormData?.statusData?.darClosingDate
                                ? dayjs(darFormData?.statusData?.darClosingDate)
                                : null
                            }
                            disabled={disabledField}
                            style={{ width: "100%" }}
                            onChange={(event) => {
                              setDarFormData((prev) => {
                                let newData = [...prev];
                                newData[formIndex] = {
                                  ...prev[formIndex],
                                  statusData: {
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
                {darFormData?.status === 3 && (
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
                      <InputNumber
                        size={"middle"}
                        style={{ width: "100%" }}
                        type="number"
                        controls={false}
                        onChange={(event) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                orderValue: event,
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
                      <InputNumber
                        size={"middle"}
                        style={{ width: "100%" }}
                        type="number"
                        controls={false}
                        onChange={(eventValue) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                advancePay: eventValue,
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
                                gstPerc: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.gstPerc}
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
                                gst: event?.target?.value,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.gst}
                        disabled={true}
                      />
                    </div>
                    <label class="col-md-12 mt-2">Delivery %</label>
                    <div className="col-md-12">
                      <InputNumber
                        style={{ width: "100%" }}
                        type="number"
                        controls={false}
                        onChange={(eventValue) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                deliveryPay: eventValue,
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
                      <InputNumber
                        style={{ width: "100%" }}
                        type="number"
                        controls={false}
                        onChange={(eventValue) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                trainingPay: eventValue,
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
                      <InputNumber
                        style={{ width: "100%" }}
                        type="number"
                        onChange={(eventValue) => {
                          setDarFormData((prev) => {
                            let newData = [...prev];
                            newData[formIndex] = {
                              ...prev[formIndex],
                              opportunityStatusData: {
                                ...prev[formIndex]?.opportunityStatusData,
                                actualValue: eventValue,
                              },
                            };
                            return newData;
                          });
                        }}
                        value={darFormData?.opportunityStatusData?.actualValue}
                        disabled={true}
                      />
                    </div>
                    <div className="col-md-12 mt-3">
                      <Button
                        className="FunctionButton5"
                        style={{
                          backgroundColor: "#e8d105",
                          color: "black",
                          width: "120px",
                        }}
                        onClick={calculate}
                        disabled={disabledField}
                      >
                        Calculate
                      </Button>
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
                      setDarFormData((prev) => {
                        let newAr = [...prev];
                        newAr[formIndex] = {
                          ...prev[formIndex],
                          uploadFile: file,
                        };
                        return newAr;
                      });
                      return false;
                    }}
                    showUploadList={{
                      showPreviewIcon: false,
                      showDownloadIcon: true,
                    }}
                    onPreview={handlePreview}
                    onRemove={handleRemove}
                    fileList={
                      darFormData?.uploadFile ? [darFormData?.uploadFile] : []
                    }
                    style={{ outline: "none", border: "none" }}
                    disabled={disabledField}
                  >
                    <Button disabled={disabledField} icon={<UploadOutlined />}>
                      Click to Upload
                    </Button>
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
