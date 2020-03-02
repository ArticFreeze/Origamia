import Point from './Point';
import Line, { intersect } from './Line';
import DependentLine, { ThroughLine } from './DependentLine';
import DependentObject from './DependentObject';


/**
 * The DependentPoint specifies a point that is dependent on a number of factors.  Dependent points are constructed as either base points or intersections of lines.
 */
class DependentPoint extends DependentObject {

    constructor() {
        super();
    }

    /**
     * Resolves the DependentPoint to a point and returns it
     * @returns {[Point]} All possible resolutions of the dependent points.
     */
    getPoint = () => {
        throw new Error("getPoint not implemented")
    }



}

/**
 * The BasePoint class serves as a concrete point with concrete coordinates.
 */
export class BasePoint extends DependentPoint {

    /**
     * Creates a BasePoint from a specified point
     * @param {Point} p The point to store
     */
    constructor(p, id) {
        super();
        this.p = p;
        this.id = id;
    }


    moveBasePoint = (point, id) => {
        if (this.id == id) {
            const ret = this.p;
            this.p = point;
            return ret;
        }
        return null;
    }

    moveBaseLine = (line, id) => {
        // Do not crash
        return null;
    }

    getPoint = () => [this.p];

}

/**
 * The FoldPoint class serves as a point that maps across a fold.
 */
export class FoldPoint extends DependentPoint {

    /**
     * Creates a FoldPoint
     * @param {DependentPoint} p The point to map
     * @param {DependentLine} l The fold line to map across
     */
    constructor(p, l) {
        super();
        this.p = p;
        this.l = l;
    }

    getPoint = () => {
        return this.p.getPoint().flatMap(cp => {
            return this.l.getLine().flatMap(cl => {
                // cp: the concrete point
                // cl: the conrete line
                if (cl.p1.y == cl.p2.y) { //horizontal fold
                    const yHor = cp.y - ((cp.y - cl.p1.y) * 2);
                    const xHor = cp.x;
                    return [new Point(xHor, yHor)];
                }

                if (cl.p1.x == cl.p2.x) { //vertical fold
                    const xVert = cp.x - ((cp.x - cl.p1.x) * 2);
                    const yVert = cp.y;
                    return [new Point(xVert, yVert)];
                }

                //following handles normal folds over a point left of the line over that line
                const lineAB = new Line(cl.p1, cl.p2)
                const tempP = new Point(cp.x + cl.p2.y - cl.p1.y, cp.y + cl.p1.x - cl.p2.x);
                const lineCD = new Line(cp, tempP)
                const halfwayPoint = intersect(lineAB, lineCD)
                const foldedX = cp.x - 2 * (cp.x - halfwayPoint.x)
                const foldedY = cp.y - 2 * (cp.y - halfwayPoint.y);
                var foldPoint = new Point(foldedX, foldedY)

                return [foldPoint]
            });
        });
    }

    moveBasePoint = (point, id) => {
        const ret1 = this.p.moveBasePoint(point, id);
        const ret2 = this.l.moveBasePoint(point, id);
        return ret1 != null ? ret1 : ret2;
    }

    moveBaseLine = (line, id) => {
        const ret1 = this.p.moveBaseLine(line, id);
        const ret2 = this.l.moveBaseLine(line, id);
        return ret1 != null ? ret1 : ret2;
    }

}

/**
 * The IntersectPoint class serves as an intersection of two lines.
 */
export class IntersectPoint extends DependentPoint {

    /**
     * Creates an intersection point of two lines
     * @param {DependentLine} l1 One line with the point
     * @param {DependentLine} l2 Another line with the point
     */
    constructor(l1, l2) {
        super();
        this.l1 = l1;
        this.l2 = l2;
    }

    getPoint = () => {
        return this.l1.getLine().flatMap(cl1 => {
            return this.l2.getLine().flatMap(cl2 => {
                const ret = intersect(cl1, cl2);
                if (ret == null) {
                    return [];
                } else {
                    return [ret];
                }
            });
        });
    }

    moveBasePoint = (point, id) => {
        const ret1 = this.l1.moveBasePoint(point, id);
        const ret2 = this.l2.moveBasePoint(point, id);
        return ret1 != null ? ret1 : ret2;
    }

    moveBaseLine = (line, id) => {
        const ret1 = this.l1.moveBaseLine(line, id);
        const ret2 = this.l2.moveBaseLine(line, id);
        return ret1 != null ? ret1 : ret2;
    }
}

export default DependentPoint;