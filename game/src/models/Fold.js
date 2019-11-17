import Point from './Point';
import Line from './Line';
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

    }

    /**
     * Given a point, determines where the point will end up after the fold.
     * @param p the point (given before the fold is made)
     * @returns where the point will end up after the fold
     */
    foldPoint = (p) => {
        return null;
    }

    /**
     * Given a point after the fold, returns where the point ends up before the fold.
     * @param p the point (given after the fold is made)
     * @returns where the point will end up after the fold is reversed
     */
    unfoldPoint = (p) => {
        return null;
    }

}


export default Fold;