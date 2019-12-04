import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import GameCanvas from './GameCanvas';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <GameCanvas />
            </div>
        );
    }
}
export default App;
