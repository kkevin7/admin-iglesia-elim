import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Widget from "components/Widget/index";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

const ListYears = ({ history, usuario, profile }) => {
  const classes = useStyles();

  const redirectYear = year => {
    history.push(`/app/profileContribucion/${year}`);
  };

  let listItemYears = [];
  if (profile.fecha_socio) {
    for (
      let year = (new Date()).getFullYear();
      year >= profile.fecha_socio.toDate().getFullYear();
      year--
    ) {
      listItemYears.push(
        <Fragment key={year}>
          <ListItem button onClick={() => redirectYear(year)}>
            <ListItemText className="text-center" primary={`${year}`} />
          </ListItem>
          <Divider />
        </Fragment>
      );
      if(((new Date()).getFullYear() - profile.fecha_socio.toDate().getFullYear() + 1) > 20){
        break;
      }
    }
  }

  return (
    <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
      <div className="card-header">
        <h4 className="card-title mb-0 text-uppercase text-center">
          Selecciona un año
        </h4>
      </div>
      <div className="jr-tabs-classic">
        <List
          component="nav"
          className={`${classes.root} mx-auto `}
          aria-label="mailbox folders"
        >
          {listItemYears}
        </List>
      </div>
    </Widget>
  );
};

export default withRouter(ListYears);
