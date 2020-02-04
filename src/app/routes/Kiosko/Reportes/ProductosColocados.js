import React, { Fragment } from "react";
import moment from "moment";
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
//Print
import PrintComponents from "react-print-components";
import PrintIcon from "@material-ui/icons/Print";
//components
import Spinner from "components/Spinner/Spinner";

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

const ProductosColocados = ({ visible, productos, fechaInicio, fechaFin }) => {
  const classes = useStyles();
  if (!visible) return "";
  if ((!productos.length > 0 || !fechaInicio, !fechaFin)) return <Spinner />;

  let totalPagado = productos.reduce((total, prod) => {
    return total + prod.total;
  }, 0);

  return (
    <Fragment>
      <div className="col-12 m-3">
        <Typography variant="h4" className="text-center font-weight-bold">
          Reporte de productos colocados
        </Typography>
      </div>
      <div className="col-12 my-5">
        <div className="row">
          <div className="col-12 col-md-6 text-center font-weight-bold">
            <p className="text-center ">
              Fecha Inicio: {moment(fechaInicio).format("LL")}
            </p>
          </div>
          <div className="col-12 col-md-6 text-center font-weight-bold">
            <p className="text-center">
              Fecha Fin: {moment(fechaFin).format("LL")}
            </p>
          </div>
        </div>
      </div>
      <CardContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Producto</TableCell>
                <TableCell align="left">Descripción</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Costo Unidad</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell align="right">{row.cantidad}</TableCell>
                  <TableCell align="right">$ {row.precio.toFixed(2)}</TableCell>
                  <TableCell align="right">$ {ccyFormat(row.total)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={2}></TableCell>
                <TableCell align="right" className="font-weight-bold" colSpan={2}>
                  Total
                </TableCell>
                <TableCell align="right" className="font-weight-bold" colSpan={2}>
                  $ {ccyFormat(totalPagado)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <div className="col-12 my-4">
        <div className="row">
          <div className="col-12  text-center font-weight-bold">
            <p className="text-center ">
              Generado: {moment(new Date()).format("LLL")}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const ReporteProductosColocados = ({
  visible,
  productos,
  fechaInicio,
  fechaFin
}) => {
  if (!visible) return "";
  if (!productos) return <Spinner />;

  if (!productos.length > 0) return (
    <Card className="my-3 text-center">
      <CardContent>
        <Typography variant="h5" >No se encontraron registros</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Fragment>
      <Card className="mt-3">
        <CardContent>
          <div className="col-12 col-md-3">
            <PrintComponents
              trigger={
                <Button
                  variant="contained"
                  className="my-1"
                  color="primary"
                  startIcon={<PrintIcon />}
                  fullWidth
                >
                  IMPRIMIR
                </Button>
              }
            >
              <ProductosColocados
                visible={visible}
                productos={productos}
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
              />
            </PrintComponents>
          </div>
        </CardContent>
        <ProductosColocados
          visible={visible}
          productos={productos}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
        />
      </Card>
    </Fragment>
  );
};

export default ReporteProductosColocados;
