import React, { Fragment } from "react";
//Table
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
//Images
import imgProducto from 'assets/images/dashboard/producto2.png';

const useStyles = makeStyles({
  table: {
    minWidth: 250
  }
});

const TopVendidos = ({ productos }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="jr-card jr-card-widget jr-card-ticketlist card">
          <div className="d-flex flex-row mb-3">
            <h4 className="mb-1">Top de Ventas</h4>
            <span className="text-primary font-weight-medium mb-0 pointer ml-auto d-none d-sm-block">
              Últimos 6 meses{" "}
            </span>
          </div>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={`bg-primary`} >
              <TableRow>
                <TableCell className={` text-white`}>Imagen</TableCell>
                <TableCell className={` text-white`} >Producto</TableCell>
                <TableCell className={` text-white`} >Vendidos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="left">
                  <Avatar
                          alt={``}
                          src={row.url ? row.url : imgProducto}
                          className="user-avatar"
                        />
                    </TableCell>
                  <TableCell align="left" >
                    {row.nombre}
                  </TableCell>
                  <TableCell align="left" >
                    <div className={`badge text-uppercase text-white bg-green`}>
                    <Typography className="text-white" variant="body2" color="textSecondary" component="p">
                    {row.cantidad}
                    </Typography>
                    </div>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    </Fragment>
  );
};

export default TopVendidos;
