import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from 'util/IntlMessages';

const Footer = () => {

    let newDate = new Date()
    return (
      <footer className="app-footer">
    <span className="d-inline-block">Copyright Misión Crisitiana Elim - UES OCC &copy; {newDate.getFullYear()}</span>
      </footer>
    );
  }
;

export default Footer;
