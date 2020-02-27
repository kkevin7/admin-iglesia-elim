import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import moment from "moment";
//Card
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

//Coponents
import ContainerHeader from "components/ContainerHeader/index";
import Spinner from "components/Spinner/Spinner";
import ResumenProducto from "./ResumenProducto";
//Image
import userImageDefault from "assets/images/users/user.png";
import DefaultImgProducto from "assets/images/products/caja.png";

class DetalleVenta extends Component {
  state = {};
  render() {
    const { venta, firestore } = this.props;
    if (!venta || !(venta.id == this.props.match.params.id) || !firestore) return <Spinner />;

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Detalle de la venta" />
        <div className="row">
          <div className="col-12">
            <Card>
              <CardContent>
                <div className="col-12">
                <h3 className="card-text text-center mb-4 text-uppercase font-weight-bold">Datos del pedido</h3>
                  <div className="border mb-4 p-4 ">
                    <div className="row">

                      <div className="col-md-2 col-6 mx-auto my-2">
                        <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                          <Card>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="150"
                                image={userImageDefault}
                                title="Contemplative Reptile"
                              />
                            </CardActionArea>
                          </Card>
                        </div>
                      </div>

                      <div className="col-md-10 col-12">
                        <div className="row">

                          <div className="col-md-6 col-12 my-3">
                            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                              <h4 className="font-weight-bold text-center">
                                Pedido ID:
                                <span className="font-weight-normal"> {venta.id}</span>
                              </h4>
                            </div>
                          </div>

                          <div className="col-md-6 col-12 my-3">
                            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                              <h4 className="font-weight-bold text-center">
                                Fecha Pedido:
                      <span className="font-weight-normal">
                                  {" "}
                                  {moment(venta.fecha_venta.toDate()).format("lll")}
                                </span>
                              </h4>
                            </div>
                          </div>

                          <div className="col-md-6 col-12 my-3">
                            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                              <h4 className="font-weight-bold text-center">
                                Vendedor:
                      <span className="font-weight-normal"> {venta.vendedor.nombre}</span>
                              </h4>
                            </div>
                          </div>

                          <div className="col-md-6 col-12 my-3">
                            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                              <h4 className="font-weight-bold text-center">
                                Total:
                      <span className="font-weight-normal">
                                  {" "}
                                  $ {venta.total.toFixed(2)}{" "}
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>

                     

                    </div>
                    
                  </div>
                  <div className="col-12">
                <h3 className="card-text text-center mb-4 text-uppercase font-weight-bold">Productos</h3>
                </div>
                <div className="col-12">
                  <div className="row">
                    {venta.pedido.map(producto => (
                      <div className="col-md-4 col-12 mx-auto" key={producto.id}>
                        <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                          <ResumenProducto
                            key={producto.id}
                            producto={producto}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }, props) => ({
  venta: firestore.ordered.venta && firestore.ordered.venta[0],
  firestore: firestore
});

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "ventas",
        storeAs: "venta",
        doc: props.match.params.id
      }
    ])
  )(DetalleVenta)
);
