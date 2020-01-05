import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";
import userImageDefault from '../../../assets/images/users/user.png';
import Spinner from '../../../components/Spinner/Spinner';
import Button from "@material-ui/core/Button";
import moment from 'moment';

class Users extends Component {
  state = {};
  render() {

    const { usuarios, firebase } = this.props;
    if (!usuarios || !firebase) return <Spinner />;
    // console.log(usuarios);
    console.log(firebase);
    const usuariosAuth = firebase.firestore().collectionGroup('usuarios');
    console.log(usuarios);
    return (
      <div className="app-wrapper">
        <ContainerHeader
          match={this.props.match}
          title="Usuarios del Sistema"
        />

        {usuarios && usuarios.map(usuario => {
          return (
            <div key={usuario.id} className="animated slideInUpTiny animation-duration-3">
              <div className="user-list d-flex flex-row  card shadow">
                <div className="MuiAvatar-root user-avatar avatar-shadow">
                  <img alt={usuario.nombre+" "+usuario.apellido} src={userImageDefault} className="MuiAvatar-img"></img>
                </div>
                <div className="description">
                  <h5>{usuario.nombre} {usuario.apellido}</h5>
                  {/* <h6>Android Developer</h6> */}
                  <p className="text-muted">ID: {usuario.id}</p>
                  <p className="text-muted">Dirección: {usuario.direccion}</p>
                  <p className="text-muted">Teléfono: {usuario.telefono}</p>
                  <p className="text-muted">Socio desde: {moment(usuario.fecha_socio.toDate()).calendar()}</p>
                  {/* <ul className="list-inline d-sm-flex flex-sm-row jr-mbtn-list">
                    <li><Button variant="contained" color="primary" >VER PERFIL</Button></li>
                    <li><Button variant="contained" color="secondary" >ELIMINAR</Button></li>
                  </ul> */}
                  <div className="row ">
                    <Button variant="contained" className="m-1" color="primary" >VER PERFIL</Button>
                    <Button variant="contained" className="m-1" color="secondary" >ELIMINAR</Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

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
