import Point from './Point';
import Line from './Line';
import DependentPoint, {BasePoint, IntersectPoint, FoldPoint} from './DependentPoint';
import DependentLine, {BaseLine, ThroughLine, BetweenLine} from './DependentLine';
import GameState from './GameState';
/**
 * The Tool class represents a tool for creating new points and lines.
 * Each tool waits until there are enough selected objects and then
 * creates a new object or objects.
 */
class Tool {

    /**
     * Create a Tool
     * @param {GameState} gameState The state of the game
     */
    constructor(gameState) {
        this.gameState = gameState;
    }

    /**
     * Given the selected points and lines, check if enough are selected to
     * create something.
     * 
     * @param {[Point]} selPoints The selected points.
     * @param {[Line]} selLines The selected lines.
     * @returns an object with fields newPoints for the new dependent points to create
     * and newLines for the new lines to create.
     */
    doAction = (selPoints,selLines) => {
        return {newPoints: [], newLines: []};
    }

}

export class FoldTool extends Tool {
    constructor(gameState) {
        super(gameState);
    }

    doAction = (selPoints,selLines) => {
        if (selLines.length == 1 && selPoints.length == 1) {
            const dp = this.gameState.getDependentPoint(selPoints[0]);
            const dl = this.gameState.getDependentLine(selLines[0]);
            return {newPoints: [new FoldPoint(dp,dl)], newLines: []};
        }
        return {newPoints: [], newLines: []};
    }
}

export class IntersectTool extends Tool {

    constructor(gameState) {
        super(gameState);
    }

    doAction = (selPoints,selLines) => {
        if (selLines.length == 2 && selPoints.length == 0) {
            const dl1 = this.gameState.getDependentLine(selLines[0]);
            const dl2 = this.gameState.getDependentLine(selLines[1]);
            return {newPoints: [new IntersectPoint(dl1,dl2)], newLines: []};
        }
        return {newPoints: [], newLines: []};
    }

}


export class BetweenTool extends Tool {
    constructor(gameState) {
        super(gameState);
    }

    doAction = (selPoints,selLines) => {
        if (selLines.length == 0 && selPoints.length == 2) {
            const dp1 = this.gameState.getDependentPoint(selPoints[0]);
            const dp2 = this.gameState.getDependentPoint(selPoints[1]);
            return {newPoints:[], newLines:[new BetweenLine(dp1,dp2)]};
        }
        return {newPoints: [], newLines: []};
    }
}

export class ThroughTool extends Tool {
    constructor(gameState) {
        super(gameState);
    }

    doAction = (selPoints,selLines) => {
        if (selLines.length == 0 && selPoints.length == 2) {
            const dp1 = this.gameState.getDependentPoint(selPoints[0]);
            const dp2 = this.gameState.getDependentPoint(selPoints[1]);
            return {newPoints: [], newLines:[new ThroughLine(dp1,dp2)]};
        }
        return {newPoints: [], newLines: []};
    }
}


export default Tool;