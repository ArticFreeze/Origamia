import React from 'react';
import logo from './logo.svg';
import './App.css';
class GameCanvas extends React.Component {

    componentDidMount() { //TODO: change name
        const canvas = this.refs.canvas; //saving canvas elem to var
        const ctx = canvas.getContext("2d"); //drawing object, will be drawing on this
        ctx.fillRect(0,0,100,100);
    }

    render() {
        return(
          <div>
            <canvas ref="canvas" width={640} height={600} />
          </div>
        )
    }
}
export default GameCanvas;