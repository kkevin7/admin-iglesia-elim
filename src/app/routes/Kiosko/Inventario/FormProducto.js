import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Redux
import { createProducto, uploadImageProducto } from "actions/productosActions";
//Inputs
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import imageDefault from "assets/images/products/product1.png";
//Components
import Spinner from "components/Spinner/Spinner";
//Icons
import SaveIcon from "@material-ui/icons/Save";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";



function MoneyFormatCustom(props) {
  const { inputRef, onChange, name, type, checked, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
            name,
            type,
            checked,
          },
        });
      }}
      thousandSeparator={true}
      isNumericString={true}
      allowNegative={false}
      prefix="$ "
      decimalScale={2}
    />
  );
}

MoneyFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, name, type, checked, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={async (values) => {
        onChange({
          target: {
            value: values.value,
            name,
            type,
            checked,
          },
        });
      }}
      thousandSeparator={true}
      isNumericString={true}
      allowNegative={false}
      decimalScale={0}
    />
  );
}

class FormProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.producto ? props.producto.id : "",
      nombre: props.producto ? props.producto.nombre : "",
      precio: props.producto ? props.producto.precio.toFixed(2) : "",
      existencia: props.producto ? props.producto.existencia : "",
      descripcion: props.producto ? props.producto.descripcion : "",
      estado: props.producto ? props.producto.estado : true,
      proveedor: props.producto
        ? props.producto.proveedor
        : props.proveedores
        ? props.proveedores.length > 0
          ? props.proveedores[0].id
          : ""
        : "",
      categoria_producto: props.producto
        ? props.producto.categoria_producto
        : props.categoria_producto
        ? props.categoria_producto.length > 0
          ? props.categoria_producto[0].id
          : ""
        : "",
      url: props.producto ? props.producto.url : "",
      file_id: props.producto ? props.producto.file_id : "",
      file: null,
      urlImage: "",
      uploadValue: 0,
      //Error
      nombre_error: false,
      existencia_error: false,
      precio_error: false,
      proveedor_error: false,
      categoria_producto_error: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { producto, proveedores, categoria_producto } = nextProps;
    if (producto) {
      this.setState({
        id: producto ? producto.id : "",
        nombre: producto ? producto.nombre : "",
        precio: producto ? producto.precio.toFixed(2) : "",
        existencia: producto ? producto.existencia : "",
        descripcion: producto ? producto.descripcion : "",
        estado: producto ? producto.estado : true,
        proveedor: producto
          ? producto.proveedor
          : proveedores
          ? proveedores.length > 0
            ? proveedores[0].id
            : ""
          : "",
        categoria_producto: producto
          ? producto.categoria_producto
          : categoria_producto
          ? categoria_producto.length > 0
            ? categoria_producto[0].id
            : ""
          : "",
        url: producto ? producto.url : "",
        file_id: producto ? producto.file_id : "",
        file: null,
        urlImage: "",
        uploadValue: 0
      });
    }
  }

  handleChangeFilds = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeError = e => {
    if (e.target.value) {
      this.setState({
        [e.target.name + "_error"]: false
      });
    } else {
      this.setState({
        [e.target.name + "_error"]: true
      });
    }
  };

  handleChangeNumber = e => {
    if (e.target.value) {
      this.setState({
        [e.target.name]: Math.floor(Number(e.target.value))
      });
    } else {
      this.setState({
        [e.target.name]: ""
      });
    }
  };

  handleChangeNumberError = e => {
    if (e.target.value > 0) {
      this.setState({
        [e.target.name + "_error"]: false
      });
    } else {
      this.setState({
        [e.target.name + "_error"]: true
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.actionSubmit(this.state);
  };

  handleVolver = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleImageClick = () => {
    this.inputElement.click();
  };

  handleSelectImage = e => {
    if (e.target.files.length > 0) {
      this.setState({
        file: e.target.files[0],
        urlImage: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  render() {
    const { proveedores, categoria_producto } = this.props;

    return (
      <Fragment>
        {/* <Button
                className="mb-4 text-white bg-teal"
                variant="contained"
                onClick={this.handleVolver}
                startIcon={<ArrowBackIcon />}
                type="submit"
              >
                Volver
              </Button>
              <div className="jr-card-header ">
                <h3 className="card-heading font-weight-bold text-center">
                  DATOS DEL PRODUCTO
                </h3>
              </div> */}
        <Card>
          <CardContent>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-3 col-12">
                  <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                    <Card onClick={this.handleImageClick}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="210"
                          image={
                            this.state.urlImage
                              ? this.state.urlImage
                              : this.state.url
                              ? this.state.url
                              : imageDefault
                          }
                          title="Contemplative Reptile"
                        />
                        {/* <Button 
                            className="mt-2 bg-info text-white" 
                            variant="contained" 
                            fullWidth 
                            component="label"
                            > */}
                        {/* Seleccionar imagen */}
                        <input
                          onChange={this.handleSelectImage}
                          ref={input => (this.inputElement = input)}
                          type="file"
                          style={{ display: "none" }}
                        />
                        {/* </Button> */}
                      </CardActionArea>
                    </Card>
                  </div>
                </div>
                <div className="col-md-9 col-12">
                  <div className="row">
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          error={this.state.nombre_error}
                          helperText={
                            this.state.nombre_error
                              ? "El campo no puede estar vacío"
                              : ""
                          }
                          name="nombre"
                          label="Nombre"
                          variant="outlined"
                          value={this.state.nombre}
                          onChange={e => {
                            this.handleChangeFilds(e);
                            this.handleChangeError(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          error={this.state.existencia_error}
                          helperText={
                            this.state.existencia_error
                              ? "El valor debe ser mayor a cero"
                              : ""
                          }
                          pro
                          type="number"
                          InputProps={{ 
                            inputComponent: NumberFormatCustom,
                            inputProps: { min: 1, step: 1 } }}
                          name="existencia"
                          label="Existencia"
                          variant="outlined"
                          value={this.state.existencia}
                          onChange={e => {
                            this.handleChangeNumber(e);
                            this.handleChangeNumberError(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          error={this.state.precio_error}
                          helperText={
                            this.state.precio_error
                              ? "El valor debe ser mayor a cero"
                              : ""
                          }
                          type="number"
                          name="precio"
                          InputProps={{
                            inputComponent: MoneyFormatCustom,
                            inputProps: { min: 0, step: 0.01 }
                          }}
                          label="Precio"
                          variant="outlined"
                          value={this.state.precio}
                          onChange={e => {
                            this.handleChangeFilds(e);
                            this.handleChangeNumberError(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          name="descripcion"
                          label="Descripción"
                          multiline
                          rows="4"
                          variant="outlined"
                          value={this.state.descripcion}
                          onChange={this.handleChangeFilds}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          id="select-proveedor"
                          name="proveedor"
                          select
                          label="Proveedor"
                          value={this.state.proveedor}
                          onChange={e => {
                            this.handleChangeError(e);
                            this.handleChangeFilds(e);
                          }}
                          helperText="Selecciona el proveedor"
                          variant="outlined"
                        >
                          {proveedores.map((prov, index) => (
                            <MenuItem
                              key={prov.id}
                              value={prov.id}
                              selected={index == 0 ? true : false}
                            >
                              {prov.nombre + " " + prov.apellido}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <TextField
                          required
                          error={this.state.proveedor_error}
                          id="select-categoria-producto"
                          name="categoria_producto"
                          select
                          label="Categoria Producto"
                          value={this.state.categoria_producto}
                          onChange={e => {
                            this.handleChangeError(e);
                            this.handleChangeFilds(e);
                          }}
                          helperText="Selecciona la Categoria del Prodcuto"
                          variant="outlined"
                        >
                          {categoria_producto.map((categoria, index) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                              {categoria.nombre}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                    <div
                      className={`col-md-6 col-12 ${
                        this.props.producto ? "" : "d-none"
                      }`}
                    >
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <FormControl>
                          <InputLabel id="label-estado">Estado</InputLabel>
                          <Select
                            labelId="estado-label"
                            id="estado"
                            name="estado"
                            // defaultValue={true}
                            value={this.state.estado}
                            onChange={this.handleChangeFilds}
                            className={`${
                              this.state.estado ? "bg-green" : "bg-red"
                            }`}
                          >
                            <MenuItem value={true} className="bg-green">
                              Activo
                            </MenuItem>
                            <MenuItem value={false} className="bg-red">
                              No Disponible
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="col-12 mt-3">
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        color="primary"
                        type="submit"
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default withRouter(FormProducto);
