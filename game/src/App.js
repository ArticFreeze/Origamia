import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import GameCanvas from './GameCanvas';
import Login from './Pages/Login.js';
import Register from './Pages/Register.js';
import Logout from './Pages/Logout.js';
const ST_LOGIN = 0;
const ST_REGISTER = 1;
const ST_HOME = 2;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: ST_LOGIN,
            username: ''
        }
    }

    signedIn = (e) => {
        this.setState({
            loaded: ST_HOME,
            username: e
        });
    }

    signedOut = () => {
        this.setState({
            loaded: ST_LOGIN,
            username: ''
        });
    }

    doLogin = () => {
        this.setState({
            loaded: ST_LOGIN
        });
    }

    doRegister = () => {
        this.setState({
            loaded: ST_REGISTER
        });
    }

    render() {
        switch (this.state.loaded) {
            case ST_LOGIN:
                return (<Login didLogIn={this.signedIn} doRegister={this.doRegister}/>);
            case ST_REGISTER:
                return (<Register didLogIn={this.signedIn} doLogin={this.doLogin}/>);
            case ST_HOME:
                return (<div>
                    <Logout username = {this.state.username} didLogOut={this.signedOut} />
                    <GameCanvas />
                </div>
                );
        }
    }
}
export default App;
