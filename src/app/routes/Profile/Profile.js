import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";

//Components
import ProfileHeader from "components/profile/ProfileHeader/index";
import Biography from "components/profile/Biography/index";
import About from "components/profile/About/index";
import Contact from "components/profile/Contact/index";
// import ProfileCard from 'components/ProfileCard/index';
import Spinner from "components/Spinner/Spinner";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
      console.log("DidMount ", this.props)
  }

  render() {
    const {usuario, profile} = this.props;
    if(!usuario || profile.isEmpty) return <Spinner/>

    return (
      <div className="app-wrapper">
        <ProfileHeader profile={profile} />
        {/* <Biography/> */}

        <div className="jr-profile-content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-7 col-12">
              <About usuario={usuario} profile={profile} />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-5 col-12">
              <Contact usuario={usuario} profile={profile} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({firebase}) => {
    console.log(firebase)
  return {
    usuario: firebase.auth,
    profile: firebase.profile
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect()
  )(Profile)
);
