import React, { Component, useState } from "react";
import {Carousel,CarouselItem,CarouselControl,CarouselIndicators,CarouselCaption } from "reactstrap";
import { UncontrolledCarousel } from 'reactstrap';

const items = [
    {
      src: require('assets/images/iglesia/foto1.jpg'),
      altText: 'Slide 1',
      caption: 'Slide 1',
      header: 'Slide 1 Header',
      key: '1'
    },
    {
      src: require('assets/images/iglesia/foto2.jpg'),
      altText: 'Slide 2',
      caption: 'Slide 2',
      header: 'Slide 2 Header',
      key: '2'
    },
    {
      src: require('assets/images/iglesia/foto3.jpg'),
      altText: 'Slide 3',
      caption: 'Slide 3',
      header: 'Slide 3 Header',
      key: '3'
    }
  ];

const CarouselImg = () => {

  return (
    <div className="row mb-md-3">
      <div className="col-lg-12">
        <div className="jr-card">
          <h3 class="card-heading">
            <span>Bienvenido</span>
          </h3>
          <div class="sub-heading">
            <div>
              <span>Te presentamos el sistema administrativo</span>
            </div>
          </div>
          <div className="jr-card-body">
          <UncontrolledCarousel items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselImg;
