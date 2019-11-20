import Line from './Line';
import Point from './Point';
import DependentPoint from './DependentPoint';
import DependentLine from './DependentLine';

/**
 * ViewModel class for the frontend, tracks the state of the game and makes it available to the view
 */
class GameState {

    constructor(depPoints,depLines) {
        this.depPoints=depPoints;
        this.depLines=depLines;
    }

    /**
     * Returns concrete points and lines reflecting all dependent points and lines
     * @returns an object with points, the points, and lines, the lines to draw
     */
    getPointsAndLines = () => {
        var lines = [];
        var points=[];
        this.depPoints.forEach(p => {
            points.push(p.getPoint());
        });
        this.depLines.forEach(l => {
            lines.push(l.getLine());
        });
        return {points: points, lines: lines};
    }
    
}

export default GameState;