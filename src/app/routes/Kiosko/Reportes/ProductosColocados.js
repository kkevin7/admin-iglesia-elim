import React, { Fragment } from "react";
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
//Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99)
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const ProductosColocados = ({ visible }) => {
  const classes = useStyles();
  if (!visible) return "";

  return (
    <Fragment>
      <Card className="mt-3">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell align="right">Descripción</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Costo Unidad</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.desc}>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.unit}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}

              {/* <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow> */}
              {/* <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell rowSpan={2} ></TableCell>
                <TableCell align="right" colSpan={2}>Total</TableCell>
                <TableCell align="right" colSpan={2}>{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Fragment>
  );
};

export default ProductosColocados;
