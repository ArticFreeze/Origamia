import React from 'react';
import logo from './logo.svg';
import './App.css';
import Point from './models/Point';
import Line from './models/Line';
import GameState from './models/GameState';
import { BasePoint, IntersectPoint } from './models/DependentPoint';
import { ThroughLine, BetweenLine } from './models/DependentLine';
class GameCanvas extends React.Component {

  state = {
    points:[],
    lines:[]
  }

  constructor(props) {
    super(props);
    var bp1 = new BasePoint(new Point(400,0));
    var bp2 = new BasePoint(new Point(0,400));
    var thrl1 = new ThroughLine(bp1, bp2);
    var btl1 = new BetweenLine(bp1, bp2);
    var intersect = new IntersectPoint(thrl1, btl1);
    this.viewModel = new GameState([bp1, bp2, intersect], [thrl1, btl1]);
    this.state = this.viewModel.getPointsAndLines();
  }

    componentDidMount() {
        console.log("Drawing");
        const canvas = this.refs.canvas; //saving canvas elem to var
        var ctx = canvas.getContext("2d"); //drawing object, will be drawing on this
        if (ctx != null) {  
         ctx.lineWidth = 1.5;
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