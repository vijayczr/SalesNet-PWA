import React, { useState} from 'react'
import "../AddKnowledgeFile/Knowledgefile.css"

export default function Knowledgefile() {
  const [DocumentType, setDocumentType] = useState("");
  const [Subject, setSubject] = useState("");
  const [Description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    KFUpload();
  }

  async function KFUpload() {

      let formData = new FormData();
      formData.append("DocumentType", DocumentType);
      formData.append("Subject", Subject);
      formData.append("Description", Description);
      console.log(formData);
      var Filedata = document.querySelector('input[type="file"]').files[0];
      formData.append("File", Filedata);
      console.log(formData);
      const res = await fetch(
        `${localStorage.getItem("BaseUrl")}/KnowledgeShare/KFUpload`,
        {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("JwtToken")}`
            },
        }
        );
      const response = await res.json();
      if(response.resCode === 200) {
        console.log(response.resData);
        alert("Success");
      }
      else {
        alert(response.resMessage);
      }


  }

  async function reset(){
    setDocumentType("");
    setSubject("");
    setDescription("");
  }

  return (
    <>
      <button className="FunctionButton" data-toggle="modal" data-placement="top" data-target=".bd-example-modal2-lg" style={{ backgroundColor: "#05870c" , border:"none" }} >+ADD</button>
      <div className="modal fade bd-example-modal2-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header" >

              <button type="button" className="close" data-dismiss="modal" onClick={reset} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit} >
                <div className="col-lg-12">
                  <div className="form-group d-flex">
                    <label for="inputEmail3" className="col-md-5 mt-1">Document Type <span className="pull-right">:</span></label>
                    <div className="col-md-7">
                      <input 
                          placeholder={"DocumentType"} 
                          value={DocumentType}
                          onChange={(e) => setDocumentType(e.target.value)}
                          className="form-control" 
                          required/>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group d-flex">
                    <label for="inputEmail3" className="col-md-5 mt-1">Subject <span className="pull-right">:</span></label>
                    <div className="col-md-7">
                      <input 
                            placeholder={"Subject"} 
                            value={Subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="form-control"
                            required/>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group d-flex">
                    <label for="inputEmail3" className="col-md-5 mt-1">Description <span className="pull-right">:</span></label>
                    <div className="col-md-7">
                      <input 
                            placeholder={"Description"} 
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-control" 
                            required/>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group d-flex">
                    <label for="inputEmail3" className="col-md-5 mt-1">File <span className="pull-right">:</span></label>
                    <div className="col-md-7">
                      <input 
                            type='file'
                            name='filename'
                            required/>
                    </div>
                  </div>
                </div>


                <button type="button" style={{marginRight:"10px"}} className="btn btn-secondary" data-dismiss="modal" onClick={reset}>Close</button>
              <a  ><button type="submit" style={{border:"none"}} className="btn btn-primary">Upload</button></a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>



  )
}
