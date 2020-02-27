import Point from './Point';
import Line from './Line';

/**
 * Represents a dependent object
 */
class DependentObject {


    /**
     * Moves a base point for solution checking.
     * @param {Point} point The location for the BasePoint to be moved to.
     * @param {id} The id of the BasePoint that needs moving.
     */
    moveBasePoint = (point, id) => {
        throw new Error("moveBasePoint not implemented");
    }

    /**
     * Move a base line for solution checking.
     * @param {Line} line The location for the BaseLine to be moved to.
     * @param {id} The id of the BaseLine that needs moving.
     */
    moveBaseLine = (line, id) => {
        throw new Error("moveBaseLine not implemented");
    }

}

export default DependentObject;