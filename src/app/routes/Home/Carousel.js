import React, { Component, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
//Card
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Images
import image1 from "assets/images/iglesia/foto1.jpg";
import image2 from "assets/images/iglesia/foto2.jpg";
import image3 from "assets/images/iglesia/foto3.jpg";

const CarouselImg = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <div className="row">
      <div className="col-12">
        <Card>
          <CardContent>
            <h3 className="card-heading">
              <span>Bienvenido</span>
            </h3>
            <div className="sub-heading">
              <div>
                <span>Te presentamos el sistema administrativo</span>
              </div>
            </div>
            <Carousel
              activeIndex={index}
              direction={direction}
              onSelect={handleSelect}
            >
              <Carousel.Item>
                <img className="d-block w-100" src={image1} alt="First slide" />
                <Carousel.Caption>
                  <h3>Te damos la bienvenida</h3>
                  <p>Espero pases de una mejores experiencias espirituales.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={image2}
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h3>Convive con muchos de nuestros hermanos</h3>
                  <p>Conocé lo maravilloso de adorar al señor.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img className="d-block w-100" src={image3} alt="Third slide" />

                <Carousel.Caption>
                  <h3>Te resivimos con los brazoas abiertos</h3>
                  <p>Te ayudaremos de la mejor manera.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarouselImg;
