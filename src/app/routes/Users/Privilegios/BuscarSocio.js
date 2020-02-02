import React from 'react';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Reducer
import { buscarSocioCarnet } from "actions/realizarPagoActions";

import { Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

//Components
import FichaSocio from "app/routes/Payment/Asociacion/FichaSocio";

const BuscarSocio = () => {
    return ( 
        <div>
            
        </div>
     );
}
 
export default BuscarSocio;