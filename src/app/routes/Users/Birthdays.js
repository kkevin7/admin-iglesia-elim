import React, { Component } from "react";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
//Redux
import {birthdaysMes} from "actions/authActions";
//Card
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
//Icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
//Components
import Spinner from "components/Spinner/Spinner";
import DataTableBirthdays from "app/routes/Users/DataTableBirthdays";

class Birthdays extends Component {
  state = {};

  redirectGoBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  componentDidMount(){
    const {birthdaysMes} = this.props;
    birthdaysMes();
  }

  render() {
    const {birthdays} = this.props;
    if(!birthdays) return <Spinner/>

    return (
      <div className="app-wrapper">
        <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
          <h2 className="title mb-3 mb-sm-0">Cumpleañeros del Mes</h2>
          <Button
            variant="contained"
            className="my-1 bg-cyan text-white"
            startIcon={<ArrowBackIcon />}
            onClick={() => this.redirectGoBack()}
          >
            VOLVER
          </Button>
        </div>
        <DataTableBirthdays
          usuarios={birthdays}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authCustom }) => {
  return {
    birthdays: authCustom.birthdays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    birthdaysMes: async () => dispatch(birthdaysMes()),
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(),
  )(Birthdays)
);
