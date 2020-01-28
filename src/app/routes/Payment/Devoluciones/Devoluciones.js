import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";

import Button from "@material-ui/core/Button";
//Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from '@material-ui/icons/Send';
//Components
import Spinner from "components/Spinner/Spinner";
import DataTableDevoluciones from "./DataTableDevoluciones";

class Devoluciones extends Component {
  state = {};

  redirectGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  redirectRealizarDevolucion = () => {
    const { history } = this.props;
    history.push(`/app/realizarDevolucion`);
  };

  render() {
    const { devoluciones } = this.props;
    if (!devoluciones) return <Spinner />;

    return (
      <div className="app-wrapper">
        <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
          <h2 className="title mb-3 mb-sm-0">Devoluciones</h2>
          <Button
            variant="contained"
            className="my-1 bg-cyan text-white"
            startIcon={<ArrowBackIcon />}
            onClick={() => this.redirectGoBack()}
          >
            VOLVER
          </Button>
        </div>
        <Button
          variant="contained"
          className="my-1 bg-primary text-white mb-4"
          startIcon={<SendIcon />}
          onClick={() => this.redirectRealizarDevolucion()}
        >
          Realizar Devolución
        </Button>
        <DataTableDevoluciones devoluciones={devoluciones} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    devoluciones: firestore.ordered.devoluciones
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect([
      {
        collection: "devoluciones"
      }
    ])
  )(Devoluciones)
);
