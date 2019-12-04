import Point from './Point';
import Line, { intersect } from './Line';
import DependentLine, { ThroughLine } from './DependentLine';

/**
 * The DependentPoint specifies a point that is dependent on a number of factors.  Dependent points are constructed as either base points or intersections of lines.
 */
class DependentPoint {

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
    constructor(p) {
        super();
        this.p = p;
    }

    getPoint = () => [this.p];

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
                const ret = intersect(cl1,cl2);
                if (ret == null) {
                    return [];
                } else {
                    return [ret];
                }
            });
        });
    }

}

export default DependentPoint;