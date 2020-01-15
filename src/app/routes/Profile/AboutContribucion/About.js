import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Widget from "components/Widget/index";
//Components
import AboutItem from "./AboutItem";
import DataTableCuotas from "./DataTableCuotas";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutList: [
        {
          title: "Valor Cuota",
          icon: "zmdi zmdi-money jr-fs-xlxl text-orange",
          desc: props.contribucion.valor_cuota
            ? `$ ${props.contribucion.valor_cuota.toFixed(2)}`
            : null,
          userList: null
        },
        {
          title: "Cantidad de Cuotas",
          icon: "zmdi zmdi-format-list-numbered jr-fs-xlxl text-orange",
          desc: props.contribucion.cantidad_cuota
            ? props.contribucion.cantidad_cuota
            : null,
          userList: null
        },
        {
          title: "Fecha Incio",
          icon: "zmdi zmdi-calendar-alt jr-fs-xlxl text-orange",
          desc: props.contribucion.fecha_inicio
            ? moment(props.contribucion.fecha_inicio.toDate()).format("LL")
            : null,
          userList: null
        },
        {
          title: "Fecha Fin",
          icon: "zmdi zmdi-calendar jr-fs-xlxl text-orange",
          desc: props.contribucion.fecha_fin
            ? moment(props.contribucion.fecha_fin.toDate()).format("LL")
            : null,
          userList: null
        },
        {
          title: "Último Pago",
          icon: "zmdi zmdi-calendar-check jr-fs-xlxl text-orange",
          desc: props.contribucion.fecha_ultimo_pago
            ? moment(props.contribucion.fecha_ultimo_pago.toDate()).format("LL")
            : "Todavía no realizado",
          userList: null
        },
        {
          title: "Estado",
          icon: "zmdi zmdi-check-square jr-fs-xlxl text-orange",
          desc: props.contribucion.estado ? "ACTIVO" : "FINALIZADO",
          userList: null
        }
      ],
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, aboutList } = this.state;
    const { contribucion, cuotas } = this.props;

    console.log("cutoas ",cuotas);

    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header">
          <h4 className="card-title mb-0 text-uppercase">{`${
            this.props.title ? this.props.title : ""
            }: Inicio ${
            contribucion.fecha_inicio
              ? contribucion.fecha_inicio.toDate().getFullYear()
              : ""
            }`}</h4>
        </div>
        <div className="jr-tabs-classic">
          <Tabs
            className="jr-tabs-up"
            value={value}
            onChange={this.handleChange}
          >
            <Tab className="jr-tabs-label" label="Información" />
            <Tab className="jr-tabs-label" label="Cuotas" />
          </Tabs>
          <div className="jr-tabs-content jr-task-list">
            <div className="row">
              {value === 0 &&
                aboutList.map((about, index) => (
                  <div
                    key={index}
                    className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"
                  >
                    <AboutItem data={about} />
                  </div>
                ))}
              {value === 1 ? (
                <div className="col-12">
                  <DataTableCuotas cuotas={cuotas} />
                </div>
              ) : (
                  ""
                )}
            </div>
          </div>
        </div>
      </Widget>
    );
  }
}

const mapStateToProps = ({ firebase, firestore }) => {
  return {
    cuotas: firestore.ordered.cuotas && firestore.ordered.cuotas
  };
};

export default withRouter(
  compose(
    connect(mapStateToProps),
    firestoreConnect(props => {
      if (!props.usuario.uid) return [];
      if (!props.contribucion.id) return [];
      return [
        {
          collection: "cuotas",
          where: [["id_contribucion", "==", props.contribucion.id]],
          orderBy: ["fecha_inicio", "asc"]
        }
      ];
    })
  )(About)
);
