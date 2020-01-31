import React from "react";
import { connect } from "react-redux";
//Redux
import {buscarConcidencia} from "actions/BusquedaActions";

const SearchBox = ({ styleName, placeholder, onChange, value,  buscarConcidencia}) => {
  return (
    <div className={`search-bar right-side-icon bg-transparent ${styleName}`}>
      <div className="form-group">
        <input
          className="form-control border-0"
          type="search"
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e);
            buscarConcidencia(e.target.value)
          }
        }
          value={value}
        />
        <button className="search-icon">
          <i className="zmdi zmdi-search zmdi-hc-lg" />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    buscarConcidencia: async (busqueda) => dispatch(buscarConcidencia(busqueda)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBox);

SearchBox.defaultProps = {
  styleName: "",
  value: ""
};
