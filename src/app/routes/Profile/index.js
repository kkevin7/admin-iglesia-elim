import React, { Component } from 'react';
import ProfileHeader from 'components/profile/ProfileHeader/index'
// import About from 'components/profile/About/index';
// import ProfileCard from 'components/ProfileCard/index';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            userData :{
                title : "Rodrigo Este es el titulo", 
                icon : null, 
                desc : null,
                userList : null
              }
        };
    }

    render() {
        return (
            <div className="app-wrapper">
                <ProfileHeader/>
                {/* <About dataUser={this.state.userData}/> */}
            </div>
        );
    }
}

export default Profile;