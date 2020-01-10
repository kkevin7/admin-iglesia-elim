import React, { Component } from "react";

//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import StepperAsociacion from "./StepperAsociacion";
//Stepper
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Asociacion extends Component {
  state = {};

  render() {
    return (
      <div className="app-wrapper">
        <StepperAsociacion />
      </div>
    );
  }
}

export default Asociacion;
