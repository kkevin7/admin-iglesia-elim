import React, { Component } from "react";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
//Components
import FormUsuario from "./FormUsuario";
import Spinner from "components/Spinner/Spinner";
//Redux
import { editUser } from "actions/authActions";
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

class EditarUsuario extends Component {
  state = {};

  handleEditUser = usuario => {
    const { editUser, history } = this.props;
    editUser(usuario).then(() => {
        history.push(`/app/detalleUsuario/${this.props.match.params.id}`);
    });
  };

  redirectGoBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { usuario } = this.props;
    if (!usuario) return <Spinner />;

    return (
      <div className="app-wrapper">
          <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
          <h2 className="title mb-3 mb-sm-0">Modificar Usuario</h2>
          <Button
            variant="contained"
            className="my-1 bg-cyan text-white"
            startIcon={<ArrowBackIcon />}
            onClick={() => this.redirectGoBack()}
          >
            VOLVER
          </Button>
        </div>
        <FormUsuario usuario={usuario} actionComponent={this.handleEditUser} correo={false} />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    usuario: firestore.ordered.usuario && firestore.ordered.usuario[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editUser: async usuario => dispatch(editUser(usuario))
  };
};

export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => {
      return [
        {
          collection: "usuarios",
          doc: props.match.params.id,
          storeAs: "usuario"
        }
      ];
    })
  )(EditarUsuario)
);
