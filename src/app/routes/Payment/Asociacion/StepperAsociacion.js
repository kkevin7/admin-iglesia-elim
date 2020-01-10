import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SweetAlert from "react-bootstrap-sweetalert";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//components
import BusquedaSocio from "./BusquedaSocio";
import EspeficarCuota from "./EspeficarCuota";
import Confirmacion from "./Confirmacion";
import Spinner from "components/Spinner/Spinner";

const useStyles = theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

class StepperAsociacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      socio: {},
      disableNext: true,
      pago: {},
      showAlert: true
    };
  }

  setUpSocio = socio => {
    this.setState({
      socio: socio
    });
  };

  setUpPago = pago => {
    this.setState({
      pago: pago
    });
  };

  disableNext = valor => {
    this.setState({
      disableNext: valor
    });
  };

  handleAlertClick = () => {
    this.setState({
      showAlert: false
    });
  };

  handleAgregarPago = () => {
    const { firestore, history } = this.props;
    const nuevaContribucion = {
      id_usuario: this.state.socio.id,
      valor_cuota: this.state.pago.valor_cuota,
      cantidad_cuota: this.state.pago.cantidad_cuota,
      fecha_inicio: this.state.pago.fecha_inicio,
      fecha_fin: this.state.pago.fecha_fin,
      fecha_ultimo_pago: null,
      saldo: 0,
      estado: true,
      observaciones: this.state.pago.observaciones
    };
    firestore.add(
      {
        collection: "contribuciones"
      },
      nuevaContribucion
    );
  };

  handleRedirect = () => {
    const { history } = this.props;
    history.push('/app/contribuciones');
  }

  getStepContent = stepIndex => {
    const { firestore } = this.props;
    if (!firestore) return <Spinner />;
    switch (stepIndex) {
      case 0:
        return (
          <BusquedaSocio
            firestore={firestore}
            setUpSocio={this.setUpSocio}
            disableNext={this.disableNext}
          />
        );
      case 1:
        return (
          <EspeficarCuota
            setUpPago={this.setUpPago}
            disableNext={this.disableNext}
          />
        );
      case 2:
        return <Confirmacion socio={this.state.socio} pago={this.state.pago} />;
      default:
        return "Unknown stepIndex";
    }
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();

    function getSteps() {
      return [
        "Buscar a la persona a asociar",
        "Espeficar cuota del socio",
        "Comfirmación"
      ];
    }

    const handleNext = () => {
      if (this.state.activeStep === steps.length - 2) {
        this.setState({
          activeStep: this.state.activeStep + 1
        });
      } else {
        this.setState({
          activeStep: this.state.activeStep + 1,
          disableNext: true
        });
      }
    };

    const handleBack = () => {
      this.setState({
        activeStep: this.state.activeStep - 1,
        disableNext: true
      });
    };

    const handleReset = () => {
      this.setState({
        activeStep: 0,
        showAlert: true
      });
    };

    return (
      <div className={classes.root}>
        <div className="row ">
          <div className="col-lg-12">
            <div className="jr-card">
              <Stepper activeStep={this.state.activeStep} alternativeLabel>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        </div>
        <div>
          {this.state.activeStep === steps.length ? (
            <div className="row mb-md-3">
              <div className="col-lg-12">
                <div className="jr-card">
                  <div>
                    <div className="col-12">
                      <Typography
                        variant="h4"
                        gutterBottom
                        className={`text-center ${classes.instructions}`}
                      >
                        Todos los pasos han sido completados
                      </Typography>
                    </div>
                    <SweetAlert
                      success
                      show={this.state.showAlert}
                      title="Nuevo socio agregado"
                      onConfirm={() => {
                        this.handleAlertClick();
                        this.handleRedirect();
                      }
                      }
                      onCancel={this.handleAlertClick}
                    >
                      Ahora podras ver sus aportaciones en su perfil
                    </SweetAlert>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row ">
              <div className="col-lg-12">
              <Card className="py-3">
                <CardContent>
                  <div>
                    {this.getStepContent(this.state.activeStep)}
                    <div>
                      <Button
                        disabled={this.state.activeStep === 0}
                        onClick={handleBack}
                        className={`${classes.backButton}`}
                        variant="contained"
                      >
                        ATRÁS
                      </Button>
                      <Button
                        disabled={this.state.disableNext}
                        variant="contained"
                        color="primary"
                        // className={`mx-auto`}
                        onClick={() => {
                          handleNext();
                          if (this.state.activeStep === steps.length - 1) {
                            this.handleAgregarPago();
                          }
                        }}
                      >
                        {this.state.activeStep === steps.length - 1
                          ? "CONFIRMAR"
                          : "SIGUIENTE"}
                      </Button>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(
  compose(
    connect(),
    firestoreConnect(),
    withStyles(useStyles)
  )(StepperAsociacion)
);
