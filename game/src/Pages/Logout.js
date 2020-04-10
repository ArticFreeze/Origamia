import React from 'react';
import Cookies from 'js-cookie';

class Logout extends React.Component {



    constructor(props) {
        super(props);
    }

    logout = (e) => {
        fetch("http://localhost:8000/logout", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                'authorization': 'token '+Cookies.get('session-id')
            },
            body: {}
        });
        this.props.didLogOut();
    }

    render = () => {
        return (
            <div>
                Logged in as {this.props.username}
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export default Logout;