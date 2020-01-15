import React, { Component } from "react";
import PropTypes from "prop-types";
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
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
//Components
import ProfileHeader from "components/profile/ProfileHeader/index";
import About from "./AboutContribucion/About";
import Spinner from "components/Spinner/Spinner";
import ListYears from "./AboutContribucion/ListYears";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { usuario, profile, contribuciones } = this.props;
    if (!usuario || profile.isEmpty || !contribuciones) return <Spinner />;

    return (
      <div className="app-wrapper">
        <ProfileHeader
          usuario={usuario}
          profile={profile}
          contribuciones={contribuciones}
        />
        <div className="jr-profile-content">
          <div className="row">
            <div className="col-md-2 col-12">
              <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                <ListYears usuario={usuario} profile={profile} />
              </div>
            </div>
            <div className="col-md-10 col-12">
              <div className="row">
                {contribuciones.length > 0 ? contribuciones.map(contribucion => (
                  <div className="col-md-12 col-12" key={contribucion.id}>
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <About
                        title={`Contribución`}
                        usuario={usuario}
                        profile={profile}
                        contribucion={contribucion}
                      />
                    </div>
                  </div>
                )) : (
                  <div className="col-md-12 col-12" >
                    <div className="MuiFormControl-root MuiTextField-root MuiFormControl-marginNormal MuiFormControl-fullWidth">
                      <Card>
                        <CardHeader title={`No se encontraron resultados en el año ${this.props.match.params.year}`} className="text-center"/>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase, firestore }) => {
  console.log(firestore.ordered.contribuciones)
  return {
    usuario: firebase.auth,
    profile: firebase.profile,
    contribuciones: firestore.ordered.contribuciones
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
      if (!props.usuario.uid) return [];
      if (!props.match.params.year){
        props.match.params.year = (new Date()).getFullYear();
      }
      if (!props.match.params.year || props.match.params.year.length > 4) return [];
      let firstDate = new Date(props.match.params.year, 0, 1);
      let lastDate = new Date(props.match.params.year, 11 + 1, 0);
      return [
        {
          collection: "contribuciones",
          where: [
            ["id_usuario", "==", props.usuario.uid],
            ["fecha_inicio", ">=", firstDate ],
            ["fecha_inicio", "<=", lastDate ],
          ],
          orderBy: ["fecha_inicio", "desc"]
        }
      ];
    })
  )(Profile)
);
