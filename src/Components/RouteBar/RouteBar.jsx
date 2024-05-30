import React from 'react'

function RouteBar({ heading }) {
  return (
    <div className="breadcrumb-area">
        <div className="container-fluid">
          <div className="row pt-1 pb-1">
            <div className="col-md-6">
              <nav aria-label="breadcrumb">
                <h2>{heading}</h2>
              </nav>
            </div>
            <div className="col-md-6">
              <ol className="breadcrumb d-flex justify-content-end bg-transparent">
                <li className="breadcrumb-item">
                  <a href="/Dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  { heading }
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
  )
}

export default RouteBar
