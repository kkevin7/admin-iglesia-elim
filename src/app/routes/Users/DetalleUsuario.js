import React, { Component } from 'react';
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
//Components
import ProfileHeader from "components/profile/ProfileHeader/index";
import Spinner from "components/Spinner/Spinner";
import CardDetalle from "./CardDetalle";

class DetalleUsuario extends Component {
    state = {  }

    render() {
        const {usuario} = this.props;
        if(!usuario) return <Spinner/>;

        return (
            <div className="app-wrapper">
                <CardDetalle usuario={usuario}/>
            </div>
        );
    }
}

const mapStateToProps = ({firestore}) => {
    return {
      usuario: firestore.ordered.usuario && firestore.ordered.usuario[0],
    };
  };

export default withRouter(
    compose(
      connect(mapStateToProps),
      firestoreConnect(props => {
        if (!props.match.params.id) return [];
        return [
          {
            collection: "usuarios",
            doc: props.match.params.id,
            storeAs: "usuario"
          }
        ];
      })
    )(DetalleUsuario)
  );
  