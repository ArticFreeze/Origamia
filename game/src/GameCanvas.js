import React from 'react';
import logo from './logo.svg';
import './App.css';
import Point from './models/Point';
import Line from './models/Line';
import GameState from './models/GameState';
import { BasePoint, IntersectPoint } from './models/DependentPoint';
import { ThroughLine, BetweenLine } from './models/DependentLine';

/**
 * The GameCanvas draws the points and lines and handles interactions to create new points and lines.
 */
class GameCanvas extends React.Component {



  constructor(props) {
    super(props);
    var bp1 = new BasePoint(new Point(300, 100));
    var bp2 = new BasePoint(new Point(100, 300));
    var thrl1 = new ThroughLine(bp1, bp2);
    var btl1 = new BetweenLine(bp1, bp2);
    var intersect = new IntersectPoint(thrl1, btl1);
    this.viewModel = new GameState([bp1, bp2, intersect], [thrl1, btl1]);
    const tempState = this.viewModel.getPointsAndLines();
    this.state = {
        points: tempState.points,
        lines: tempState.lines,
        selectedPoints: [],
        selectedLines: [],
        selectedTool: 0
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const canvas = this.refs.canvas; //saving canvas elem to var
    var ctx = canvas.getContext("2d"); //drawing object, will be drawing on this
    if (ctx != null) {
      ctx.fillStyle = 'black';
      ctx.lineWidth = 1.5;
      this.state.lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.p1.x, line.p1.y);
        ctx.lineTo(line.p2.x, line.p2.y);
        ctx.stroke();
      });
      this.state.points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
      })
      ctx.fillStyle = 'blue';
      this.state.selectedPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
        ctx.fill();
     })
    }
  }

    userClicked = (e) => {
        const clickPoint = new Point(e.clientX - this.refs.canvas.offsetLeft, e.clientY - this.refs.canvas.offsetTop);
        console.log(clickPoint);
        var closePoints = this.state.points.filter(p => p.distance(clickPoint) < 20);
        closePoints.sort((p1,p2) => p1.distance(clickPoint) - p2.distance(clickPoint));
        if (closePoints.length > 0) {
            var sPoints = this.state.selectedPoints;
            sPoints.push(closePoints[0]);
            this.setState({selectedPoints: sPoints});
        } else {

        }
    }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={640} height={600} onClick={this.userClicked}/>
        <br />
        <button name="intersectTool">Intersect</button>
        <button name="throughTool">Fold through</button>
        <button name="betweenTool">Fold Between</button>
      </div>
    )
  }
}
export default GameCanvas;