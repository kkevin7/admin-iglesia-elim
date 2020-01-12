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
import CardSocio from "./CardSocio";
import CardContribucion from "./CardContribucion";
import CardCuotas from "./CardCuotas";

class DetalleContribucion extends Component {
  state = {};
  render() {
    const { contribucion, cuotas } = this.props;
    if (!contribucion || !cuotas ) return <Spinner />;

    return (
      <div className="app-wrapper">
        <div className="row">
          <div className="col-lg-6 col-lg-6 col-sm-6 col-12">
            <CardSocio
                socio={null}
            />
          </div>
          <div className="col-lg-6 col-lg-6 col-sm-6 col-12">
            <CardContribucion 
                contribucion={contribucion}
            />
          </div>
          <div className="col-lg-12 col-lg-12 col-sm-12 col-12 mt-3">
            <CardCuotas
                cuotas={cuotas}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore }) => {
  return {
    //   socio: state.realizarPago.socio,
    contribucion: firestore.ordered.contribucion && firestore.ordered.contribucion[0],
    cuotas: firestore.ordered.cuotas,
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "contribuciones",
        doc: props.match.params.id_contribucion,
        storeAs: "contribucion"
        // subcollections: [
        //     { collection: 'cuotas' },
        //   ]
      },
      {
        collection: "cuotas",
        where: [["id_contribucion", "==", props.match.params.id_contribucion]],
        orderBy: ["fecha_inicio", "asc"]
      }
    ])
  )(DetalleContribucion)
);
