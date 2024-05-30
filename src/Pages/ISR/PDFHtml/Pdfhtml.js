import { useEffect, useState } from "react";
// import AppHeader from "../../../Components/Header/AppHeader";
import { useNavigate, useLocation } from "react-router-dom";
// import logo2 from "../../../assets/logo.png"
import QuotTC from "../../../Components/QuotT&C/QuotTC";
// import { renderToStaticMarkup, renderToString } from 'react-dom/server';
// import { DatePicker, ConfigProvider, Table, Select, Space } from "antd";
// import PdfViewer from "./PdfViewer";

export default function Pdfhtml() {
  // state
  const [, setProfileData] = useState("");
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();

  // const [PreQuotData, setPreQuotData] = useState("");
  // const [Vertical, setVertical] = useState(null);
  // const [Salutation, setSalutation] = useState(null);
  // const [ContactPerson, setContactPerson] = useState(null);
  // const [Subject, setSubject] = useState(null);
  // const [Respected, setRespected] = useState("Sir");
  // const [Statictext1, setStatictext1] = useState(null);
  // const [Statictext2, setStatictext2] = useState(null);
  // const [ProductData, setProductData] = useState(null);
  // const [Formype, setFormype] = useState(0);
  // const [Amount, setAmount] = useState(null);
  // const [PaymentMode, setPaymentMode] = useState(0);
  // const [BankName, setBankName] = useState(null);
  // const [CheckDate, setCheckDate] = useState(null);
  // const [ChequeDDNo, setChequeDDNo] = useState(null);
  // const [BankTransactionDate, setBankTransactionDate] = useState(null);
  // const [BankTransactionID, setBankTransactionID] = useState(null);
  // const [TenderNo, setTenderNo] = useState(null);
  // const [BankTenderDate, setBankTenderDate] = useState(null);
  // const [Faithfully, setFaithfully] = useState(null);
  const [html, setHtml] = useState("");

  useEffect(() => {
    getProfiledata();
    if (typeof document != "undefined") {
      const htmlBody = document.querySelector("body");
      const l1 = htmlBody.outerHTML.replace(/"/g, '\\"');
      const htmlString = l1.toString();
      console.log(htmlString);
      setHtml(htmlString);
    }
  }, []);

  useEffect(() => {
    async function quoteDownload(quotRefNo, htmlString) {
      console.log(quotRefNo, htmlString);
      let body = {
        QuotRefNo: String(quotRefNo),
        HtmlString: htmlString,
      };
      try {
        const req = await fetch(
          `${process.env.REACT_APP_BASE_URL}/ISR/QuotPdfGen`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
            },
            body: JSON.stringify(body),
          }
        );

        const res = await req.json();
        if (res.resCode === 200) {
          console.log(res);
          navigate("/QuotationList", {
            replace: true,
            state: {
              quotationId: quotRefNo,
            },
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    quoteDownload(state?.id, html);
  }, [html, navigate, state?.id]);

  async function getProfiledata() {
    const res = await fetch(
      `${localStorage.getItem("BaseUrl")}/Authentication/ProfileData`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        },
      }
    );
    const profileData = await res.json();
    if (profileData.resCode === 200) {
      console.log(profileData.resData);
      setProfileData(profileData.resData);
    }
  }

  // async function getQuotPreInfo() {

  //     const res = await fetch(
  //         `${localStorage.getItem("BaseUrl")}/ISR/QuotPreInfo?DarId=${searchparams.get("id")}`,
  //         {
  //             method: "GET",
  //             headers: {
  //                 Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
  //             },
  //         }
  //     );
  //     const Res = await res.json();
  //     if (Res.resCode === 200) {
  //         console.log(Res.resData);
  //         setPreQuotData(Res.resData);
  //         setProductData(Res.resData.productData);
  //         setContactPerson(Res.resData.contactPerson);
  //     }
  // }

  // const CheqTareek = (date) => {
  //     console.log(date);
  //     setCheckDate(date);
  // };

  // const TransactionTareek = (date) => {
  //     console.log(date);
  //     setBankTransactionDate(date);
  // };

  // const TenderTareek = (date) => {
  //     console.log(date);
  //     setBankTenderDate(date);
  // };

  // const NavBack = () => {
  //     navigate(-1);
  // };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="bg-boxshadow">
          <div className="ibox-content">
            <div class="box-body">
              <table border="0" cellpadding="2" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <b>To,</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b fontSize="14px">{state.To}</b>
                    <br></br>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b fontSize="14px">{state.custName}</b>
                    <br></br>
                    <b fontSize="14px">{state.custAddress}</b>
                    <br></br>
                    <b fontSize="14px">{state.custCity}</b>
                    <br></br>
                    <b fontSize="14px">{state.custState}</b>
                    <br></br>
                    <b fontSize="14px">
                      {state.custCountry} , {state.custZip}
                    </b>
                    <br></br>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: "30px" }}>
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="600"
                      align="left"
                    >
                      <tr height="20px;">
                        <td width="199px">
                          <b>Kind Attention:</b>
                        </td>
                        <td>
                          <p style={{ marginTop: "10px" }}>
                            {state.KindAttention}
                          </p>
                        </td>
                      </tr>
                      <tr height="20px;" paddingTop="0">
                        <td width="199px">
                          <b>Subject:</b>
                        </td>
                        <td>
                          <p style={{ marginTop: "10px" }}>{state.Subject}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <strong>
                      <b>Dear Sir / Mam,</b>
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    At the outset, we thank you for giving us an opportunity to
                    serve your organization. Trident Techlabs Limited is a
                    multifaceted engineering and design solution company with
                    pan India present having partnership with global technology
                    leaders.<br></br>
                    As desired please find below our proposal as per your
                    requirement:
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", height: "20px" }}></td>
                </tr>
                <tr>
                  <td>
                    Option 1
                    <table
                      className="table"
                      style={{
                        width: "100%",
                        border: "solid",
                        borderCollapse: "collapse",
                      }}
                    >
                      <tr
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <th style={{ color: "white" }}>SNo</th>
                        <th style={{ color: "white" }}>Description</th>
                        <th style={{ color: "white", width: "100px" }}>
                          Quantity
                        </th>
                        <th style={{ color: "white", width: "100px" }}>
                          Amount
                        </th>
                      </tr>
                      {state.products == null ? (
                        <></>
                      ) : (
                        state.products.map((e, index) => (
                          <tr style={{ whiteSpace: "nowrap" }}>
                            <td style={{ border: "solid" }}>
                              {index + 1}
                            </td>
                            <td style={{ border: "solid" }}>
                              {e.description}
                            </td>
                            <td style={{ border: "solid" }}>
                              {e.quantity}
                            </td>
                            <td style={{ border: "solid" }}>
                              {e.amount}
                            </td>
                          </tr>
                        ))
                      )}
                    </table>
                  </td>
                </tr>
                <tr align="center">
                  <td style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                    <strong>
                      <u>Terms and Conditions</u>{" "}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <QuotTC />
                  </td>
                </tr>

                <tr align="left">
                  <td style={{ paddingTop: "30px", paddingBottom: "10px" }}>
                    <strong>
                      <u>Kindly place your order to:</u>{" "}
                    </strong>
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
                    <p>
                      Any changes in statutory policies of the government
                      towards the import of quoted items & Fluctuations in
                      foreign exchange rates etc. will be taken into
                      consideration at the time of delivery & will have to be
                      adjusted accordingly.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      We sincerely believe that our quotation is in accordance
                      your requirements and will merit your kind approval.
                      However, in case you need any further information or
                      clarification in this regard, please feel free to contact
                      us.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      Thanking you and assuring you of our best services at all
                      times,
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: "40px" }}>
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
                          <b>{state.valedictions}</b>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}