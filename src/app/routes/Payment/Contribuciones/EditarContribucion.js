import React, { Component } from "react";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
//Redux
import {
  editarContribucion,
  editarCuotas
} from "actions/contribucionesActions";
//Inputs
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import MaskedInput from "react-text-mask";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
//calendar
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
//Componets
import { CardContent } from "@material-ui/core";
import Spinner from "components/Spinner/Spinner";
import FormContribucion from "app/routes/Payment/Contribuciones/FormContribucion";
//Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";

class EditarContribucion extends Component {
  state = {};

  componentDidMount() {
      
  }

  redirectGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  actionComponent = async contrubucionEdit => {
    const { cuotas, history, editarContribucion, editarCuotas } = this.props;
    let editCuotas = await cuotas.map(cuota => {
      cuota.valor = Number(contrubucionEdit.valor_cuota.toFixed(2));
      cuota.saldo_actualizado = Number(contrubucionEdit.valor_cuota.toFixed(2));
      return cuota;
    });
    // Modificar Contribucion
    await editarContribucion(contrubucionEdit);
    // Modificar Cuotas
    await editCuotas.forEach(async cuota => {
      await editarCuotas(cuota);
    });
    // Redireccionar
    await history.push(`/app/detalleContribucion/${contrubucionEdit.id}`);
  };

  render() {
    const { contribucion } = this.props;
    if (
      !contribucion ||
      !contribucion.id_contribucion == this.props.match.params.id_contribucion
    )
      return <Spinner />;

    return (
      <div className="app-wrapper">
        <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
          <h2 className="title mb-3 mb-sm-0">Modificación de Contribución</h2>
          <Button
            variant="contained"
            className="my-1 bg-cyan text-white"
            startIcon={<ArrowBackIcon />}
            onClick={() => this.redirectGoBack()}
          >
            VOLVER
          </Button>
        </div>
        <FormContribucion
          contribucion={contribucion}
          actionComponent={this.actionComponent}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    contribucion:
      firestore.ordered.contribucion && firestore.ordered.contribucion[0],
    cuotas: firestore.ordered.cuotas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editarContribucion: async contribucion =>
      dispatch(editarContribucion(contribucion)),
    editarCuotas: async cuotas => dispatch(editarCuotas(cuotas))
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
          collection: "contribuciones",
          doc: props.match.params.id_contribucion,
          storeAs: "contribucion"
        },
        {
          collection: "cuotas",
          where: [
            ["id_contribucion", "==", props.match.params.id_contribucion],
            ["estado", "==", "VIGENTE"]
          ],
          orderBy: ["fecha_inicio", "asc"]
        }
      ];
    })
  )(EditarContribucion)
);
