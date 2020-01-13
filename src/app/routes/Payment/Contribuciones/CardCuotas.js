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
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
//Components
import Spinner from "components/Spinner/Spinner";
import TableCuotas from "app/routes/Payment/RealizarPago/TableCuotas";
import DataTableCuotas from "app/routes/Payment/RealizarPago/DataTableCuotas";

const CardCuotas = ({ cuotas }) => {
  if (!cuotas)
    return (
      <Card>
        <div className="card-header py-3 d-flex align-items-center">
          <h3 className="mb-0">
            <span className="text-uppercase">CUOTAS DEL SOCIO</span>
          </h3>
        </div>
        <CardContent>
          <Typography variant="h6" className="text-uppercase">
            {" "}
            No hay registros
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <div className="card-header py-3 d-flex align-items-center">
        <h3 className="mb-0">
          <span className="text-uppercase">CUOTAS DEL SOCIO</span>
        </h3>
      </div>
      <CardContent>
        <DataTableCuotas 
            cuotas={cuotas}
        />
      </CardContent>
    </Card>
  );
};

export default CardCuotas;
