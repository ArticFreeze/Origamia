

class Point {

    constructor(xPoint, yPoint) {
        this.x = xPoint
        this.y = yPoint
    }

    /**
    * Returns the distance from this point to another
    * @param p {Point} The other point to find the distance from
    * @return {float} The distance between the two points
    */
    distance = (p) => {
        const dx = p.x - this.x;
        const dy = p.y - this.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

}

export default Point;