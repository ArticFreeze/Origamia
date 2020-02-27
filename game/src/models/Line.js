import Point from './Point';


class Line {
    constructor(Point1, Point2) {
        this.p1 = Point1;
        this.p2 = Point2;
    }

    /**
    * Returns the distance from this line to a point
    * @param p {Point} The point to find the distance to
    * @return {float} The distance between the point and this line
    */
    distance = (p) => {
        var area = this.p1.x * this.p2.y + p.x * this.p1.y + this.p2.x * p.y
            - p.x * this.p2.y - this.p2.x * this.p1.y - this.p1.x * p.y;
        return (2 * Math.abs(area)) / Math.abs(this.p1.distance(this.p2));
    }
}
/**
    * Given 2 lines, returns the intersection point of those lines, or null if there is
    * no intersection point
    * @param l1 the first line
    * @param l2 the second line
    * @returns the intersection point of the two lines or null if it doesn't exist
    */
export const intersect = (l1, l2) => {
    const l1p1 = l1.p1;
    const l1p2 = l1.p2;
    const a1 = l1p1.y - l1p2.y;
    const b1 = l1p2.x - l1p1.x;
    const c1 = l1p2.x * l1p1.y - l1p1.x * l1p2.y;
    const l2p1 = l2.p1;
    const l2p2 = l2.p2;
    const a2 = l2p1.y - l2p2.y;
    const b2 = l2p2.x - l2p1.x;
    const c2 = l2p2.x * l2p1.y - l2p1.x * l2p2.y;
    const det = a1 * b2 - a2 * b1;
    if (det == 0) {
        return null;
    }
    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;

    return new Point(x, y);
};

/**
 * Returns slope of a given line.
 * @param {l} line that slope is being returned for.
 */
export const slope = (l) => {
    if (l.p1.x == l.p2.x) {
        return Number.NEGATIVE_INFINITY;
    }
    return (l.p2.y - l.p1.y) / (l.p2.x - l.p1.x);
}



export default Line;