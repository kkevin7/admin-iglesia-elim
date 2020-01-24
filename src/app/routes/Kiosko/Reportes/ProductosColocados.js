import React, {Fragment} from 'react';
//Card
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ProductosColocados = ({visible}) => {
    if(!visible) return("");
    return ( 
        <Fragment>
            <Card className="mt-3">
                sdds
            </Card>
        </Fragment>
     );
}
 
export default ProductosColocados;