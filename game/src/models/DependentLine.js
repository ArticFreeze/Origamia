import Point from './Point';
import Line from './Line';
import DependentPoint, { BasePoint, IntersectPoint } from './DependentPoint';
import DependentObject from './DependentObject';
/**
 * The DependentLine represents a line that is dependent on other points or lines.
 */
class DependentLine extends DependentObject {

    constructor() {
        super();
    }

    /**
     * Gets a concrete line for drawing
     * @returns {[Line]} All possible concrete lines for drawing.
     */
    getLine = () => {
        throw new Error("Class fails to implement getLine");
    }

}

/**
 * The BaseLine class serves as a concrete line with concrete coordinates.
 */
export class BaseLine extends DependentLine {

    /**
     * Creates a BaseLine from a specified point
     * @param {Point} l The line to store
     */
    constructor(l, id) {
        super();
        this.l = l;
        this.id = id;
    }


    moveBaseLine = (line, id) => {
        if (this.id == id) {
            const ret = this.l;
            this.l = line;
            return ret;
        }
        return null;
    }

    moveBasePoint = (point, id) => {
        // Do not crash
        return null;
    }

}

/**
 * The ThroughLine class represents a line that passes through two points.  This line represents a fold by axiom 1.
 */
export class ThroughLine extends DependentLine {

    /**
     * Creates a line through two points.
     * @param {DependentPoint} p1 One point on the line
     * @param {DependentPoint} p2 Another point on the line
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

    moveBasePoint = (point, id) => {
        const ret1 = this.p1.moveBasePoint(point, id);
        const ret2 = this.p2.moveBasePoint(point, id);
        return ret1 != null ? ret1 : ret2;
    }

    moveBaseLine = (line, id) => {
        const ret1 = this.p1.moveBaseLine(line, id);
        const ret2 = this.p2.moveBaseLine(line, id);
        return ret1 != null ? ret1 : ret2;
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
                return [new Line(lp1, lp2)];
            });
        });

    }

    moveBasePoint = (point, id) => {
        const ret1 = this.p1.moveBasePoint(point, id);
        const ret2 = this.p2.moveBasePoint(point, id);
        return ret1 != null ? ret1 : ret2;
    }

    moveBaseLine = (line, id) => {
        const ret1 = this.p1.moveBaseLine(line, id);
        const ret2 = this.p2.moveBaseLine(line, id);
        return ret1 != null ? ret1 : ret2;
    }
}

export default DependentLine;