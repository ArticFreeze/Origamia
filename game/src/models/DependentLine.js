import Point from './Point';
import Line from './Line';
import DependentPoint, { BasePoint, IntersectPoint } from './DependentPoint';

/**
 * The DependentLine represents a line that is dependent on other points or lines.
 */
class DependentLine {

    /**
     * Gets a concrete line for drawing
     * @returns {[Line]} All possible concrete lines for drawing.
     */
    getLine = () => {
        throw new Error("Class fails to implement getLine");
    }

}

/**
 * The BaseLine class is a dependent line that is dependent on a supplied base line.
 */
export class BaseLine extends DependentLine {

    /**
     * Creates a BaseLine class
     * @param {Line} l The line to represent
     */
    constructor(l) {
        super();
        this.l = l;
    }

    getLine = () => [this.l];

}

/**
 * The ThroughLine class represents a line that passes through two points.  This line represents a fold by axiom 1.
 */
export class ThroughLine extends DependentLine {

    /**
     * Creates a line through two points.
     * @param {*} p1 One point on the line
     * @param {*} p2 Another point on the line
     */
    constructor(p1, p2) {
        super();
        this.p1 = p1;
        this.p2 = p2;
    }

    getLine = () => {
        return this.p1.getPoint().flatMap(p01 => {
            return this.p2.getPoint().flatMap(p02 => {
                return [new Line(p01, p02)];
            });
        })
    }

}

/**
 * The BetweenLine class represents a line that exists between two points.  This class is for folds by axiom 2.
 */
export class BetweenLine extends DependentLine {

    /**
     * Creates a line between two points
     * @param {DependentPoint} p1 A point on one side of the line
     * @param {DependentPoint} p2 A point opposite the other point
     */
    constructor(p1, p2) {
        super();
        this.p1 = p1;
        this.p2 = p2;
    }

    getLine = () => {
        return this.p1.getPoint().flatMap(cp1 => {
            return this.p2.getPoint().flatMap(cp2 => {
                const midpoint = new Point((cp1.x + cp2.x) / 2, (cp1.y + cp2.y) / 2);
                const lp1 = new Point(midpoint.x + (cp2.y - cp1.y), midpoint.y + (cp1.x - cp2.x));
                const lp2 = new Point(midpoint.x - (cp2.y - cp1.y), midpoint.y - (cp1.x - cp2.x));
                return new Line(lp1, lp2);
            });
        });

    }

}

export default DependentLine;