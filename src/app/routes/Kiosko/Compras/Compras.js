import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from 'moment';
//Components
import DataTableCompras from "./DataTableCompras";
import Spinner from "components/Spinner/Spinner";

class Compras extends Component {
    state = {  }
    render() {
        const {compras} = this.props;
        if(!compras) return <Spinner/>

        return (
            <div className="app-wrapper">
                <DataTableCompras
                    compras={compras}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ firestore}) => {
    return {
        compras: firestore.ordered.compras,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      
    };
  };
  
  export default withRouter(
    compose(
      connect(
        mapStateToProps,
        mapDispatchToProps
      ),
      firestoreConnect([{
          collection: "compras",
          orderBy: [["fecha", "desc"]]
      }])
    )(Compras)
  );