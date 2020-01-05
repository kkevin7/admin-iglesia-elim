import React, { Component } from "react";

//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import FormAsociacion from './FormAsociacion';
//Stepper
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Asociacion extends Component {
  state = {};

  render() {
    
    return (
      <div className="app-wrapper">
        {/* <ContainerHeader
          match={this.props.match}
          title="Asociacion de Usuarios"
        /> */}
        {/* <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card"> */}

              <FormAsociacion/>
                
            {/* </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Asociacion;
