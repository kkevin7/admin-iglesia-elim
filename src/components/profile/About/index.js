import React from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Widget from "components/Widget/index";
// import {aboutList} from '../../../app/routes/socialApps/routes/Profile/data'
import AboutItem from "./AboutItem";

class About extends React.Component {

  state = {
  aboutList: [
      {
        title: "Dirección",
        icon: "zmdi zmdi-home jr-fs-xlxl text-orange",
        desc: "Barrio San Antonio, el cactus",
        userList: null
      },
      {
        title: "Cumpleaños",
        icon: "zmdi zmdi-cake jr-fs-xlxl text-orange",
        desc: "Noviembre 12, 1995",
        userList: null
      },
      {
        title: "Departamento",
        icon: "zmdi zmdi-city-alt jr-fs-xlxl text-orange",
        desc: "Santa Ana",
        userList: null
      },
      {
        title: "Té uniste",
        icon: "zmdi zmdi-check-square jr-fs-xlxl text-orange",
        desc: "Junio 30, 2017",
        userList: null
      }
    ],
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {value, aboutList} = this.state;
    return (
      <Widget styleName="jr-card-full jr-card-tabs-right jr-card-profile">
        <div className="card-header">
          <h4 className="card-title mb-0">Acerca de Mí</h4>
        </div>
        <div className="jr-tabs-classic">
          {/* <Tabs className="jr-tabs-up" value={value} onChange={this.handleChange}>
            <Tab className="jr-tabs-label" label="Overview"/>
            <Tab className="jr-tabs-label" label="Work"/>
            <Tab className="jr-tabs-label" label="Education"/>
          </Tabs> */}
          <div className="jr-tabs-content jr-task-list">
            <div className="row">
              {value === 0 && aboutList.map((about, index) => <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)}
              {value === 1 && aboutList.map((about, index) => <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)}
              {value === 2 && aboutList.map((about, index) => <div
                className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12"><AboutItem data={about}/></div>)}
            </div>
          </div>
        </div>
      </Widget>
    );
  }
}


export default About;
