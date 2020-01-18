import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import userImageDefault from '../../../assets/images/users/user.png';
import Spinner from '../../../components/Spinner/Spinner';
import Button from "@material-ui/core/Button";
import DataTableUsuarios from "./DataTableUsuarios";

class Users extends Component {
  state = {};

  componentDidMount(){
    const { usuarios, firebase, firestore } = this.props;
    const resultado = firestore.collection('usuarios').orderBy('carnet').startAt(("P").toUpperCase()).get();
    resultado.then(snapshot => {
      console.log((snapshot.size+1).toString().padStart(3, "0"));
      console.log((1000).toString().padStart(3, "0"));
      snapshot.forEach(element => {
          console.log(element.data())
      });
    })
    console.log(resultado);

  }

  render() {

    const { usuarios, firebase } = this.props;
    if (!usuarios || !firebase) return <Spinner />;

    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Usuarios del Sistema"
        />

        <DataTableUsuarios usuarios={usuarios}/>

      </div>
    );
  }
}

const mapStateToProps = ({ firestore, firebase }) => {
  const { ordered } = firestore;
  return {
    usuarios: ordered.usuarios,

    firebase: firebase
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect([{
      collection: "usuarios"
    }])
  )
    (Users));
