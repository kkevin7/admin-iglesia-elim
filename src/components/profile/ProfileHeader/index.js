import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  navLink: {
    noUnderline: "text-decoration: none !important",
  }
}));

const ProfileHeader = ({ usuario, profile, contribuciones }) => {
  const classes = useStyles();
  let anios = moment.duration(moment(new Date()).diff('2018-02-06')).years();
  let meses = moment.duration(moment(new Date()).diff('2018-02-06')).months();

  return (
    <div className="jr-profile-banner">
      <div className="jr-profile-container">
        <div className="jr-profile-banner-top">
          <div className="jr-profile-banner-top-left">
            <div className="jr-profile-banner-avatar">
              <Avatar
                className="size-90"
                alt="..."
                src={require("assets/images/users/user.png")}
              />
            </div>
            <div className="jr-profile-banner-avatar-info">
              <h2 className="mb-2 jr-mb-sm-3 jr-fs-xxl jr-font-weight-light">{`${profile.nombre} ${profile.apellido}`}</h2>
              <p className="mb-0 jr-fs-lg">
                {`${profile.departamento}`}, El Salvador
              </p>
            </div>
          </div>
          {contribuciones ? (
            <div className="jr-profile-banner-top-right">
              <ul className="jr-follower-list">
                <li>
                  <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{`${contribuciones.length}`}</span>
                  <span className="jr-fs-sm">Contribuciones</span>
                </li>
                {profile.fecha_socio ? (
                  <li>
                    <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">{`${moment.duration(moment(new Date()).diff(profile.fecha_socio.toDate())).years() > 0 ? moment.duration(moment(new Date()).diff(profile.fecha_socio.toDate())).years() : moment.duration(moment(new Date()).diff(profile.fecha_socio.toDate())).months()} `}</span>
                    <span className="jr-fs-sm">{` ${moment.duration(moment(new Date()).diff(profile.fecha_socio.toDate())).years() > 0 ? "Años" : "Meses"} de Socio`}</span>
                  </li>
                ) : ""}
                {/* <li>
                <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">327</span>
                <span className="jr-fs-sm">Friends</span>
              </li> */}
              </ul>
            </div>
          ) : ""}
        </div>
        <div className="jr-profile-banner-bottom">
          <div className="jr-tab-list">
            <ul className="jr-navbar-nav">
              <li>
                <NavLink to="/app/profile" className={classes.no} >
                  <span className="jr-link">Información</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/app/profileContribucion/${(new Date()).getFullYear()}`} className={classes.noUnderline} >
                  <span className="jr-link">Contribuciones</span>
                </NavLink>
              </li>
              {/* <li>
                <span className="jr-link">Cuotas</span>
              </li> */}
            </ul>
          </div>
          {/* <span className="jr-link jr-profile-setting">
            <i className="zmdi zmdi-settings mr-2"/>
            <span className="d-inline-flex align-middle ml-1 jr-ml-sm-0">Setting</span>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProfileHeader);
