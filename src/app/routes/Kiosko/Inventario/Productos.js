import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import Spinner from '../../../../components/Spinner/Spinner';
import ContainerHeader from "components/ContainerHeader/index";
import CardProducto from "./CardProducto";
import CircularProgress from '@material-ui/core/CircularProgress';

class BookStore extends Component {

  render() {
    const { productos } = this.props;
    if (!productos) return <Spinner />;

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Librería" />
        <div className="jr-entry-header">
          <h3 className="entry-heading">
            <span>Productos del Kiosko</span>
          </h3>
        </div>
        <div className="row mb-md-3">
          {productos &&
            productos.map(producto => {
              return (
                <CardProducto
                 key={producto.id} 
                 producto={producto} 
                 />
              )
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({firestore}) => {
  return {
    productos: firestore.ordered.productos,
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(
      [
        { collection: "productos" },
        
      ]
      )
  )(BookStore)
);
