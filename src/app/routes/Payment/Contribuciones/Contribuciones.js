import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Components
import TableMBContribuciones from "./TableMBContribuciones";
import TableContribuciones from './TableContribuciones';
import Spinner from "components/Spinner/Spinner";

class Contribuciones extends Component {
  state = {};
  render() {
    const { contribuciones } = this.props;
    if(!contribuciones) return <Spinner/>

    return (
      <div className="app-wrapper">
        <TableMBContribuciones contribuciones={contribuciones} />
        {/* <TableContribuciones/> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contribuciones: state.firestore.ordered.contribuciones
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: "contribuciones"
      }
    ])
  )(Contribuciones)
);
