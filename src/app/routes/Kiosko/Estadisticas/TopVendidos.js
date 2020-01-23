import React, { Fragment } from "react";
//Images
import imgProducto from 'assets/images/dashboard/producto2.png';

const TopVendidos = () => {
  return (
    <Fragment>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="jr-card jr-card-widget jr-card-ticketlist card">
          <div className="d-flex flex-row mb-3">
            <h4 className="mb-1">Top de Ventas</h4>
          </div>
          <div className="media jr-task-list-item flex-nowrap">
            <div className="MuiAvatar-root mr-3 size-36">
              <img src={imgProducto} className={`MuiAvatar-img`} />
            </div>
            <div className="media-body jr-task-item-content">
              <div className="jr-task-item-content-left">
                <h5 className="text-truncate jr-task-item-title mb-1">
                  Need a quick support on setting
                </h5>
                <p className="text-grey jr-fs-sm mb-0">
                  <span className="jr-link">Joy Parish</span> created ticket 15 mins
                  ago
                </p>
              </div>
              {/* <div className="jr-task-item-content-right">
                <span className="jr-nonhover">
                  <i className="zmdi zmdi-circle jr-fs-sm text-warning"></i>
                </span>
                <span className="badge jr-hover mb-0 text-white badge-warning">
                  High
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopVendidos;
