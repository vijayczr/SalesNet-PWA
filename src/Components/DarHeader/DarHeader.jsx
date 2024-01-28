import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ConfigProvider,
  DatePicker,
  TimePicker,
  Space,
  Select,
  Input,
  Button,
} from "antd";
import dayjs from "dayjs";
import { LeadList } from "../../utils/data";

function DarHeader({
  darHeaderData,
  setDarHeaderData,
  AppEngList,
  customerList,
  disabledField,
}) {
  const { profileData, applicationEngineer, leadType } = darHeaderData;

  useEffect(() => console.log(darHeaderData), [darHeaderData]);

  return (
    <div className="containner p-4" style={{ backgroundColor: "#f3f5f9" }}>
      <div className="row">
        <div className="col-lg-12">
          {/* <div className="bg-boxshadow m-0"> */}
          {/* <div className="ibox-content"> */}
          
          <div className="row mt-3">
            <div className="col-lg-4 ">
              <div className="form-group d-flex">
                <label className="col-md-5 mt-1 mb-0">
                  Employee Name<span className="float-right">:</span>
                </label>
                <div className="col-md-7">
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    value={profileData?.userName}
                    disabled={disabledField}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-4 ">
              <div className="form-group d-flex">
                <label className="col-md-5 mt-1 mb-0">
                  Application Engineer
                  <span style={{ color: "red" }}>*</span>{" "}
                  <span className="float-right">:</span>
                </label>
                <div className="col-md-7">
                  <Select
                    style={{ width: "100%", height: "2rem" }}
                    placeholder="Select"
                    onChange={(appEngId) => {
                      setDarHeaderData((prev) => ({
                        ...prev,
                        applicationEngineer: appEngId,
                      }));
                    }}
                    disabled={disabledField}
                  >
                    {AppEngList?.map((e) => (
                      <option key={e.empId} value={e.empId}>
                        {e.empName}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <div className="col-lg-4 ">
              <div className="form-group d-flex">
                <label className="col-md-5 mt-1 mb-0">
                  Lead Type<span style={{ color: "red" }}>*</span>{" "}
                  <span className="float-right">:</span>
                </label>
                <div className="col-md-7">
                  <Select
                    style={{ width: "100%", height: "2rem" }}
                    placeholder="Select"
                    onChange={(leadTypeId) => {
                      setDarHeaderData((prev) => ({
                        ...prev,
                        leadType: leadTypeId,
                      }));
                    }}
                    disabled={disabledField}
                  >
                    {LeadList?.map((leadItem) => (
                      <option value={leadItem?.id}>{leadItem?.value}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            <div className="col-lg-4 ">
              <div className="form-group d-flex">
                <label className="col-md-5 mt-1 mb-0">
                  Lead No<span style={{ color: "red" }}>*</span>{" "}
                  <span className="float-right">:</span>
                </label>
                <div className="col-md-7">
                  <Select
                    style={{ width: "100%", height: "2rem" }}
                    placeholder="Select"
                    disabled={disabledField}
                    // onChange={(e) => { setLeadType(e.target.value) }}
                  >
                    <option value={null}>Select</option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="form-group d-flex">
                <label for="inputEmail3" className="col-md-5 mt-1">
                  Visit Date<span className="pull-right">:</span>
                </label>
                <div className="col-md-7">
                  <Space>
                    <ConfigProvider>
                      <DatePicker
                        defaultValue={dayjs(Date.now())}
                        value={
                          // darHeaderData?.joiningDate ?
                            dayjs(darHeaderData?.joiningDate)
                            // : dayjs(new Date())
                        }
                        style={{ width: "100%", height: "2rem" }}
                        onChange={(date) => {
                          setDarHeaderData((prev) => ({
                            ...prev,
                            joiningDate: date,
                          }));
                        }}
                        disabled={disabledField}
                      />
                    </ConfigProvider>
                  </Space>
                </div>
              </div>
            </div>

            <div className="col-lg-4 ">
              <div className="form-group d-flex">
                <label className="col-md-5 mt-1 mb-0">
                  Visit Time<span className="float-right">:</span>
                </label>
                <Input
                  type="text"
                  value={darHeaderData?.visitTime}
                  onChange={(date) => {
                    setDarHeaderData((prev) => ({
                      ...prev,
                      visitTime: date.target.value,
                    }));
                  }}
                  disabled={disabledField}
                />
                {/* <Space>
                      <ConfigProvider>
                        <TimePicker
                          defaultValue={dayjs(Date.now())}
                          value={
                            darHeaderData?.visitTime
                              ? dayjs(darHeaderData?.visitTime)
                              : dayjs(new Date(), "HH:mm")
                          }
                          showSecond={false}
                          format={"HH:mm"}
                          style={{ width: "100%" }}
                          onChange={(date) => {
                            setDarHeaderData((prev) => ({
                              ...prev,
                              visitTime: date,
                            }));
                          }}
                          disabled={disabledField}
                        />
                      </ConfigProvider>
                    </Space> */}
              </div>
            </div>

            <div className="col-lg-8 ">
              <div className="form-group d-flex">
                <label className="col-md-3 mt-1 mb-0">
                  Customer<span style={{ color: "red" }}>*</span>
                  <span className="float-right">:</span>
                </label>
                <div className="col-md-9">
                  <Select
                    showSearch
                    style={{ width: 400 }}
                    placeholder="Select"
                    onChange={(customerId) => {
                      setDarHeaderData((prev) => ({
                        ...prev,
                        customer: customerId,
                      }));
                    }}
                    value={darHeaderData?.customer}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={customerList}
                    disabled={disabledField}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DarHeader;
