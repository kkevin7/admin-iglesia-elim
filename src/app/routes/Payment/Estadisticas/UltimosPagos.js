import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
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
import Typography from "@material-ui/core/Typography";
//Images
import imgProducto from "assets/images/dashboard/producto2.png";

const useStyles = makeStyles({
  table: {
    minWidth: 250
  }
});

const UltimosPagos = ({ cuotas }) => {
  const classes = useStyles();

  return (
    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
      <div className="jr-card jr-card-widget jr-card-ticketlist card">
        <div className="d-flex flex-row mb-3">
          <h4 className="mb-1">Ultimos Pagos Realizados</h4>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={`bg-primary`}>
              <TableRow>
                <TableCell className={` text-white`}>Rubro</TableCell>
                <TableCell className={` text-white`}>Valor</TableCell>
                <TableCell className={` text-white`}>Fecha de Pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cuotas.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.rubro}</TableCell>
                  <TableCell align="left">$ {row.valor.toFixed(2)}</TableCell>
                  <TableCell align="left">
                    {row.fecha_pago
                      ? moment(row.fecha_pago.toDate()).format("LLL")
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default UltimosPagos;
