import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import ContainerHeader from "components/ContainerHeader/index";
import { firestoreConnect } from "react-redux-firebase";
import imageDefault from "../../../../assets/images/products/product1.png";
import {createProducto} from '../../../../actions/productosActions';
//Inputs
import { Input } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
// cards
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

class RegistrarProducto extends Component {
  state = {
    nombre: "",
    precio: "",
    existencia: "",
    descripcion: ""
  };

  handleChangeFilds = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeNumber = (e) => {
    this.setState({
      [e.target.name]: Math.floor(Number(e.target.value))
    });  
};

  createProducto = (e) => {
    e.preventDefault();
    // this.props.createProducto(this.state);
    // this.props.history.push(`/app/inventario`)
    const nuevoProducto = this.state;
    const {firestore, history} = this.props;
    console.log(firestore);
    firestore
      .add({ collection: "productos" }, nuevoProducto)
      .then(() => history.push("/app/inventario"));
    
  };

  render() {
    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Registrar productos" />

        <div className="row mb-md-3">
          <div className="col-lg-12">
            <div className="jr-card">
              <div className="jr-card-header ">
                <h3 className="card-heading">DATOS DEL PRODUCTO</h3>
              </div>
              <div className="jr-card-body ">
                <form
                  onSubmit={this.createProducto}
                  // noValidate
                  autoComplete="off"
                >
                  <div className="row">
                    <div className="col-md-3 col-12">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                        <Card>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="210"
                              image={imageDefault}
                              title="Contemplative Reptile"
                              onChange={this.handleChangeFilds}
                            />
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
                              InputProps={{ inputProps: { min: 0, step: 1 } }}
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
                              InputProps={{ inputProps: { min: 0, step: 1 } }}
                              min="1" 
                              step="1"
                              label="Precio"
                              variant="outlined"
                              value={this.state.precio}
                              onChange={this.handleChangeFilds}
                            />
                          </div>
                        </div>
                        <div className="col-md-8 col-12">
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
                        <div className="col-12 mt-3">
                          <Button 
                          variant="contained" 
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
      </div>
    );
  }
}

const mapStateToProps = ({firestore}) => {
  return{
    firestore: firestore && firestore
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    createProducto: (producto) => dispatch(createProducto(producto))
  }
}

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect())
    (RegistrarProducto));
