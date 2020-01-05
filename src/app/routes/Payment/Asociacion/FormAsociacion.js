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
//components
import BusquedaSocio from './BusquedaSocio';
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

class FormAsociacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      socio: {}
    };
  }

  render() {
    const { classes, firestore } = this.props;
    if(!firestore) return <Spinner/>

    function getSteps() {
      return [
        "Buscar a la persona a asociar",
        "Espeficar cuota del socio",
        "Comfirmación"
      ];
    }

    function getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0:
          return (
            <BusquedaSocio
            firestore={firestore}
            />
          );
        case 1:
          return "What is an ad group anyways?";
        case 2:
          return "This is the bit I really care about!";
        default:
          return "Unknown stepIndex";
      }
    }


    const steps = getSteps();

    const handleNext = () => {
      this.setState({
        activeStep: this.state.activeStep + 1
      });
    };

    const handleBack = () => {
      this.setState({
        activeStep: this.state.activeStep - 1
      });
    };

    const handleReset = () => {
      this.setState({
        activeStep: 0
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
                    <Typography className={classes.instructions}>
                      Todos los pasos han sido completados
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row mb-md-3">
              <div className="col-lg-12">
                <div className="jr-card">
                  <div>
                    {getStepContent(this.state.activeStep)}

                    <div>
                      <Button
                        disabled={this.state.activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                        variant="contained"
                      >
                        ATRÁS
                      </Button>
                      <Button
                        disabled={false}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {this.state.activeStep === steps.length - 1
                          ? "TERMINAR"
                          : "SIGUIENTE"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default 
withRouter(
  compose(
      connect(),
      firestoreConnect(),
      withStyles(useStyles)
  )
  
(FormAsociacion));
