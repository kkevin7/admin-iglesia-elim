import React, { Component } from "react";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
//Components
import ProfileHeader from "components/profile/ProfileHeader/index";
import Spinner from "components/Spinner/Spinner";
import CardDetalle from "./CardDetalle";
//Card
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@material-ui/core/FormControl";
//Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class DetalleUsuario extends Component {
  state = {};

  redirectGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { usuario } = this.props;
    if (!usuario) return <Spinner />;

    return (
      <div className="app-wrapper">
        <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
          <h2 className="title mb-3 mb-sm-0">Detalle de Usuario</h2>
          <Button
            variant="contained"
            className="my-1 bg-cyan text-white"
            startIcon={<ArrowBackIcon />}
            onClick={() => this.redirectGoBack()}
          >
            VOLVER
          </Button>
        </div>
        <CardDetalle usuario={usuario} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    usuario: firestore.ordered.usuario && firestore.ordered.usuario[0]
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
      if (!props.match.params.id) return [];
      return [
        {
          collection: "usuarios",
          where: [["carnet", "==", props.match.params.id]],
          storeAs: "usuario"
        }
      ];
    })
  )(DetalleUsuario)
);
