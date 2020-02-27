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

const Ingresos = ({
  visible,
  cuotas,
  devoluciones,
  fechaInicio,
  fechaFin
}) => {
  const classes = useStyles();
  if (!visible) return "";

  const totalCuotas = cuotas.reduce((total, cuota) => {
    return total + cuota.valor;
  }, 0);

  const totalDevoluciones = devoluciones.reduce((total, devol) => {
    return total + devol.monto
  }, 0)

  const totalFinal = totalCuotas - totalDevoluciones;

  return (
    <Fragment>
      <div className="col-12 m-3">
        <Typography variant="h4" className="text-center font-weight-bold">
          Reporte de ofrendas y diezmos
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
                <TableCell className="w-50" align="left">Cuotas Recaudadas</TableCell>
                <TableCell className="w-50" align="left">Total Generado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="w-50" >{cuotas.length}</TableCell>
                <TableCell className="w-50" >$ {totalCuotas.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell className="w-50" align="left">Devoluciones Realizadas</TableCell>
                <TableCell className="w-50" align="left">Total Entregado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="w-50" >{devoluciones.length}</TableCell>
                <TableCell className="w-50" >$ - {totalDevoluciones.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableBody>
              <TableRow>
                <TableCell rowSpan={2}></TableCell>
                <TableCell align="right" className="font-weight-bold" colSpan={2}>
                  Total Final
                </TableCell>
                <TableCell align="right" className="font-weight-bold" colSpan={2}>
                  $ {ccyFormat(totalFinal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </CardContent>
      <div className="col-12 my-4">
        <div className="row">
          <div className="col-12  text-center font-weight-bold">
            <p variant="p" className="text-center ">
              Generado: {moment(new Date()).format("LLL")}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const ReporteIngresos = ({
  visible,
  cuotas,
  devoluciones,
  fechaInicio,
  fechaFin
}) => {
  if (!visible) return "";
  if (!cuotas || !devoluciones) return <Spinner />;
  console.log(cuotas);
  console.log(devoluciones);

  if (!(cuotas.length >= 0) || !(devoluciones.length >= 0))
    return (
      <Card className="my-3 text-center">
        <CardContent>
          <Typography variant="h5">No se encontraron registros</Typography>
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
              <Ingresos
                visible={visible}
                fechaInicio={fechaInicio}
                fechaFin={fechaFin}
                cuotas={cuotas}
                devoluciones={devoluciones}
              />
            </PrintComponents>
          </div>
        </CardContent>
        <Ingresos
          visible={visible}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          cuotas={cuotas}
          devoluciones={devoluciones}
        />
      </Card>
    </Fragment>
  );
};

export default ReporteIngresos;
