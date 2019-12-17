import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import DefaultImgProducto from '../../../../assets/images/products/caja.png';
import DeleteIcon from '@material-ui/icons/Delete';
import SweetAlert from 'react-bootstrap-sweetalert';

const CardProducto = ({ producto, firestore }) => {

  const handleElminarProducto = async (id) => {
    const response = await firestore.delete({
      collection: 'productos',
      doc: id
    })
    return response;
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

  const [alertConfirm, setAlertConfirm] = React.useState(false);
  const [alertOK, setAlertOK] = React.useState(false);

  return (
    <div className="col-lg-3 col-sm-6 col-12">
      <Card className="shadow border-0 card">
        <CardActionArea>
          <CardMedia
            className="card-img-top"
            component="img"
            height="200"
            image={DefaultImgProducto}
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
          <Button size="small" variant="contained" color="primary">
            <i className="zmdi zmdi-eye zmdi-hc-fw mr-1" />
            Detalles
        </Button>
          <Button size="small" variant="contained" color="secondary" onClick={() => setAlertConfirm(true)} startIcon={<DeleteIcon />}>
            Eliminar
        </Button>
          <SweetAlert
            show={alertConfirm}
            warning
            showCancel
            confirmBtnText="Si, deseo eliminarlo!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="primary"
            title="¿Está seguro de eliminar este registro?"
            onConfirm={() => {
              setAlertConfirm(false);
              setAlertOK(true);
            }}
            onCancel={() => setAlertConfirm(false)}
            focusCancelBtn
          >
            Esta acción es irreversible y no se podrá recuperar el registro
          </SweetAlert>
          <SweetAlert
            show={alertOK}
            success title="Acción realizda con éxito!"
            onConfirm={() => {
              handleElminarProducto(producto.id);
              setAlertOK(false)
            }}
            onCancel={() => {
              handleElminarProducto(producto.id);
              setAlertOK(false)
            }}>
            OK!
          </SweetAlert>
        </CardActions>
      </Card>
    </div>
  );
}

export default CardProducto;