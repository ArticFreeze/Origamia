import Point from './Point';
import Line, { intersect } from './Line';
import DependentLine, {ThroughLine} from './DependentLine';


class DependentPoint {

}

export class BasePoint extends DependentPoint {

    constructor(p) {
        super();
        this.p=p;
    }

    getPoint = () => this.p;

}

export class IntersectPoint extends DependentPoint {

    constructor(l1,l2) {
        super();
        this.l1=l1;
        this.l2=l2;
    }

    getPoint = () => intersect(this.l1.getLine(),this.l2.getLine());

}

export default DependentPoint;