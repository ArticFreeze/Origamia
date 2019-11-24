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
            var xHor = p.x
            return new Point(xHor, yHor)
        }

        if (this.p1.x == this.p2.x){ //vertical fold
            var xVert = p.x - ( ( p.x - this.p1.x) * 2)
            var yVert = p.y
            return new Point(xVert, yVert)
        }

        //checks if a point is to the right of a line via the determinate method
        if ((this.p1.x * this.p2.y + p.x * this.p1.y + this.p2.x * p.y
             - p.x * this.p2.y - this.p2.x * this.p1.y - this.p1.x * p.y) < 0) {
                return new Point(p.x, p.y)
        }

        //following handles normal folds over a point left of the line over that line
        const lineAB = new Line(this.p1, this.p2)
        const tempP = new Point(p.x+this.p2.y-this.p1.y, p.y+this.p1.x-this.p2.x);
        const lineCD = new Line(p, tempP)
        const halfwayPoint = intersect(lineAB, lineCD)
        const foldedX = p.x - 2 * (p.x - halfwayPoint.x)
        const foldedY = p.y - 2 * (p.y - halfwayPoint.y);
        var foldPoint = new Point(foldedX, foldedY)

        return foldPoint
    }

    /**
     * Given a point after the fold, returns where the point ends up before the fold.
     * @param p the point (given after the fold is made)
     * @returns where the point will end up after the fold is reversed
     */
    unfoldPoint = (p) => { //TODO: CREATE MORE TESTS FOR
        return new Point(p.x - (p.x - this.p1.x), p.y - (p.y - this.p2.y))
    }

}


export default Fold;