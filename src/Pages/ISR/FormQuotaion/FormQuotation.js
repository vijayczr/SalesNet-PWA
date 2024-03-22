import React, { useContext, useEffect, useState } from "react";
import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo2 from "../../../assets/logo.png"
import QuotTC from "../../../Components/QuotT&C/QuotTC";
import { DatePicker, ConfigProvider, Table, Select, Space } from "antd";

export default function FormQuotation() {
    const [ProfileData, setProfileData] = useState("");
    const navigate = useNavigate();
    const [searchparams] = useSearchParams();

    const [PreQuotData, setPreQuotData] = useState("");


    const [Vertical, setVertical] = useState(null);
    const [Salutation, setSalutation] = useState(null);
    const [ContactPerson, setContactPerson] = useState(null);
    const [Subject, setSubject] = useState(null);
    const [Respected, setRespected] = useState("Sir");
    const [Statictext1, setStatictext1] = useState(null);
    const [Statictext2, setStatictext2] = useState(null);
    const [ProductData, setProductData] = useState(null);
    const [Formype, setFormype] = useState(0);
    const [Amount, setAmount] = useState(0);
    const [PaymentMode, setPaymentMode] = useState(0);
    const [BankName, setBankName] = useState(null);
    const [CheckDate, setCheckDate] = useState(null);
    const [ChequeDDNo, setChequeDDNo] = useState(null);
    const [BankTransactionDate, setBankTransactionDate] = useState(null);
    const [BankTransactionID, setBankTransactionID] = useState(null);
    const [TenderNo, setTenderNo] = useState(null);
    const [BankTenderDate, setBankTenderDate] = useState(null);
    const [Faithfully, setFaithfully] = useState(null);
    

    useEffect(() => {
        let ignore = false;

        if (!ignore) getProfiledata(); getQuotPreInfo();
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
        }
    }

    async function getQuotPreInfo() {

        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/QuotPreInfo?DarId=${searchparams.get("id")}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            }
        );
        const Res = await res.json();
        if (Res.resCode === 200) {
            console.log(Res.resData);
            setPreQuotData(Res.resData);
            setProductData(Res.resData.productData);
            setContactPerson(Res.resData.contactPerson);
        }
    }

    async function SubmitQuotationForm() {
        console.log(ProductData);
        let pageData = {
            DarId : Number(searchparams.get("id")),
            VerticalId :Number(Vertical),
            ContactPersonName : Salutation,
            KindAttention : ContactPerson,
            Subject : Subject,
            valedictions : Faithfully,
            IsTendar : Formype == 3 ? true : false,
            Emdamount : Number(Amount) ,
            EmdpaymentMode : Number(PaymentMode),
            EmdbankName: BankName,
            EmdcheqDddate : CheckDate,
            EmdcheqDdno : ChequeDDNo,
            EmdbankTransactionDate : BankTransactionDate,
            EmdbankTransactionId : BankTransactionID,
            TendarNo : TenderNo,
            TenderDate : BankTenderDate,
            quotProducts : ProductData
            //  const num1 = parseInt(stringValue, 10);
    // setNumberValue(num1);
        }
console.log(pageData);
        const res = await fetch(
            `${localStorage.getItem("BaseUrl")}/ISR/SubmitQuotation`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
                },
            body: JSON.stringify(pageData),
            }
        );
        const Res = await res.json();
        if (Res.resCode === 200) {
            console.log(Res.resData);
        }
    }

    const CheqTareek = (date) => {
        console.log(date);
        setCheckDate(date);
    };


    const TransactionTareek = (date) => {
        console.log(date);
        setBankTransactionDate(date);
    };


    const TenderTareek = (date) => {
        console.log(date);
        setBankTenderDate(date);
    };
    
    const NavBack = () => {
        navigate(-1);
    };


    return (
        <div>
            <AppHeader data={ProfileData} />

            <div className="breadcrumb-area">
                <div className="container-fluid">
                    <div className="row pt-1 pb-1">
                        <div className="col-md-6">
                            <nav aria-label="breadcrumb">
                                <h2>Quotation Form</h2>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                                <li className="breadcrumb-item"><a href="/Dashboard">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Quotation Form</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="containner p-4"
                style={{ height: "80vh", overflow: "auto", backgroundColor: "#f3f5f9" }}
            >
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bg-boxshadow">
                            <div className="ibox-content">
                                <div class="box-body">
                                    <table border="0" cellpadding="2" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="right">
                                                <img src={logo2} width="133" height="65" border="0" alt="TechLabs" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ fontSize: "14px" }} align="right">{PreQuotData.todayDate}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: "20px", fontSize: "14px", paddingTop: "20px" }}>
                                                <table border="0" cellspacing="0" cellpadding="2">
                                                    <tr>
                                                        <td>
                                                            <strong>Vertical:</strong>
                                                        </td>
                                                        <td>
                                                            <select
                                                                onChange={(e) => { setVertical(e.target.value); console.log(Vertical); }}
                                                                style={{ width: "300px", height: "20px", paddingLeft: "5px" }}
                                                            >
                                                                <option value={0}>Select</option>
                                                                <option value={1}>ASG</option>
                                                                <option value={2}>ISG</option>
                                                                <option value={3}>PSG</option>
                                                                <option value={4}>Corporate</option>
                                                                <option value={5}>Support Staff</option>
                                                                <option value={6}>ESG</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b>To,</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input
                                                    style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                    onChange={(e) => setSalutation(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <b fontSize="14px">{PreQuotData.custName}</b><br></br>
                                                <b fontSize="14px">{PreQuotData.custAddress}</b><br></br>
                                                <b fontSize="14px">{PreQuotData.custCity}</b><br></br>
                                                <b fontSize="14px">{PreQuotData.custState}</b><br></br>
                                                <b fontSize="14px">{PreQuotData.custCountry} , {PreQuotData.custZip}</b><br></br>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingTop: '30px' }}>
                                                <table border="0" cellpadding="0" cellspacing="0" width="600" align="left">
                                                    <tr height="30px;">
                                                        <td width="199px">
                                                            <b>Kind Attention:</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={ContactPerson}
                                                                style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                                onChange={(e) => setContactPerson(e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr height="30px;" paddingTop="0">
                                                        <td width="199px">
                                                            <b>Subject:</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ width: '300px', height: '20px', paddingLeft: '5px' }}
                                                                onChange={(e) => setSubject(e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingTop: '20px', paddingBottom: "20px" }}>
                                                <strong>
                                                    <b>Dear Sir / Mam,</b>
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                At the outset, we thank you for giving us an opportunity to serve your organization.
                                                Trident Techlabs Limited is a multifaceted engineering and design solution company with
                                                pan India present having partnership with global technology leaders.<br></br>
                                                As desired please find below our proposal as per your requirement:
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ textAlign: "center", height: "20px" }}></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Option 1
                                                <table style={{ width: "100%" }}>
                                                    <tr style={{ whiteSpace: "nowrap" }}>
                                                        <th>SNo</th>
                                                        <th>Description</th>
                                                        <th>Quantity</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                    {(ProductData == null) ? <></> : (ProductData.map((e, index) => (
                                                        <tr style={{ whiteSpace: "nowrap" }}>
                                                            <th>
                                                                <input
                                                                    value={e.sNo}
                                                                    style={{ width: '50px', height: '20px', paddingLeft: '5px' }}
                                                                    onChange={(m) => {
                                                                        setProductData(() => {
                                                                            let selectedProduct = [...ProductData];
                                                                            selectedProduct[index] = {
                                                                                ...selectedProduct[index],
                                                                                sNo: m.target.value
                                                                            }
                                                                            return selectedProduct;
                                                                        }
                                                                        ); console.log(ProductData);
                                                                    }}
                                                                    disabled
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    value={e.description}
                                                                    style={{ width: '500px', height: '20px', paddingLeft: '5px' }}
                                                                    onChange={(m) => {
                                                                        setProductData(() => {
                                                                            let selectedProduct = [...ProductData];
                                                                            selectedProduct[index] = {
                                                                                ...selectedProduct[index],
                                                                                description: m.target.value
                                                                            }
                                                                            return selectedProduct;
                                                                        }
                                                                        ); console.log(ProductData);
                                                                    }}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                type="number"
                                                                    value={e.quantity}
                                                                    style={{ width: '70px', height: '20px', paddingLeft: '5px' }}
                                                                    onChange={(m) => {
                                                                        setProductData(() => {
                                                                            let selectedProduct = [...ProductData];
                                                                            selectedProduct[index] = {
                                                                                ...selectedProduct[index],
                                                                                quantity: m.target.value
                                                                            }
                                                                            return selectedProduct;
                                                                        }
                                                                        ); console.log(ProductData);
                                                                    }}
                                                                />
                                                            </th>
                                                            <th><input
                                                            type="number"
                                                                value={e.amount}
                                                                style={{ width: '90px', height: '20px', paddingLeft: '5px' }}
                                                                onChange={(m) => {
                                                                    setProductData(() => {
                                                                        let selectedProduct = [...ProductData];
                                                                        selectedProduct[index] = {
                                                                            ...selectedProduct[index],
                                                                            amount: m.target.value
                                                                        }
                                                                        return selectedProduct;
                                                                    }
                                                                    ); console.log(ProductData);
                                                                }}
                                                            /></th>
                                                        </tr>
                                                    ))
                                                    )}

                                                </table>

                                            </td>
                                        </tr>
                                        <tr align="center">
                                            <td style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                                                <strong><u>Terms and Conditions</u> </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <QuotTC />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingTop: "40px" }}>
                                                <table border="0" width="700" cellpadding="3" cellspacing="0" style={{ textAlign: "left" }}>
                                                    <tr>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Form Type</b>
                                                        </td>
                                                        <td>
                                                            <select
                                                                onChange={(e) => { setFormype(e.target.value); console.log(Formype); }}
                                                                style={{ width: "200px", height: "25px", paddingLeft: "5px" }}
                                                            >
                                                                <option value={0}>Select</option>
                                                                <option value={1}>Quotation</option>
                                                                <option value={2}>Tender</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Amount</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={Amount}
                                                                style={{ width: '200px', height: '25px', paddingLeft: '5px' }}
                                                                onChange={(e) => setAmount(e.target.value)}
                                                            />
                                                        </td>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Payment Mode</b>
                                                        </td>
                                                        <td>
                                                            <select
                                                                onChange={(e) => { setPaymentMode(e.target.value); console.log(Formype); }}
                                                                style={{ width: "200px", height: "25px", paddingLeft: "5px" }}
                                                            >
                                                                <option value={0}>Select</option>
                                                                <option value={2}>Cheque</option>
                                                                <option value={3}>DD</option>
                                                                <option value={4}>Bank Transfer</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Bank Name</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={Amount}
                                                                style={{ width: '200px', height: '25px', paddingLeft: '5px' }}
                                                                onChange={(e) => setBankName(e.target.value)}
                                                            />
                                                        </td>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Cheque Date</b>
                                                        </td>
                                                        <td>
                                                            <Space >
                                                                <DatePicker style={{ width: "100%" }} onChange={CheqTareek} />
                                                            </Space>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Cheque DD No.</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={ChequeDDNo}
                                                                style={{ width: '200px', height: '25px', paddingLeft: '5px' }}
                                                                onChange={(e) => setChequeDDNo(e.target.value)}
                                                            />
                                                        </td>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Bank Transaction Date</b>
                                                        </td>
                                                        <td>
                                                            <Space >
                                                                <DatePicker style={{ width: "100%" }} onChange={TransactionTareek} />
                                                            </Space>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Bank Transaction ID</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={BankTransactionID}
                                                                style={{ width: '200px', height: '25px', paddingLeft: '5px' }}
                                                                onChange={(e) => setBankTransactionID(e.target.value)}
                                                            />
                                                        </td>
                                                        <td style={{ width: "600px" }}>
                                                            <b >Tender No.</b>
                                                        </td>
                                                        <td>
                                                            <input
                                                                value={TenderNo}
                                                                style={{ width: '200px', height: '25px', paddingLeft: '5px' }}
                                                                onChange={(e) => setTenderNo(e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td style={{ width: "600px" }}>
                                                            <b >Tender Date</b>
                                                        </td>
                                                        <td>
                                                            <Space >
                                                                <DatePicker style={{ width: "100%" }} onChange={TenderTareek} />
                                                            </Space>
                                                        </td>
                                                    </tr>

                                                </table>
                                            </td>
                                        </tr>
                                        <tr align="left">
                                            <td style={{ paddingTop: "30px", paddingBottom: "10px" }}>
                                                <strong><u>Kindly place your order to:</u> </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    Trident Techlabs Limited <br></br>
                                                    White House, 2nd Floor<br></br>
                                                    1/18-20 Rani Jhansi Road<br></br>
                                                    New Delhi – 110055
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Any changes in statutory policies of the government towards the
                                                     import of quoted items & Fluctuations in foreign exchange rates etc.
                                                      will be taken into consideration at the time of delivery & will have to be adjusted accordingly.
                                                 </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>We sincerely believe that our quotation is in accordance 
                                                     your requirements and will merit your kind approval. However,
                                                      in case you need any further information or clarification in this regard,
                                                       please feel free to contact us.
                                                 </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Thanking you and assuring you of our best services at all times,
                                                 </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{paddingTop: "40px"}}>
                                                <table cellpadding="2" cellspacing="0" width="100%">
                                                    <tr>
                                                        <td>
                                                            <b>Yours faithfully,</b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>For TRIDENT TECHLABS PVT. LTD. </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                        <input
                                                                value={Faithfully}
                                                                style={{ width: '200px', height: '25px', paddingLeft: '5px' }}
                                                                onChange={(e) => setFaithfully(e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{paddingTop: "50px"}}>
                                                <hr noshade style={{width: "auto"}} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" style={{textAlign: "center"}}>
                                                    <tr>
                                                        <td>
                                                            <b>
                                                                Trident Techlabs Pvt. Ltd.,&nbsp;White House, 1/18-20, Rani Jhansi Road, New Delhi - 110055 (India)
                                                            </b>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <b>
                                                                Tel:
                                                                +91-11-41118800,  +91-11-41118830 Email: delhi@tridenttechlabs.com, www.tridenttechlabs.com
                                                            </b>

                                                        </td>
                                                    </tr>
                                                    
                                            </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="box-footer">
                                    <center style={{ padding: "10px" }}>
                                        <button
                                            className="FunctionButton"
                                            style={{ backgroundColor: "#0b2087" }}
                                            onClick={SubmitQuotationForm}
                                        >
                                            + ADD
                                        </button>
                                        <button
                                            className="FunctionButton"
                                            style={{ backgroundColor: "#e8d105", color: "black" }}
                                            onClick={NavBack}
                                        >
                                            Back
                                        </button>

                                    </center>
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
