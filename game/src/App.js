import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import GameCanvas from './GameCanvas';
import Login from './Pages/Login.js';
import Register from './Pages/Register.js';
import Logout from './Pages/Logout.js';
import LevelMenu from './Pages/LevelMenu';
const ST_LOGIN = 0;
const ST_REGISTER = 1;
const ST_HOME = 2;
const ST_LEVEL = 3;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: ST_LOGIN,
            username: '',
            levelID: 1
        }
    }

    signedIn = (e) => {
    console.log("Login Successful");
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

    didSelectLevel = (id) => {
        this.setState({
            loaded: ST_LEVEL,
            levelID: id
        });
    }

    doRegister = () => {
        this.setState({
            loaded: ST_REGISTER
        });
    }

    completedLevel = () => {
        this.setState({
            loaded: ST_HOME,
            levelID: 1
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
                    <LevelMenu didSelectLevel={this.didSelectLevel} />
                </div>
                );
            case ST_LEVEL:
                 return (
                    <div>
                        <Logout username = {this.state.username} didLogOut={this.signedOut} />
                        <GameCanvas levelID={this.state.levelID} completedLevel={this.completedLevel}/>
                    </div>
                );
        }
    }
}
export default App;
