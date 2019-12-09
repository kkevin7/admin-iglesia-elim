import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DefaultImgProducto from '../../../../assets/images/products/caja.png';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CardProducto = ({producto}) => {
  const classes = useStyles();

  return (
    <div className="col-lg-4 col-sm-6 col-12">
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
    </div>
  );
}
 
export default CardProducto;