import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

class FormProveedor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: !props.proveedor ? "" : props.proveedor.nombre,
      apellido: "",
      telefono: "",
      empresa: "",
      estado: !props.proveedor ? true : props.proveedor.estado
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createProveedor(this.state);
  };

  render() {
    let classSelectEstado = "col-md-4 col-12 ";
    if (!this.props.proveedor) {
      classSelectEstado += "d-none";
    }

    return (
      <Fragment>
        <div className="jr-card-header ">
          <h3 className="card-heading">DATOS DEL PROVEEDOR</h3>
        </div>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="col-12">
            <div className="row">
              <div className="col-md-4 col-12">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <TextField
                    required
                    name="nombre"
                    id="outlined-required"
                    label="Nombre"
                    onChange={this.handleChange}
                    value={this.state.nombre}
                    //   defaultValue={""}
                    //   variant="outlined"
                  />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <TextField
                    required
                    name="apellido"
                    id="outlined-required"
                    label="Apellido"
                    onChange={this.handleChange}
                    value={this.state.apellido}
                    //   defaultValue={""}
                    //   variant="outlined"
                  />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <FormControl>
                    <InputLabel htmlFor="telefono">
                      Número de Teléfono
                    </InputLabel>
                    <Input
                      required
                      value={this.state.telefono}
                      onChange={this.handleChange}
                      id="telefono"
                      name="telefono"
                      // defaultValue={""}
                      inputComponent={TextMaskCustom}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <TextField
                    name="empresa"
                    id="outlined-required"
                    label="Empresa"
                    //   defaultValue={""}
                    value={this.state.empresa}
                    onChange={this.handleChange}
                    //   variant="outlined"
                  />
                </div>
              </div>
              <div className={classSelectEstado}>
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Estado
                    </InputLabel>
                    <Select
                      labelId="estado-label"
                      id="estado"
                      name="estado"
                      // defaultValue={true}
                      value={this.state.estado}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={true}>Activo</MenuItem>
                      <MenuItem value={false}>Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-12 my-4">
                <Button variant="contained" color="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default FormProveedor;
