import Point from './Point';
import Line from './Line';
import { intersect } from './Line';
//import intersect from './Line';
import GameState from './GameState';
import GameCanvas from '../GameCanvas';


/**
 * The Fold class represents a fold.  A fold is defined by a line with the left side being folded onto the right side.
 */
class Fold {

    /**
     * Constructs a fold through two points
     * @param  p1 The first point to fold through
     * @param  p2 The second point to fold through
     */
    constructor(p1,p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    /**
     * Given a point, determines where the point will end up after the fold.
     * @param p the point (given before the fold is made)
     * @returns where the point will end up after the fold
     */
    foldPoint = (p) => {

        if (this.p1.y == this.p2.y) { //horizontal fold
            var yHor = p.y - ( ( p.y - this.p1.y ) * 2)
            //yCoord = p.y - yCoord
            var xHor = p.x
            return new Point(xHor, yHor)
        }

        if (this.p1.x == this.p2.x){ //vertical fold
            var xVert = p.x - ( ( p.x - this.p1.x) * 2)
            var yVert = p.y
            return new Point(xVert, yVert)
        }

        //TODO: may need to verify that p1 and p2 don't need to be switched
        if ((this.p1.x * this.p2.y + p.x * this.p1.y + this.p2.x * p.y - p.x * this.p2.y - this.p2.x * this.p1.y - this.p1.x * p.y) < 0) { //if point is right of line
            return new Point(p.x, p.y)
        }

        var lineAB = new Line(this.p1, this.p2)
        var tempP = new Point(p.x+this.p2.y-this.p1.y, p.y+this.p1.x-this.p2.x);
        var lineCD = new Line(p, tempP)
        var halfwayPoint = intersect(lineAB, lineCD)
        const tempX = p.x - 2 * (p.x - halfwayPoint.x)
        const tempY = p.y - 2 * (p.y - halfwayPoint.y);
        var foldPoint = new Point(tempX, tempY)

        return foldPoint
    }

    /**w
     * Given a point after the fold, returns where the point ends up before the fold.
     * @param p the point (given after the fold is made)
     * @returns where the point will end up after the fold is reversed
     */
    unfoldPoint = (p) => { //TODO: CREATE MORE TESTS FOR
        return new Point(p.x - (p.x - this.p1.x), p.y - (p.y - this.p2.y))
    }

}


export default Fold;