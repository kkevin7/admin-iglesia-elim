import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
//components
import ContainerHeader from "components/ContainerHeader/index";
import CardProducto from "./CardProducto";

class BookStore extends Component {
  state = {};

  render() {
    const {productos} = this.props;
    // console.log(productos);

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

const mapStateToProps = ({ producto }) => {
  const productos = producto;
  return productos;
};

export default withRouter(connect(mapStateToProps)(BookStore));
