import React, { useState } from 'react';
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Redux
import { deleteProducto, deleteImageProducto } from "actions/productosActions";
//Card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//Icons
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
//Image
import DefaultImgProducto from '../../../../assets/images/products/caja.png';
import SweetAlert from 'react-bootstrap-sweetalert';
import SweetAlertEliminar from './SweetAlertEliminar';

const CardProducto = ({ producto, firestore, history, deleteProducto, deleteImageProducto }) => {

  const handleElminarProducto = async (id) => {
    if(producto.file_id){
      await deleteImageProducto(producto.file_id);
    }
    await deleteProducto(id);
  }

  const handleRedirectDetalle = (id) => {
    history.push('detalleProducto/'+id);
  }


  let classExistencia=`mt-2 badge text-uppercase text-white `;
  if(producto.existencia >5){
    classExistencia+="bg-success";
  }
  if (producto.existencia <=5 && producto.existencia >0 ){
    classExistencia+="bg-warning";
  }
  if(producto.existencia <1){
    classExistencia+="bg-danger";
  }

  return (
    <div className="col-lg-3 col-sm-6 col-12">
      <Card className="shadow border-0 card">
        <CardActionArea>
          <CardMedia
            className="card-img-top"
            component="img"
            height="200"
            image={producto.url ? producto.url :DefaultImgProducto}
            title={producto.nombre}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {producto.nombre}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {producto.descripcion}
            </Typography>
            <div className={classExistencia}>
            <Typography className="text-white" variant="body2" color="textSecondary" component="p">
              Existencia: {producto.existencia}
            </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" variant="contained" onClick={() => handleRedirectDetalle(producto.id)} color="primary">
            <i className="zmdi zmdi-eye zmdi-hc-fw mr-1" />
            Detalles
        </Button>
        <SweetAlertEliminar id={producto.id} actionComponent={handleElminarProducto}/>
        </CardActions>
      </Card>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProducto: async (producto) => dispatch(deleteProducto(producto)),
    deleteImageProducto: async (producto) => dispatch(deleteImageProducto(producto)),
  };
};

export default withRouter(
  compose(
    connect(null, mapDispatchToProps),
    firestoreConnect()
  )(CardProducto)
);