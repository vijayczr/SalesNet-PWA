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
import { LeadList } from "../../utils/data";

function DarHeader({
  darHeaderData,
  setDarHeaderData,
  AppEngList,
  customerList,
}) {
  const { profileData, applicationEngineer, leadType } = darHeaderData;
  // console.log(darHeaderData, 'dar header')
  // let profileData, applicationEngineer, leadType;
  const navigate = useNavigate();

  return (
    <div
      className="containner p-4"
      style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }}
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="bg-boxshadow">
            <div className="ibox-content">
              <center>
                {/* <button className="FunctionButton" style={{ backgroundColor: "#da251c" }} onClick={DocSearchReser}>Reset</button>
              <button className="FunctionButton" style={{ backgroundColor: "#183985" }} onClick={DocumentSearch}>Search</button> */}
                <button
                  className="FunctionButton"
                  style={{ backgroundColor: "#e8d105", color: "black" }}
                  // onClick={navigate(-1)}
                >
                  Back
                </button>
              </center>
              <div className="row mt-3">
                <div className="col-lg-4 ">
                  <div className="form-group d-flex">
                    <label className="col-md-5 mt-1 mb-0">
                      Employee Name<span className="float-right">:</span>
                    </label>
                    <div className="col-md-7">
                      <input
                        style={{ width: "100%" }}
                        type="text"
                        value={profileData?.userName}
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
                      <select
                        style={{ width: "100%", height: "2rem" }}
                        onChange={(e) => {
                          // setAppeng(e.target.value);
                          setDarHeaderData((prev) => ({
                            ...prev,
                            applicationEngineer: e?.target?.value,
                          }));
                        }}
                        value={applicationEngineer?.name}
                      >
                        <option value={0}>Select</option>
                        {AppEngList?.map((e) => (
                          <option key={e.empId} value={e.empId}>
                            {e.empName}
                          </option>
                        ))}
                      </select>
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
                      <select
                        style={{ width: "100%", height: "2rem" }}
                        onChange={(e) => {
                          // setLeadType(e.target.value);
                          setDarHeaderData((prev) => ({
                            ...prev,
                            leadType: e?.target?.value,
                          }));
                        }}
                        value={leadType?.value}
                      >
                        {/* <option value={null}>Select</option>
                        <option value={1}>Self</option>
                        <option value={2}>Lead</option> */}
                        <option value={null}>Select</option>
                        {LeadList?.map((leadItem) => (
                          <option value={leadItem?.id}>
                            {leadItem?.value}
                          </option>
                        ))}
                      </select>
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
                      <select
                        style={{ width: "100%", height: "2rem" }}
                        // onChange={(e) => { setLeadType(e.target.value) }}
                      >
                        <option value={null}>Select</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group d-flex">
                    <label for="inputEmail3" className="col-md-5 mt-1">
                      Date<span className="pull-right">:</span>
                    </label>
                    <div className="col-md-7">
                      {/* <Space >
                                              <DatePicker style={{ width: "100%" }} onChange={Date2} />
                                          </Space> */}
                      <Space>
                        <ConfigProvider>
                          <DatePicker
                            defaultValue={dayjs(Date.now())}
                            value={
                              darHeaderData?.joiningDate
                                ? dayjs(darHeaderData?.joiningDate)
                                : dayjs(new Date())
                            }
                            style={{ width: "100%", height: "2rem" }}
                            onChange={(date) =>
                              setDarHeaderData((prev) => ({
                                ...prev,
                                joiningDate: date,
                              }))
                            }
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
                    <Space>
                      <ConfigProvider>
                        <TimePicker
                          defaultValue={dayjs(Date.now())}
                          value={
                            darHeaderData?.visitTime
                              ? dayjs(darHeaderData?.visitTime)
                              : dayjs(new Date())
                          }
                          showSecond={false}
                          style={{ width: "100%" }}
                          onChange={(date) =>
                            setDarHeaderData((prev) => ({
                              ...prev,
                              visitTime: date,
                            }))
                          }
                        />
                      </ConfigProvider>
                    </Space>
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
                        placeholder="Search to Select"
                        onChange={(customerId) => {
                          const selectedCustomer = customerList.find(
                            (item) => item?.value === customerId
                          );
                          setDarHeaderData((prev) => ({
                            ...prev,
                            customer: selectedCustomer,
                          }));
                        }}
                        value={darHeaderData?.customer?.label}
                        // optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        // filterSort={(optionA, optionB) =>
                        //   (optionA?.label ?? "")
                        //     .toLowerCase()
                        //     .localeCompare((optionB?.label ?? "").toLowerCase())
                        // }
                        options={customerList}
                      />
                    </div>
                  </div>
                </div>
                <button onClick={() => console.log(darHeaderData, "dar")}>
                  click
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DarHeader;
