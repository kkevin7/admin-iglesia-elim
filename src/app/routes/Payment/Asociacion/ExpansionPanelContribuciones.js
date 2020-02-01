import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//Expansion Panel
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//Components
import CardContribucion from "app/routes/Payment/Contribuciones/CardContribucion";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const ExpansionPanelContribuciones = ({ contribuciones }) => {
  const classes = useStyles();
  return (
    <div className={`${classes.root} my-4`}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-verContribuciones"
          id="panel-verContribuciones"
        >
          <Typography className={classes.heading}>
            Ver Contribuciones
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="col-12">
            <div className="row">
            {contribuciones.map(contribucion => (
            <div className="col-md-6 col-12 mb-3" key={contribucion.id}>
              <CardContribucion key={contribucion.id} contribucion={contribucion} />
            </div>
          ))}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ExpansionPanelContribuciones;
