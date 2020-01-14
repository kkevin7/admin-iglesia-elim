import React from "react";
import Avatar from "@material-ui/core/Avatar";

const ProfileHeader = ({ profile }) => {
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
          {/* <div className="jr-profile-banner-top-right">
            <ul className="jr-follower-list">
              <li>
                <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">2k+</span>
                <span className="jr-fs-sm">Followers</span></li>
              <li>
                <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">847</span>
                <span className="jr-fs-sm">Following</span></li>
              <li>
                <span className="jr-follower-title jr-fs-lg jr-font-weight-medium">327</span>
                <span className="jr-fs-sm">Friends</span>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="jr-profile-banner-bottom">
          <div className="jr-tab-list">
            <ul className="jr-navbar-nav">
              <li>
                <span className="jr-link">Información</span>
              </li>
              <li>
                <span className="jr-link">Cuotas</span>
              </li>
              <li>
                <span className="jr-link">Contribuciones</span>
              </li>
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

export default ProfileHeader;
