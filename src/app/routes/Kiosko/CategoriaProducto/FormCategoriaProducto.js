import React, { Fragment, Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
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
import Typography from "@material-ui/core/Typography";
//Icons
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class FormCategoriaProducto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: !props.categoria_producto ? "" : props.categoria_producto.nombre,
      descripcion: !props.categoria_producto
        ? ""
        : props.categoria_producto.descripcion,
      estado: !props.categoria_producto ? true : props.categoria_producto.estado
    };
  }

  componentWillReceiveProps(nextProps) {
    const { categoria_producto } = nextProps;
    if (categoria_producto) {
      this.setState({
        nombre: categoria_producto ? "" : categoria_producto.nombre,
        descripcion: categoria_producto ? "" : categoria_producto.descripcion,
        estado: categoria_producto ? true : categoria_producto.estado
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.actionForm(this.state);
  };

  handleVolver = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    let classSelectEstado = "col-md-4 col-12 ";
    if (!this.props.proveedor) {
      classSelectEstado += "d-none";
    }

    return (
      <Fragment>
        <Button
          className="mb-4 text-white bg-teal"
          variant="contained"
          onClick={this.handleVolver}
          startIcon={<ArrowBackIcon />}
          type="submit"
        >
          Volver
        </Button>
        <div className="jr-card-header ">
          <Typography variant="h5" className="text-center font-weight-bold">
            CATEGORÍA DE PRODUCTOS
          </Typography>
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
                    label="Nombre de la Categoría"
                    onChange={this.handleChange}
                    value={this.state.nombre}
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="col-md-8 col-12">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <TextField
                    required
                    name="descripcion"
                    id="outlined-required"
                    label="Descripción"
                    onChange={this.handleChange}
                    value={this.state.descripcion}
                    variant="outlined"
                    multiline
                    // rows="4"
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
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  type="submit"
                >
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

export default withRouter(FormCategoriaProducto);
