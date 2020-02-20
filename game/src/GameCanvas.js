import React from 'react';
import logo from './logo.svg';
import './App.css';
import Point from './models/Point';
import Line from './models/Line';
import GameState from './models/GameState';
import { BasePoint, IntersectPoint, FoldPoint } from './models/DependentPoint';
import { ThroughLine, BetweenLine } from './models/DependentLine';
import Tool, { IntersectTool, FoldTool, ThroughTool, BetweenTool } from './models/Tools';
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
    var bp3 = new BasePoint(new Point(150, 40));
    var fp = new FoldPoint(bp3, thrl1);
    this.viewModel = new GameState([bp1, bp2, intersect, bp3, fp], [thrl1, btl1]);
    const tempState = this.viewModel.getPointsAndLines();
    this.state = {
      points: tempState.points,
      lines: tempState.lines,
      selectedPoints: [],
      selectedLines: [],
      selectedTool: new IntersectTool(this.viewModel)
    };
  }

  async componentDidMount() {

    const res = await fetch('http:127.0.0.1:8000/templevel');
    console.log(res);
    const level = await res.json()

    this.setState({
      points: level.points,
      lines: level.lines
    })

    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const canvas = this.refs.canvas; //saving canvas elem to var
    var ctx = canvas.getContext("2d"); //drawing object, will be drawing on this
    if (ctx != null) {
      ctx.fillStyle = 'black';
      ctx.strokeStyle = 'black';
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
      ctx.strokeStyle = 'blue';
      this.state.selectedLines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.p1.x, line.p1.y);
        ctx.lineTo(line.p2.x, line.p2.y);
        ctx.stroke();
      })
    }
  }

  userClicked = (e) => {
    const clickPoint = new Point(e.clientX - this.refs.canvas.offsetLeft, e.clientY - this.refs.canvas.offsetTop);
    var closePoints = this.state.points.filter(p => p.distance(clickPoint) < 20);
    closePoints.sort((p1, p2) => p1.distance(clickPoint) - p2.distance(clickPoint));

    var closeLines = this.state.lines.filter(l => l.distance(clickPoint) < 20);
    closeLines.sort((l1, l2) => l1.distance(clickPoint) - l2.distance(clickPoint));
    if (closePoints.length > 0) {
      var sPoints = this.state.selectedPoints;
      if (sPoints.includes(closePoints[0])) {
        sPoints.splice(sPoints.indexOf(closePoints[0]), 1);
      } else {
        sPoints.push(closePoints[0]);
      }
      this.setState({ selectedPoints: sPoints });
    } else if (closeLines.length > 0) {
      var sLines = this.state.selectedLines;
      if (sLines.includes(closeLines[0])) {
        sLines.splice(sLines.indexOf(closeLines[0]), 1);
      } else {
        sLines.push(closeLines[0]);
      }
      this.setState({ selectedLines: sLines });
    }
    this.checkTool();
  }

  checkTool = () => {
    const temp = this.state.selectedTool.doAction(this.state.selectedPoints, this.state.selectedLines);
    if (temp.newPoints.length > 0 || temp.newLines.length > 0) {
      temp.newPoints.forEach(newPoint => {
        this.viewModel.depPoints.push(newPoint);
      });
      temp.newLines.forEach(newLine => {
        this.viewModel.depLines.push(newLine);
      });
      const temp2 = this.viewModel.getPointsAndLines();
      this.setState({ points: temp2.points, lines: temp2.lines, selectedPoints: [], selectedLines: [] });
    }
  }

  toolSelected = (tool) => (e) => {
    console.log(typeof (tool));
    this.setState({ selectedTool: tool });
    this.checkTool();
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={640} height={600} onClick={this.userClicked} />
        <br />
        <button name="intersectTool" onClick={this.toolSelected(new IntersectTool(this.viewModel))}>Intersect</button>
        <button name="foldTool" onClick={this.toolSelected(new FoldTool(this.viewModel))}>Fold Point</button>
        <button name="throughTool" onClick={this.toolSelected(new ThroughTool(this.viewModel))}>Fold through</button>
        <button name="betweenTool" onClick={this.toolSelected(new BetweenTool(this.viewModel))}>Fold Between</button>
      </div>
    )
  }
}
export default GameCanvas;