import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
//DataTable
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PrintIcon from "@material-ui/icons/Print";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
//components
import Spinner from "components/Spinner/Spinner";
import DialogPago from "app/routes/Payment/RealizarPago/DialogPago";
import DialogVariosPagos from "app/routes/Payment/RealizarPago/DialogVariosPagos";
import SweetAlertCancelarPago from "app/routes/Payment/RealizarPago/SweetAlertCancelarPago";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: "rubro", numeric: false, disablePadding: false, label: "Rubro" },
  {
    id: "fecha_inicio",
    numeric: false,
    disablePadding: false,
    label: "Fecha Incio"
  },
  { id: "valor", numeric: true, disablePadding: false, label: "Monto" },
  { id: "id", numeric: false, disablePadding: false, label: "Código" },
  {
    id: "fecha_pago",
    numeric: false,
    disablePadding: false,
    label: "Fecha Pago"
  },
  { id: "estado", numeric: false, disablePadding: false, label: "Estado" },
  { id: "acciones", numeric: false, disablePadding: false, label: "Acciones" },
  {
    id: "comprobante",
    numeric: false,
    disablePadding: false,
    label: "Comprobante"
  },
  { id: "cancelar_pago", numeric: false, disablePadding: false, label: "Cancelar Pago" },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, pagadas } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
      <TableCell padding="checkbox">
          {pagadas == 0 ? (<Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />) : ""}
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
          key={headCell.id}
          align={headCell.numeric ? 'right' : 'left'}
          padding={headCell.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, selectedCuotas, cuotas, estadoContribucion, limpairSeleccionados, countPagadas, totalCantidadCuotas } = props;

  let cuotasFiltradas = [];
  selectedCuotas.forEach(id => {
    cuotasFiltradas.push(...cuotas.filter(val => val.id == id))
  })

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selecionados
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Cuotas del socio
        </Typography>
      )}

      {numSelected > 0 ? (
        <DialogVariosPagos
          totalCantidadCuotas={totalCantidadCuotas}
          cuotas={cuotasFiltradas}
          estadoContribucion = {estadoContribucion}
          limpairSeleccionados = {limpairSeleccionados}
          countPagadas = {countPagadas}
        />
      ) : (
        ""
        // <Tooltip title="Filter list">
        //   <IconButton aria-label="filter list">
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const DataTableCuotas = ({ cuotas, history, totalCantidadCuotas }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("fecha_inicio");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = cuotas.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, cuotas.length - page * rowsPerPage);

  const btnRedirectComprobante = id => {
    history.push(`/app/comprobanteCuota/${id}`);
  };

  let estadoContribucion = true;
  let countPagadas = 0;
  cuotas.forEach(cuota => {
    if(cuota.estado == "PAGADA"){
    countPagadas+=1;
    }
  });
  if(countPagadas == totalCantidadCuotas-1){
    estadoContribucion=false
  }

  const limpairSeleccionados = async () => {
    setSelected([]);
  }

  return (
<div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
        totalCantidadCuotas={totalCantidadCuotas}
        selectedCuotas={selected}
        numSelected={selected.length} 
        cuotas={cuotas}
        estadoContribucion = {estadoContribucion}
        limpairSeleccionados = {limpairSeleccionados}
        countPagadas = {countPagadas}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              pagadas={countPagadas}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={cuotas.length}
            />
          <TableBody>
            {stableSort(cuotas, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                      hover
                      onClick={ event => {
                        row.estado !== "PAGADA" ? handleClick(event, row.id) : console.log()
                      } }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      {row.estado !== "PAGADA" ? (
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      ): ""}
                      </TableCell>
                    <TableCell align="left">{row.rubro}</TableCell>
                    <TableCell align="left">
                      {row.fecha_inicio
                        ? moment(row.fecha_inicio.toDate()).format("LL")
                        : ""}
                    </TableCell>
                    <TableCell align="left">$ {row.valor.toFixed(2)}</TableCell>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">
                      {row.fecha_pago
                        ? moment(row.fecha_pago.toDate()).format("LLL")
                        : ""}
                    </TableCell>
                    <TableCell align="left">{row.estado}</TableCell>
                    <TableCell>
                      {row.estado === "VIGENTE" ? (
                        <DialogPago 
                        cuota={row} 
                        estadoContribucion = {estadoContribucion}
                        />
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell>
                      {row.estado === "PAGADA" ? (
                        <Button
                          startIcon={<PrintIcon />}
                          className="bg-cyan text-white"
                          variant="contained"
                          onClick={() => {
                            btnRedirectComprobante(row.id)
                          }}
                        >
                          GENERAR
                        </Button>
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell>
                    {row.estado === "PAGADA" ? (
                        <SweetAlertCancelarPago id={row.id}/>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[12, 24, 36]}
        component="div"
        count={cuotas.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Reducir espacios"
      />
    </div>
  );
};

export default withRouter(DataTableCuotas);
