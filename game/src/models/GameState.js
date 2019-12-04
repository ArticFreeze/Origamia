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
     * Returns the dependent line that resolves to a specified concrete line.
     * @param {Line} line The concrete line of interest.
     * @returns {DependentLine} The dependent line that resolves to the specified line.
     */
    getDependentLine = (line) => {
        const candidates = this.depLines.filter(dl => {
            return dl.getLine().includes(line);
        });
        if (candidates.length == 0) {
            return null;
        } else {
            return candidates[0];
        }
    }

    /**
     * Returns the dependent point that resolves to a specified concrete point.
     * @param {Point} point The concrete point of interest.
     * @returns {DependentPoint} The dependent point that resolves to the specified point.
     */
    getDependentPoint = (point) => {
        const candidates = this.depPoints.filter(dp => {
            return dp.getPoint().includes(point);
        });
        if (candidates.length == 0) {
            return null;
        } else {
            return candidates[0];
        }
    }

    /**
     * Returns concrete points and lines reflecting all dependent points and lines
     * @returns an object with points, the points, and lines, the lines to draw
     */
    getPointsAndLines = () => {
        return { points: this.depPoints.flatMap(dp => dp.getPoint()), lines: this.depLines.flatMap(dl => dl.getLine()) };
    }

}

export default GameState;