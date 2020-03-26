import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import GameCanvas from './GameCanvas';
import Login from './Pages/Login.js';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Login />
            </div>

        );
    }
}
export default App;
