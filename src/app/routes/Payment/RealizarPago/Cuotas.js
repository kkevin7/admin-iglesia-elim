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
//Icons
import Badge from "@material-ui/core/Badge";
import MenuBookIcon from "@material-ui/icons/MenuBook";
//Components
import TableCuotas from "./TableCuotas";
import Spinner from "components/Spinner/Spinner";

class Cuotas extends Component {
  state = {};
  render() {
    const {cuotas} = this.props;
    if (!cuotas ) return <Spinner />;

    return (
      <div className="app-wrapper">
        <Card>
          <TableCuotas
            cuotas={cuotas}
          />
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cuotas: state.firestore.ordered.cuotas
  };
};

export default withRouter(
  compose(
    firestoreConnect(props => [
      {
        collection: "cuotas",
        where: [["id_contribucion", "==", props.match.params.id_contribucion]],
        orderBy: ["fecha_inicio", "asc"]
      }
    ]),
    connect(mapStateToProps)
  )(Cuotas)
);
