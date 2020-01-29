import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Components
import TableMBContribuciones from "./TableMBContribuciones";
import TableContribuciones from './TableContribuciones';
import DataTableContribuciones from "./DataTableContribuciones";
import Spinner from "components/Spinner/Spinner";

class Contribuciones extends Component {
  state = {};
  render() {
    const { contribuciones } = this.props;
    if(!contribuciones) return <Spinner/>

    console.log(contribuciones);

    return (
      <div className="app-wrapper">
        {/* <TableMBContribuciones contribuciones={contribuciones} /> */}
        <DataTableContribuciones contribuciones={contribuciones} />
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
        collection: "contribuciones",
        orderBy: ["fecha_inicio", "desc"]
      }
    ])
  )(Contribuciones)
);
