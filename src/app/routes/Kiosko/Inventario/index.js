import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import ContainerHeader from 'components/ContainerHeader/index';

import {connect} from 'react-redux';

class BookStore extends Component {
    state = {  };

    render() {

        console.log(this.props);

        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title="Librería"/>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return{
//         productos: state.productos.productos
//     }
// }

const mapStateToProps = ({producto}) => {
    const productos = producto;
    return productos
};

export default withRouter(connect(mapStateToProps)(BookStore));