import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//components
import FichaContribucion from "./FichaContribucion";
import Spinner from "components/Spinner/Spinner";
//card
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FormControl from "@material-ui/core/FormControl";

class ContribucionesSocio extends Component {
  state = {};

  componentWillMount () {
    const { firestore } = this.props;
    // console.log(firestore)
    // console.log( this.props.match.params.id_usuario);
    // firestore
    // .collection('contribuciones')
    // .where('id_usuario', '==', this.props.match.params.id_usuario)
    // .orderBy('fecha_inicio', 'desc')
    // .get('contribuciones')
    // .get();
   
  }

  render() {
    const { contribuciones } = this.props;
    if (!contribuciones) return <Spinner />;

    return (
      <div className="app-wrapper">
          <Card>
            <Typography
              variant="h5"
              className="text-center text-uppercase font-weight-bold my-4"
            >
              Contribuciones en curso
            </Typography>
            {/* <CardHeader
              className="text-center text-uppercase font-weight-bold"
              title="Contribuciones en curso"
            /> */}
            <div className="row p-3">
              {contribuciones &&
                contribuciones.map(contribucion => (
                  <div
                    key={contribucion.id}
                    className="col-sm-6 col-md-4 col-12 mb-3 mx-auto"
                  >
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <FichaContribucion contribucion={contribucion} />
                    </div>
                  </div>
                ))}
            </div>
          </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socio: state.realizarPago.socio,
    contribuciones: state.firestore.ordered.contribuciones
  };
};



export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect( 
      ( props ) => ( [
      {
        collection: "contribuciones",
        // orderBy: [
        //   [ "fecha_inicio", "asc" ],
        // ],
        where: [
          [ "id_usuario", "==", props.match.params.id_usuario],
          [ "estado", "==", true],
        ],
      },
    ])
    )
  )(ContribucionesSocio)
);
