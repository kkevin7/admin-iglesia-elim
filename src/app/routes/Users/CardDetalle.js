import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
//Card
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@material-ui/core/FormControl";
//Icons
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import WrapTextIcon from "@material-ui/icons/WrapText";
//Image
import userImageDefault from "../../../assets/images/users/user.png";
//Components
import SweetAlertDarBaja from "./SweetAlertDarBaja";

const CardDetalle = ({ history, usuario }) => {
  const handleRedirectEdit = id => {
    history.push(`/app/editarUsuario/${id}`);
  };

  const redirectContribuciones = id => {
    history.push(`/app/contribucionesSocio/${id}`);
  };

  return (
    <Card>
      {/* <Typography variant="h5" className="text-center  my-4">
        Detalle de Usuario
      </Typography> */}
      <CardContent>
        <div className="row">
          <div className="col-md-2 col-md-3  col-6 mx-auto">
            <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="210"
                    image={userImageDefault}
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              </Card>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  my-2">
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Nombre:</span> {""}
                    {usuario.nombre ? usuario.nombre : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Apellido:</span>{" "}
                    {usuario.apellido ? usuario.apellido : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Carnet:</span> {""}
                    {usuario.carnet ? usuario.carnet : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Teléfono:</span> {""}
                    {usuario.telefono ? usuario.telefono : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Nacimiento:</span> {""}
                    {usuario.fecha_nacimiento
                      ? moment(usuario.fecha_nacimiento.toDate()).format("LL")
                      : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Departamento:</span> {""}
                    {usuario.departamento ? usuario.departamento : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Tipo de Usuario:</span>{" "}
                    {""}
                    {usuario.rol ? usuario.rol : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Socio desde:</span> {""}
                    {usuario.fecha_socio
                      ? moment(usuario.fecha_socio.toDate()).format("LL")
                      : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-12 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Dirección:</span> {""}
                    {usuario.direccion ? usuario.direccion : ""}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Estado:</span>{" "}
                    {usuario.estado ? (
                      <p className="badge badge-green ml-auto">ACTIVO</p>
                    ) : (
                      <p className="badge badge-red ml-auto">INACTIVO</p>
                    )}
                  </h4>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <h4>
                    <span className="font-weight-bold">Correo:</span>{" "}
                    {usuario.email ? usuario.email : "Sin correo"}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-12">
            <div className="row  my-2">
              <div className="col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  {/* <Button startIcon={<AddIcon/>} className="btn-block bg-cyan text-white" variant="contained" >sddAgregar Existencia</Button> */}
                  {/* <DialogAddExistencia producto={producto} /> */}
                </div>
              </div>
              <div className="col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <Button
                    startIcon={<EditIcon />}
                    className="btn-block bg-warning text-white"
                    variant="contained"
                    onClick={() => handleRedirectEdit(usuario.id)}
                  >
                    Editar Usuario
                  </Button>
                </div>
              </div>
              <div className="col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <Button
                    startIcon={<WrapTextIcon />}
                    className="btn-block bg-cyan text-white"
                    variant="contained"
                    onClick={() => redirectContribuciones(usuario.id)}
                  >
                    Ver Contribciones
                  </Button>
                </div>
              </div>
              <div className="col-12 my-2">
                <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                  <SweetAlertDarBaja
                    id={usuario.id}
                    btnSize="medium"
                    btnText={`${
                      usuario.estado ? "Dar de Baja" : "Reactivar Cuenta"
                    }`}
                    btnClass={`btn-block bg-${
                      usuario.estado ? "danger" : "green"
                    } text-white`}
                    estado={usuario.estado}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default withRouter(CardDetalle);
