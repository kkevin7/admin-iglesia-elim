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
import Avatar from "@material-ui/core/Avatar";
//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PrintIcon from "@material-ui/icons/Print";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
//Images
import userImageDefault from "assets/images/users/user.png";
//components
import Spinner from "components/Spinner/Spinner";

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
    { id: "carnet", numeric: false, disablePadding: false, label: "Carnet" },
    { id: "valor_cuota", numeric: false, disablePadding: false, label: "Valor Cuota" },
    { id: "cantida_cuota", numeric: false, disablePadding: false, label: "Cantidad de Cuotas" },
    {
        id: "fecha_inicio",
        numeric: false,
        disablePadding: false,
        label: "Fecha Inicio"
    },
    {
        id: "fecha_fin",
        numeric: false,
        disablePadding: false,
        label: "Fecha Fin"
    },
    {
        id: "estado",
        numeric: false,
        disablePadding: false,
        label: "Estado"
    },
    {
        id: "detalle",
        numeric: false,
        disablePadding: false,
        label: "Detalle"
    },
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        // align={headCell.numeric ? "right" : "left"}
                        // align={`center`}
                        padding={headCell.disablePadding ? "none" : "default"}
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
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    container: {
        maxHeight: 440
    },
    table: {
        minWidth: 750
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

const DataTableContribuciones = ({ contribuciones, history }) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = contribuciones.map(n => n.name);
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
        rowsPerPage - Math.min(rowsPerPage, contribuciones.length - page * rowsPerPage);

    const btnRedirectDetalle = id => {
        history.push(`/app/detalleUsuario/${id}`);
    };

    const redirectDetalleContribucion = id_contribucion => {
        history.push(`/app/detalleContribucion/${id_contribucion}`);
    };

    return (
        <Paper className={classes.paper}>
            <TableContainer
            // className={classes.container}
            >
                <Table
                    stickyHeader
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={contribuciones.length}
                    />
                    <TableBody>
                        {stableSort(contribuciones, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow hover tabIndex={-1} key={row.id}>
                                        <TableCell align="left">
                                            {row.carnet ? row.carnet : ""}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.valor_cuota ? row.valor_cuota : ""}
                                        </TableCell>
                                        <TableCell align="left">{row.cantidad_cuota ? row.cantidad_cuota : ""}</TableCell>
                                        <TableCell align="left">
                                            {row.fecha_inicio ? moment(row.fecha_inicio.toDate()).format("LL") : ""}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.fecha_fin ? moment(row.fecha_fin.toDate()).format("LL") : ""}
                                        </TableCell>
                                        <TableCell align="left">{row.estado ? <p className="badge badge-green ml-auto" >ACTIVO</p> : <p className="badge badge-red ml-auto" >INACTIVO</p>}</TableCell>
                                        <TableCell>
                                            <Button
                                                startIcon={<FormatListBulletedIcon />}
                                                variant="contained"
                                                color="primary"
                                                onClick={() => redirectDetalleContribucion(row.id)}
                                            >
                                                DETALLES
                                            </Button>
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
                rowsPerPageOptions={[10, 20, 30, 40, 60]}
                component="div"
                count={contribuciones.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default withRouter(DataTableContribuciones);