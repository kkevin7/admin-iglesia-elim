import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Components
import BuscarSocioPago from "./BuscarSocioPago";
// Cards
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//Icons
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class RealizarPago extends Component {
  state = {};

  redirectContribucion = () => {
    const {history, socio} = this.props;
    history.push(`/app/contribucionesSocio/${socio.id}`)
  }

  render() {
    const { socio } = this.props;

    return (
      <div className="app-wrapper">
        <Card className="py-3">
          <BuscarSocioPago />
          <CardActions>
            <div className="col-12 text-center">
              {/* <Button
                disabled={socio.nombre ? false : true}
                className={`${
                  socio.nombre ? " bg-blue-grey" : ""
                } text-white m-1`}
                variant="contained"
                startIcon={<ArrowBackIcon />}
              >
                Atrás
              </Button> */}
              <Button
                disabled={socio ? false : true}
                className={`${socio ? " bg-cyan" : ""} text-white m-1`}
                variant="contained"
                startIcon={<ArrowForwardIcon />}
                onClick={this.redirectContribucion}
              >
                Continuar
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({realizarPago}) => {
  return {
    socio: realizarPago.socio && realizarPago.socio[0],
    noResultados: realizarPago.noResultados
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect()
  )(RealizarPago)
);
