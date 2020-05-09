import React from 'react';
import logo from './logo.svg';
import './App.css';
import Point from './models/Point';
import Line from './models/Line';
import GameState from './models/GameState';
import { BasePoint, IntersectPoint, FoldPoint } from './models/DependentPoint';
import DependentLine, { BaseLine, ThroughLine, BetweenLine } from './models/DependentLine';
import Tool, { IntersectTool, FoldTool, ThroughTool, BetweenTool, SelectSolutionTool } from './models/Tools';
import Cookies from 'js-cookie';
/**
 * The GameCanvas draws the points and lines and handles interactions to create new points and lines.
 */
class GameCanvas extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      points: [],
      lines: [],
      selectedPoints: [],
      selectedLines: [],
      selectedTool: new IntersectTool(this.viewModel)
    };
    this.viewModel = new GameState([], []);
  }

  async componentDidMount() {

    const res = await fetch('http://127.0.0.1:8000/levels/level/?id='+this.props.levelID, {
      method: "get",
      //credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        'authorization': 'token '+Cookies.get('session-id')
      }});
    //console.log(res);
    const level = await res.json()
    const levelData = JSON.parse(level.levelData)
      alert(level.task);

    this.setState({
      points: levelData.points.map(point => new Point(point.x, point.y)),
      lines: levelData.lines.map(line => new Line(new Point(line.p1.x, line.p1.y), new Point(line.p2.x, line.p2.y))),
      solutions: JSON.parse(level.clientSolutions)
    })
    var pointID = 0;
    var lineID = 0;
    this.viewModel.depPoints = this.state.points.map(point => new BasePoint(point, pointID++));
    this.viewModel.depLines = this.state.lines.map(line => new BaseLine(line, lineID++));
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

  didWin = (solutionPoints, solutionLines) => {
    const dsPoints = solutionPoints.map(p => p.getData());
    const dsLines = solutionLines.map(l => l.getData());
    fetch("http://localhost:8000/levels/solve", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                'authorization': 'token '+Cookies.get('session-id')
            },
            body: JSON.stringify({levelID: this.props.levelID, points: dsPoints, lines: dsLines}),
            credentials: 'include'
        }).then(res => {
          if (res.status == 200) {
            this.props.completedLevel();
          }
    });
  }

  toolSelected = (tool) => (e) => {
    console.log(typeof (tool));
    this.setState({ selectedTool: tool });
    this.checkTool();
  }

  render() {
    return (
      <div>
      <h1>Game</h1>
        <canvas ref="canvas" width={640} height={600} onClick={this.userClicked} />
        <br />
        <button name="intersectTool" onClick={this.toolSelected(new IntersectTool(this.viewModel))}>Intersect</button>
        <button name="foldTool" onClick={this.toolSelected(new FoldTool(this.viewModel))}>Fold Point</button>
        <button name="throughTool" onClick={this.toolSelected(new ThroughTool(this.viewModel))}>Fold through</button>
        <button name="betweenTool" onClick={this.toolSelected(new BetweenTool(this.viewModel))}>Fold Between</button>
        <button name="SolutionCheck" onClick={this.toolSelected(new SelectSolutionTool(this.viewModel, this.state.solutions, this.didWin))}>Check Solution</button>
      </div>
    )
  }
}
export default GameCanvas;