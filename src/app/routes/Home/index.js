import React, { Component } from "react";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import CarouselImg from './Carousel'

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Página de Inicio" />
        <div className="d-flex justify-content-center">
          {/* <h1><IntlMessages id="pages.samplePage.description"/></h1> */}
        </div>

        <CarouselImg/>
      </div>
    );
  }
}

export default Home;
