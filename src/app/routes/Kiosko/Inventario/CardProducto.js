import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


const CardProducto = ({producto}) => {

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
          <Typography variant="body2" color="textSecondary" component="p">
            Existencia: {producto.existencia}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="primary">
          <i className="zmdi zmdi-eye zmdi-hc-fw mr-1"/>
          Detalles
        </Button>
        <Button size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Eliminar
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
 
export default CardProducto;