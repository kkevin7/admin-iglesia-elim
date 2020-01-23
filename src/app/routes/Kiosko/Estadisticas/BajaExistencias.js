import React from "react";
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
//Images
import imgProducto from 'assets/images/dashboard/producto2.png';

const useStyles = makeStyles({
  table: {
    minWidth: 250
  }
});

const BajaExistencias = ({productos}) => {
  const classes = useStyles();

  return (
    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
      <div className="jr-card jr-card-widget jr-card-ticketlist card">
        <div className="d-flex flex-row mb-3">
          <h4 className="mb-1">Proximos ha agotarse</h4>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell >Imagen</TableCell>
                <TableCell  >Producto</TableCell>
                <TableCell  >Existencia</TableCell>
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
                  <TableCell align="left">{row.existencia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default BajaExistencias;
