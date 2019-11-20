import Point from './Point';
import Line from './Line';
import DependentPoint, {BasePoint, IntersectPoint} from './DependentPoint';

class DependentLine {

}

export class BaseLine extends DependentLine {

    constructor(l) {
        super();
        this.l=l;
    }

    getLine = () => this.l;

}

export class ThroughLine extends DependentLine {

    constructor(p1, p2) {
        super();
        this.p1=p1;
        this.p2=p2;
    }

    getLine = () => new Line(this.p1.getPoint(), this.p2.getPoint());

}

export class BetweenLine extends DependentLine {

    constructor(p1,p2) {
        super();
        this.p1=p1;
        this.p2=p2;
    }

    getLine = () => {
        var cp1 = this.p1.getPoint();
        var cp2 = this.p2.getPoint();
        var op1 = new Point((cp1.x+cp2.x)/2,(cp1.y+cp2.y)/2);
        var op2 = new Point(op1.x+(cp2.y-cp1.y),op1.y+(cp1.x-cp2.x));
        return new Line(op1,op2);
    }

}

export default DependentLine;