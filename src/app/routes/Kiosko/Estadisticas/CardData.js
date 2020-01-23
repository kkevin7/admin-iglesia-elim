import React, { Component } from "react";

const CardData = ({ titulo, resultado, img, color }) => {
  return (
    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
      <div className={`jr-card jr-card-widget p-3 ${color} text-white card`}>
        <div className="media align-items-center flex-nowrap py-lg-2">
          <div className="mr-3">
            <img src={img} alt={img}/>
          </div>
          <div className="media-body">
            <h1 className="jr-fs-xxl jr-font-weight-black mb-1 text-white">
              {resultado.toString().padStart(2, "0")}
            </h1>
            <p className="mb-0 jr-fs-cp">{titulo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardData;
