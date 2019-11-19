import React, { Component } from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import ProfileCard from 'components/ProfileCard/index';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title="Perfil de Usuario"/>
                <ProfileCard/>
            </div>
        );
    }
}

export default Profile;