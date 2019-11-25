import Line from './Line';
import Point from './Point';
import DependentPoint from './DependentPoint';
import DependentLine from './DependentLine';

/**
 * ViewModel class for the frontend, tracks the state of the game and makes it available to the view
 */
class GameState {

    constructor(depPoints, depLines) {
        this.depPoints = depPoints;
        this.depLines = depLines;
    }

    /**
     * Returns concrete points and lines reflecting all dependent points and lines
     * @returns an object with points, the points, and lines, the lines to draw
     */
    getPointsAndLines = () => {
        return { points: this.depPoints.map(dp => dp.getPoint()).filter(p => p != null), lines: this.depLines.map(dl => dl.getLine()).filter(l => l != null) };
    }

}

export default GameState;