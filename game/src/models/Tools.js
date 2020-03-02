import Point from './Point';
import Line, { slope, intersect } from './Line';
import DependentPoint, { BasePoint, IntersectPoint, FoldPoint } from './DependentPoint';
import DependentLine, { BaseLine, ThroughLine, BetweenLine } from './DependentLine';
import DependentObject from './DependentObject';
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

const eps = .01;

/**
 * Checks whether or not selected points and lines form a solution to a level.  This works by considering what happens when the base points and lines are repositioned and whether or not the dependent objects are appropriately positioned when this happens.  For example, a midpoint between two base points should remain approximately halfway between two base points (give or take floating point error).
 * @param {[DependentPoint]} dSelPoints The selected points.
 * @param {[DependentLine]} dSelLines The selected lines.
 * @param {[Any]} solutions The solution cases to check.
 * @returns true if all tests pass, false otherwise.
 */
export const checkSolution = (dSelPoints, dSelLines, solutions) => {
    var failed = false;
        solutions.forEach(solution => {
            var currentCasePassed = false;
            var id = 0;
            // Move base points and lines
            const originalPoints = solution.basePoints.map(point => {
                var ret = null;
                dSelPoints.forEach(selPoint => {
                    if (selPoint != null)
                        ret = ret != null ? ret : selPoint.moveBasePoint(new Point(point.x, point.y), id);
                });
                dSelLines.forEach(selLine => {
                    if (selLine != null)
                        ret = ret != null ? ret : selLine.moveBasePoint(new Point(point.x, point.y), id);
                })
                id++;
                return ret;
            });
            id = 0;
            const originalLines = solution.baseLines.map(line => {
                var ret = null;
                dSelPoints.forEach(selPoint => {
                    ret = ret != null ? ret : selPoint.moveBaseLine(new Line(new Point(line.p1.x, line.p1.y), new Point(line.p2.x, line.p2.y)));
                });
                dSelLines.forEach(selLine => {
                    ret = ret != null ? ret : selLine.moveBaseLine(new Line(new Point(line.p1.x, line.p1.y), new Point(line.p2.x, line.p2.y)));
                })
                id++;
                return ret;
            })
            // Sort selected points and lines
            dSelPoints.sort((p1, p2) => p1.x - p2.x || p1.y - p2.y);
            dSelLines.sort((l1, l2) => {
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
            const nSelPoints = dSelPoints.map(dPoint => dPoint.getPoint()[0]);
            const nSelLines = dSelLines.map(dLine => dLine.getLine()[0]);

            // Iterate over solutions to see if there is a match
            solution.solutions.forEach(option => {
                var currentOptionPassed = true;
                if (nSelPoints.length != option.expectedPoints.length) {
                    currentOptionPassed = false;
                } else {
                    for (var i = 0; i < option.expectedPoints.length; i++) {
                        console.log(nSelPoints[i]);
                        if (nSelPoints[i].distance(option.expectedPoints[i]) > eps)
                            currentOptionPassed = false;
                    }
                }
                if (nSelLines.length != option.expectedLines.length) {
                    currentOptionPassed = false;
                } else {
                    for (var i = 0; i < option.expectedLines.length; i++) {
                        if (nSelLines[i].distance(option.expectedLines[i].p1) > eps)
                            currentOptionPassed = false;
                        if (nSelLines[i].distance(option.expectedLines[i].p2) > eps)
                            currentOptionPassed = false;
                    }
                }

                if (currentOptionPassed)
                    currentCasePassed = true;
            });

            if (!currentCasePassed) {
                failed = true;
            }
            // Put the base points and lines back
            id=0;
            originalPoints.forEach(point => {
                if (point != null) {
                    dSelPoints.forEach(selPoint => {
                        selPoint.moveBasePoint(point, id);
                    });
                    dSelLines.forEach(selLine => {
                        selLine.moveBasePoint(point, id);
                    });
                }
                id++;
            });
            id=0;
            originalLines.forEach(line => {
                if (line != null) {
                    dSelPoints.forEach(selPoint => {
                        selPoint.moveBaseLine(line,id);
                    });
                    dSelLines.forEach(selLine => {
                        selLine.moveBaseLine(line,id);
                    })
                }
                id++;
            });
        });
        
        return !failed;
}

export class SelectSolutionTool extends Tool {
    constructor(gameState, solutions) {
        super(gameState);
        this.solutions = solutions;
    }

    doAction = (selPoints, selLines) => {
        const dSelPoints = selPoints.map(selPoint => this.gameState.getDependentPoint(selPoint));
        const dSelLines = selLines.map(selLine => this.gameState.getDependentLine(selLine));
        

        if (checkSolution(dSelPoints, dSelLines, this.solutions)) {
            alert("Congratulations! You've won!");
        }

        return { newPoints: [], newLines: [] };
    }

}

export default Tool;