import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
//Card
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
//Icons
import PrintIcon from "@material-ui/icons/Print";
//Components
import ContainerHeader from "components/ContainerHeader/index";
import Spinner from "components/Spinner/Spinner";
import ContentComprobante from "./ContentComprobante";
import PrintComponents from "react-print-components";


class ComprobanteVenta extends Component {
  state = {};
  render() {
    const venta = this.props.venta;
    if (!venta || !(venta.id == this.props.match.params.id)) return <Spinner />;

    return (
      <div className="app-wrapper">
        <div className="row mb-md-3">
          <div className="col-lg-12">
              <Card>
                <CardContent>
                  
              <div className="col-12">
                {/* <Button variant="contained" 
                className="my-3" 
                color="primary" 
                startIcon={<PrintIcon/>} 
                onClick={mostrarReporte}                
                >
                  IMPRIMIR COMPROBANTE
                </Button> */}
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
                  <ContentComprobante venta={venta} />
                </PrintComponents>
              </div>
              <ContentComprobante venta={venta} />
              </CardContent>
              </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }, props) => ({
  venta: firestore.ordered.venta && firestore.ordered.venta[0],
  firestore: firestore
});

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "ventas",
        storeAs: "venta",
        doc: props.match.params.id
      }
    ])
  )(ComprobanteVenta)
);
