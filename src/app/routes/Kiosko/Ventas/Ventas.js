import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
// Card
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//components
import Spinner from "components/Spinner/Spinner";
import ContainerHeader from "components/ContainerHeader/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableVentas from "./TableVentas";
import DataTableVentas from "./DataTableVentas";

class Ventas extends Component {
  state = {};
  render() {
    const { ventas, firestore } = this.props;
    if (!ventas) return <Spinner />;

    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title="Ventas realizadas" />
        {/* <Card>
          <CardContent>
            <TableVentas ventas={ventas} />
          </CardContent>
        </Card>     */}
        <DataTableVentas ventas={ventas} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ventas: state.firestore.ordered.ventas
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([
      { 
        collection: "ventas" ,
        orderBy: [['fecha_venta', 'desc']] 
      }
    ])
  )(Ventas)
);
