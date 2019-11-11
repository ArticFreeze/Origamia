import React from 'react';
import logo from './logo.svg';
import './App.css';
import Point from './models/Point';
import Line from './models/Line';
import GameState from './models/GameState';
class GameCanvas extends React.Component {

  state = {
    points: [
      new Point(400,200),
      new Point(300,500)
    ],
    lines: [
      new Line(new Point(0,0),new Point(640,600)),
      new Line(new Point(0,600),new Point(640,0))
    ]
  }

  constructor(props) {
    super(props);
  }

    componentDidMount() {
        const canvas = this.refs.canvas; //saving canvas elem to var
        var ctx = canvas.getContext("2d"); //drawing object, will be drawing on this
        ctx.lineWidth = 2;
        if (ctx != null) {
          this.state.lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.p1.x,line.p1.y);
            ctx.lineTo(line.p2.x,line.p2.y);
            ctx.stroke();
          });
          this.state.points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x,point.y,5,0,2*Math.PI,false);
            ctx.fill();
          })
        }
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