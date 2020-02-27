import Point from './Point';
import Line, { slope, intersect } from './Line';
import DependentPoint, { BasePoint, IntersectPoint, FoldPoint } from './DependentPoint';
import DependentLine, { BaseLine, ThroughLine, BetweenLine } from './DependentLine';
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
    doAction = (selPoints, selLines) => {
        return { newPoints: [], newLines: [] };
    }

}

export class FoldTool extends Tool {
    constructor(gameState) {
        super(gameState);
    }

    doAction = (selPoints, selLines) => {
        if (selLines.length == 1 && selPoints.length == 1) {
            const dp = this.gameState.getDependentPoint(selPoints[0]);
            const dl = this.gameState.getDependentLine(selLines[0]);
            return { newPoints: [new FoldPoint(dp, dl)], newLines: [] };
        }
        return { newPoints: [], newLines: [] };
    }
}

export class IntersectTool extends Tool {

    constructor(gameState) {
        super(gameState);
    }

    doAction = (selPoints, selLines) => {
        if (selLines.length == 2 && selPoints.length == 0) {
            const dl1 = this.gameState.getDependentLine(selLines[0]);
            const dl2 = this.gameState.getDependentLine(selLines[1]);
            return { newPoints: [new IntersectPoint(dl1, dl2)], newLines: [] };
        }
        return { newPoints: [], newLines: [] };
    }

}


export class BetweenTool extends Tool {
    constructor(gameState) {
        super(gameState);
    }

    doAction = (selPoints, selLines) => {
        if (selLines.length == 0 && selPoints.length == 2) {
            const dp1 = this.gameState.getDependentPoint(selPoints[0]);
            const dp2 = this.gameState.getDependentPoint(selPoints[1]);
            return { newPoints: [], newLines: [new BetweenLine(dp1, dp2)] };
        }
        return { newPoints: [], newLines: [] };
    }
}

export class ThroughTool extends Tool {
    constructor(gameState) {
        super(gameState);
    }

    doAction = (selPoints, selLines) => {
        if (selLines.length == 0 && selPoints.length == 2) {
            const dp1 = this.gameState.getDependentPoint(selPoints[0]);
            const dp2 = this.gameState.getDependentPoint(selPoints[1]);
            return { newPoints: [], newLines: [new ThroughLine(dp1, dp2)] };
        }
        return { newPoints: [], newLines: [] };
    }
}

export class SelectSolutionTool extends Tool {
    constructor(gameState, solutions) {
        super(gameState);
        this.solutions = solutions;
    }

    doAction = (selPoints, selLines) => {
        var failed = false;
        this.solutions.forEach(solution => {
            var passed = false;
            var id = 0;
            // Move base points and lines
            solution.basePoints.forEach(point => {
                selPoints.forEach(selPoint => {
                    selPoint.moveBasePoint(new Point(point.x, point.y), id);
                });
                selLines.forEach(selLine => {
                    selLine.moveBasePoint(new Point(point.x, point.y), id);
                })
                id++;
            });
            id = 0;
            solution.baseLines.forEach(line => {
                selPoints.forEach(selPoint => {
                    selPoint.moveBaseLine(new Line(new Point(line.p1.x, line.p1.y), new Point(line.p2.x, line.p2.y)));
                });
                selLines.forEach(selLine => {
                    selLine.moveBaseLine(new Line(new Point(line.p1.x, line.p1.y), new Point(line.p2.x, line.p2.y)));
                })
                id++;
            })
            // Sort selected points and lines
            selPoints.sort((p1, p2) => p1.x - p2.x || p1.y - p2.y);
            selLines.sort((l1, l2) => {
                const s1 = slope(l1); //slope1
                const s2 = slope(l2); //slope2
                if (s1 == s2) { //dealing with two parallel lines, has several cases
                    if (s1 == Number.NEGATIVE_INFINITY) { //two parallel vertical lines
                        return l2.p1.x - l1.p1.x;
                    }
                    return intersect(l2, new Line(new Point(0, 0), new Point(0, 1))).y - intersect(l1, new Line(new Point(0, 0), new Point(0, 1))).y; //two parallel lines
                }
                else return s2 - s1; //differing slopes
            });


            // Iterate over solutions to see if there is a match
            solution.solutions.forEach(option => {

            });

            if (!passed) {
                failed = true;
            }
        });

        if (!failed) {
            // TODO: Send win
        }
    }

}

export default Tool;