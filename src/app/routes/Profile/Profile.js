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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log(this.props);
  }

  render() {
    

    return (
      <div className="app-wrapper">
        <ProfileHeader />
        {/* <Biography/> */}

        <div className="jr-profile-content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-7 col-12">
              <About aboutList={this.state.userData} />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-5 col-12">
              <Contact />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    // cuotas: state.firestore.ordered.cuotas
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => [
      {
        collection: "usuarios"
      }
    ])
  )(Profile)
);
