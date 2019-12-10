import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
//components
import ContainerHeader from "components/ContainerHeader/index";
import CardProducto from "./CardProducto";
import { fromArray } from "@amcharts/amcharts4/.internal/core/utils/Iterator";

class BookStore extends Component {
    render(){
      const {productos} = this.props;

      return (
        <div className="app-wrapper">
          <ContainerHeader match={this.props.match} title="Librería" />
          <div className="jr-entry-header">
            <h3 className="entry-heading">
              <span>Productos del Kiosko</span>
            </h3>
          </div>
          <div className="row mb-md-3">
              {productos && productos.map((producto, index) => {
                  return(
                      <CardProducto key={index} producto={producto} />
                  );
              })}
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
  // console.log(state.firestore.ordered.productos);
  // const productos = producto;
  // return productos;
  return {
    productos: state.firestore.ordered.productos
  }
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'productos' }
    ])
    )(BookStore));
