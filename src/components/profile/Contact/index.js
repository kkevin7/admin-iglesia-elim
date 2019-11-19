import React from "react";
import Widget from "components/Widget";
// import {contactList} from '../../../app/routes/socialApps/routes/Profile/data'


const Contact = () => {

  const contactList = [
    {
      icon: "zmdi zmdi-email jr-fs-xxl text-grey",
      title: "Email",
      desc: "Jorge.perez@gmail.com"
    },
    {
      icon: "zmdi zmdi-phone jr-fs-xxl text-greyy",
      title: "Teléfono",
      desc: "+503 7412-4598"
    }

  ];
  
  return (
    <Widget title="Contacto" styleName="jr-card-profile-sm">
      {contactList.map((data, index) =>
        <div key={index} className="media align-items-center flex-nowrap jr-pro-contact-list">
          <div className="mr-3">
            <i className={`zmdi zmdi-${data.icon} jr-fs-xxl text-grey`}/>
          </div>
          <div className="media-body">
            <span className="mb-0 text-grey jr-fs-sm">{data.title}</span>
            <p className="mb-0">{data.desc}</p>
          </div>
        </div>
      )}
    </Widget>
  )
}

export default Contact;
