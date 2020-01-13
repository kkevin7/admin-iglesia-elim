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
//Reducers
import {buscarContribucionAndSocio} from "actions/contribucionesActions";

class DetalleContribucion extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    // var usuarios = {};
    // const { firestore } = this.props;
    // const usuariosRef = firestore.collection("usuarios");
    // usuariosRef.get().then(snapshot => {
    //   snapshot.forEach(userDoc => {
    //     var userDocData = userDoc.data();
    //     if (usuarios[userDoc.id] == undefined) {
    //       usuarios[userDoc.id] = userDocData;
    //     }
    //   });
    //   // var countContribuciones;
    //   Object.keys(usuarios).forEach(userDocId => {
    //     const contribcionesRef = firestore
    //       .collection("contribuciones")
    //       .where("id_usuario", "==", userDocId);
    //     contribcionesRef.get().then(contribucionSnapshot => {
    //       contribucionSnapshot.forEach(contribucionDoc => {
    //         var contribucionDocData = contribucionDoc.data();

    //         if (
    //           usuarios[contribucionDocData.id_usuario].contribucion == undefined
    //         ) {
    //           usuarios[contribucionDocData.id_usuario].contribucion = [];
    //         }

    //         usuarios[contribucionDocData.id_usuario].contribucion.push(
    //           contribucionDocData
    //         );
    //       });
    //     });
    //   });
    // });
    const {buscarContribucionAndSocio} = this.props;
    buscarContribucionAndSocio(this.props.match.params.id_contribucion)
  }

  render() {
    const { contribucion, cuotas, socio } = this.props;
    if (!contribucion || !cuotas || !socio) return <Spinner />;
    // console.log(this.props);

    return (
      <div className="app-wrapper">
        <div className="row">
          <div className="col-lg-6 col-lg-6 col-sm-6 col-12 my-2">
            <CardSocio socio={socio} />
          </div>
          <div className="col-lg-6 col-lg-6 col-sm-6 col-12 my-2">
            <CardContribucion contribucion={contribucion} />
          </div>
          <div className="col-lg-12 col-lg-12 col-sm-12 col-12 my-2">
            <CardCuotas cuotas={cuotas} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firestore, contribucion }) => {
  console.log(contribucion.contribucion);
  return {
    socio: contribucion.socio,
    contribucion: contribucion.contribucion,
    cuotas: firestore.ordered.cuotas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buscarContribucionAndSocio: busqueda => dispatch(buscarContribucionAndSocio(busqueda))
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [
      // {
      //   collection: "contribuciones",
      //   doc: props.match.params.id_contribucion,
      //   storeAs: "contribucion"
      // },
      {
        collection: "cuotas",
        where: [["id_contribucion", "==", props.match.params.id_contribucion]],
        orderBy: ["fecha_inicio", "asc"]
      }
    ])
  )(DetalleContribucion)
);
