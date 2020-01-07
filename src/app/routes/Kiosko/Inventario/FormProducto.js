import React, { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Inputs
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import imageDefault from "../../../../assets/images/products/product1.png";
import SaveIcon from "@material-ui/icons/Save";
import Spinner from "components/Spinner/Spinner";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class FormProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre:
        typeof props.producto !== "undefined" ? props.producto.nombre : "",
      precio:
        typeof props.producto !== "undefined" ? props.producto.precio : "",
      existencia:
        typeof props.producto !== "undefined" ? props.producto.existencia : "",
      descripcion:
        typeof props.producto !== "undefined" ? props.producto.descripcion : "",
      proveedor: null,
      categoria_producto: null,
      file: null,
      urlImage: "",
      uploadValue: 0
    };
  }
  handleChangeFilds = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeNumber = e => {
    this.setState({
      [e.target.name]: Math.floor(Number(e.target.value))
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.actionSubmit(this.state);

    //upload image
    // if(this.state.file !== null){
    //   console.log("metodo");
    //   const {firebase} = this.props;
    //   const file = this.state.file;
    //   const storageRef = firebase.storage().ref(`/productos/${file.name}`);
    //   const taskUpload = storageRef.put(file);

    //   taskUpload.on('state_changed', snapshot => {
    //     let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     this.setState({
    //       uploadValue: percentage
    //     })
    //   }, error => {
    //     console.log(error.message)
    //   }, () => {
    //     this.setState({
    //       uploadValue: 100,
    //       file: null,
    //       urlImage: taskUpload.snapshot.downloadURL
    //     })
    //   })
    // }
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
    if (!proveedores || !categoria_producto) return <Spinner />;
    // console.log(proveedores)

    return (
      <Fragment>
        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
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
                <h3 className="card-heading font-weight-bold text-center">
                  DATOS DEL PRODUCTO
                </h3>
              </div>
              <div className="jr-card-body ">
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
                              id="outlined-required"
                              name="nombre"
                              label="Nombre"
                              variant="outlined"
                              value={this.state.nombre}
                              onChange={this.handleChangeFilds}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-12">
                          <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                            <TextField
                              required
                              id="outlined-required"
                              type="number"
                              InputProps={{ inputProps: { min: 1, step: 1 } }}
                              min="1"
                              step="1"
                              name="existencia"
                              label="Existencia"
                              variant="outlined"
                              value={this.state.existencia}
                              onChange={this.handleChangeNumber}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-12">
                          <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                            <TextField
                              required
                              id="outlined-required"
                              type="number"
                              name="precio"
                              InputProps={{
                                inputProps: { min: 0, step: 0.01 }
                              }}
                              label="Precio"
                              variant="outlined"
                              value={this.state.precio}
                              onChange={this.handleChangeFilds}
                            />
                          </div>
                        </div>
                        <div className="col-md-12 col-12">
                          <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                            <TextField
                              id="outlined-multiline-static"
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
                              onChange={this.handleChangeFilds}
                              helperText="Selecciona el proveedor"
                              variant="outlined"
                            >
                              {proveedores.map(proveedor => (
                                <MenuItem
                                  key={proveedor.id}
                                  value={proveedor.id}
                                >
                                  {proveedor.nombre}
                                </MenuItem>
                              ))}
                            </TextField>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                            <TextField
                              required
                              id="select-categoria-producto"
                              name="categoria_producto"
                              select
                              label="Categoria Producto"
                              value={this.state.categoria_producto}
                              onChange={this.handleChangeFilds}
                              helperText="Selecciona la Categoria del Prodcuto"
                              variant="outlined"
                            >
                              {categoria_producto.map(categoria => (
                                <MenuItem
                                  key={categoria.id}
                                  value={categoria.id}
                                >
                                  {categoria.nombre}
                                </MenuItem>
                              ))}
                            </TextField>
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
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    proveedores: firestore.ordered.proveedores,
    categoria_producto: firestore.ordered.categoria_producto
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: "categoria_producto"
      },
      {
        collection: "proveedores"
      }
    ])
  )(FormProducto)
);
