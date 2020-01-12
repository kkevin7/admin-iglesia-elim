import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
//Card
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//Print
import PrintComponents from "react-print-components";
//Components
import Spinner from "components/Spinner/Spinner";
import ContentOneCuota from "./ContentOneCuota";
//Icons
import PrintIcon from "@material-ui/icons/Print";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

class ComprobanteCuota extends Component {
  state = {};

  redirectToCuotas = id_contribucion => {
    const { history } = this.props;
    // history.push(`/app/cuotas/${id_contribucion}`);
    history.goBack();
  };

  render() {
    const { cuota } = this.props;
    if (!cuota) return <Spinner />;

    if (cuota.estado !== "PAGADA")
      return (
        <div className="app-wrapper">
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                className="text-uppercase text-center"
              >
                La cuota todavia no ha sido pagada
              </Typography>
            </CardContent>
          </Card>
        </div>
      );

    return (
      <div className="app-wrapper">
        <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
          <Button
            variant="contained"
            className="my-1 bg-cyan text-white"
            startIcon={<ArrowBackIcon />}
            onClick={() => this.redirectToCuotas(cuota.id_contribucion)}
          >
            VOLVER
          </Button>
        </div>
        <Card>
          <CardContent>
            <PrintComponents
              trigger={
                <Button
                  variant="contained"
                  className="my-1"
                  color="primary"
                  startIcon={<PrintIcon />}
                >
                  IMPRIMIR COMPROBANTE
                </Button>
              }
            >
              <ContentOneCuota cuota={cuota} />
            </PrintComponents>

            <ContentOneCuota cuota={cuota} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    cuota: firestore.ordered.cuota && firestore.ordered.cuota[0]
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
      return [
        {
          collection: "cuotas",
          doc: props.match.params.id,
          //   where: [["estado", "==", "PAGADA"]],
          storeAs: "cuota"
        }
      ];
    })
  )(ComprobanteCuota)
);
