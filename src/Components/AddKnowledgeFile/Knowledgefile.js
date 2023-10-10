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
        "https://localhost:44388/KnowledgeShare/KFUpload",
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
      <button class="FunctionButton" data-toggle="modal" data-placement="top" data-target=".bd-example-modal2-lg" style={{ backgroundColor: "#05870c" , border:"none" }} >+ADD</button>
      <div class="modal fade bd-example-modal2-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header" >

              <button type="button" class="close" data-dismiss="modal" onClick={reset} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form onSubmit={handleSubmit} >
                <div class="col-lg-12">
                  <div class="form-group d-flex">
                    <label for="inputEmail3" class="col-md-5 mt-1">Document Type <span class="pull-right">:</span></label>
                    <div class="col-md-7">
                      <input 
                          placeholder={"DocumentType"} 
                          value={DocumentType}
                          onChange={(e) => setDocumentType(e.target.value)}
                          class="form-control" 
                          required/>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group d-flex">
                    <label for="inputEmail3" class="col-md-5 mt-1">Subject <span class="pull-right">:</span></label>
                    <div class="col-md-7">
                      <input 
                            placeholder={"Subject"} 
                            value={Subject}
                            onChange={(e) => setSubject(e.target.value)}
                            class="form-control"
                            required/>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group d-flex">
                    <label for="inputEmail3" class="col-md-5 mt-1">Description <span class="pull-right">:</span></label>
                    <div class="col-md-7">
                      <input 
                            placeholder={"Description"} 
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            class="form-control" 
                            required/>
                    </div>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="form-group d-flex">
                    <label for="inputEmail3" class="col-md-5 mt-1">File <span class="pull-right">:</span></label>
                    <div class="col-md-7">
                      <input 
                            type='file'
                            name='filename'
                            required/>
                    </div>
                  </div>
                </div>


                <button type="button" style={{marginRight:"10px"}} class="btn btn-secondary" data-dismiss="modal" onClick={reset}>Close</button>
              <a  ><button type="submit" style={{border:"none"}} class="btn btn-primary">Upload</button></a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>



  )
}
