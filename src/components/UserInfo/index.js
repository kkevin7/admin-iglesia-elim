import React, {Fragment} from 'react';
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux'
import {userSignOut} from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';
import { withRouter } from "react-router-dom";
// user image
import avatarImg from '../../assets/images/users/user.png';
import SweetAlert from 'react-bootstrap-sweetalert';


class UserInfo extends React.Component {

  state = {
    anchorEl: null,
    open: false,
    showAlert: false
  };

  handleClick = event => {
    this.setState({open: true, anchorEl: event.currentTarget});
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
      showAlert: true
     });
  };

  handleProfile = () => {
    // console.log(this.props);
    const {history, match} = this.props;
    history.push(`${match.url}/profile`);
  }

  handleCloseSession = () => {
    this.setState({showAlert: false});
    this.props.userSignOut();
  }

  render() {

    const {profile} = this.props;

    
    return (
      <Fragment>
      <SweetAlert
                show={this.state.showAlert}
                warning
                showCancel
                title="¿Deseas salir de sistema?"
                onfirmBtnText="SALIR"
                confirmBtnBsStyle="primary"
                cancelBtnBsStyle="secondary"
                onConfirm={this.handleCloseSession}
                onCancel={() => this.setState({showAlert: false})}
                focusCancelBtn
              >
                Ya no podras seguir utilizando las funciones del sistema
              </SweetAlert>
      <div className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt='...'
          src={avatarImg}
          className="user-avatar "
        />
        <div className="user-detail">
          <h4 className="user-name" onClick={this.handleClick}>
            {profile.isEmpty ? 'Nombre de Usuario' : profile.nombre+" "+profile.apellido }
            <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
          </h4>
        </div>
        <Menu className="user-info"
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              open={this.state.open}
              onClose={this.handleRequestClose}
              PaperProps={{
                style: {
                  minWidth: 120,
                  paddingTop: 0,
                  paddingBottom: 0
                }
              }}>
          <MenuItem onClick={this.handleProfile}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
              Perfil
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>
            Contribuciones
          </MenuItem>
          <MenuItem onClick={() => {
            this.handleRequestClose();
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>
            Cerrar sesión
          </MenuItem>
          
        </Menu>
      </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({settings, firebase}) => {
  const {profile} = firebase;
  const {locale} = settings;
  return {locale, profile}
};
export default withRouter(connect(mapStateToProps, {userSignOut})(UserInfo));


