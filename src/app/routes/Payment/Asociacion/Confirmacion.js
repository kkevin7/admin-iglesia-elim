import React, { Component } from "react";
//Components
import FichaSocio from "./FichaSocio";
import FichaPago from './FichaPago';

class Confirmacion extends Component {
  state = {};
  render() {
    return (
      <div className="col-12">
          <div className="col-12">
              <h2 className="text-center text-uppercase">Confirmar Asoción a la Iglesia</h2>
          </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
            <FichaSocio socio={this.props.socio}/>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
            <FichaPago pago={this.props.pago}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirmacion;
