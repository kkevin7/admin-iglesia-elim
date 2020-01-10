import React, { Component } from "react";
import TableCuotas from "./TableCuotas";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import MenuBookIcon from "@material-ui/icons/MenuBook";

class Cuotas extends Component {
  state = {};
  render() {
    return (
      <div className="app-wrapper">
        <Card>
          <TableCuotas />
        </Card>
      </div>
    );
  }
}

export default Cuotas;
