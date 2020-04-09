import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import GameCanvas from './GameCanvas';
import Login from './Pages/Login.js';
import Register from './Pages/Register.js';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Register />
            </div>

        );
    }
}
export default App;
