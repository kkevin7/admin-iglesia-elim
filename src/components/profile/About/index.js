import React from "react";
import moment from "moment";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Widget from "components/Widget/index";
import AboutItem from "./AboutItem";

class About extends React.Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      aboutList: [
        {
          title: "Carnet",
          icon: "zmdi zmdi-account-box-mail jr-fs-xlxl text-orange",
          desc: props.profile.carnet ? props.profile.carnet : "",
          userList: null
        },
        {
          title: "Dirección",
          icon: "zmdi zmdi-home jr-fs-xlxl text-orange",
          desc: props.profile.direccion ? props.profile.direccion : "",
          userList: null
        },
        {
          title: "Cumpleaños",
          icon: "zmdi zmdi-cake jr-fs-xlxl text-orange",
          desc: props.profile.fecha_nacimiento ? moment(props.profile.fecha_nacimiento.toDate()).format("LL"): "",
          userList: null
        },
        {
          title: "Departamento",
          icon: "zmdi zmdi-city-alt jr-fs-xlxl text-orange",
          desc: props.profile.departamento ? props.profile.departamento : "",
          userList: null
        },
        {
          title: "Té uniste",
          icon: "zmdi zmdi-check-square jr-fs-xlxl text-orange",
          desc: props.profile.fecha_socio ? moment(props.profile.fecha_socio.toDate()).format("LL"): "",
          userList: null
        },
        {
          title: "Tipo de Usuario",
          icon: "zmdi zmdi-star jr-fs-xlxl text-orange",
          desc: props.profile.rol ? props.profile.rol : "",
          userList: null
        }
      ],
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, aboutList } = this.state;
    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header">
    <h4 className="card-title mb-0 text-uppercase">{`${this.props.title ? this.props.title : '' }`}</h4>
        </div>
        <div className="jr-tabs-classic">
          {/* <Tabs className="jr-tabs-up" value={value} onChange={this.handleChange}>
            <Tab className="jr-tabs-label" label="Overview"/>
            <Tab className="jr-tabs-label" label="Work"/>
            <Tab className="jr-tabs-label" label="Education"/>
          </Tabs> */}
          <div className="jr-tabs-content jr-task-list">
            <div className="row">
              {value === 0 && aboutList.map((about, index) => <div key={index}
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about} /></div>)}
              {value === 1 && aboutList.map((about, index) => <div key={index}
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about} /></div>)}
              {value === 2 && aboutList.map((about, index) => <div key={index}
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about} /></div>)}
            </div>
          </div>
        </div>
      </Widget>
    );
  }
}


export default About;
