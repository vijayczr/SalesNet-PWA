import React from 'react'
import "../AddKnowledgeFile/Knowledgefile.css"

export default function Knowledgefile() {
  const DocSearchReser = () => {
    window.location.reload();
  }

  return (
      <>
            <button class="FunctionButton" data-toggle="modal" data-placement="top" data-target=".bd-example-modal2-lg" style={{ backgroundColor: "#05870c" }} >+ADD</button>




            <div class="modal fade bd-example-modal2-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header" >

                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">
                  <div class="col-lg-12">
                    <div class="form-group d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Document Type <span class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input placeholder={"documentType"} class="form-control"  />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Subject <span class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input value={"subject"} class="form-control"  />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group d-flex">
                      <label for="inputEmail3" class="col-md-5 mt-1">Description <span class="pull-right">:</span></label>
                      <div class="col-md-7">
                        <input placeholder={"description"} class="form-control" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <a  ><button type="button" class="btn btn-primary">Download</button></a>
                </div>
              </div>
            </div>
          </div>
      </>



  )
}
