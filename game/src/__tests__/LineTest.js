import Line, {intersect} from '../models/Line';
import Point from '../models/Point';

var test = require('unit.js');

it('Test Intersect 1: base', () =>{
    var l1 = new Line(new Point(1, 0), new Point(0, -1));
    var l2 = new Line(new Point (0, 0), new Point(2, -2));
    var iPoint = intersect(l1, l2);
    test.assert.equal(iPoint.x, .5);
    test.assert.equal(iPoint.y, -.5);
})

it('Test Intersect 2: Reverse Order', () => {
    var l1 = new Line(new Point (0, 0), new Point(2, -2));
    var l2 = new Line(new Point(1, 0), new Point(0, -1));
    var iPoint = intersect(l1, l2);
    test.assert.equal(iPoint.x, .5);
    test.assert.equal(iPoint.y, -.5);
});

it('Test Intersect 3: Horizontal', () => {
    var l1 = new Line(new Point(0,0), new Point(5,0));
    var l2 = new Line(new Point(2,1),new Point(4,-1));
    var lPoint = intersect(l1,l2);
    test.assert.equal(lPoint.x,3);
    test.assert.equal(lPoint.y,0);
});

it('Test Intersect 4: Vertical', () => {
    var l1 = new Line(new Point(2,1), new Point(2,5));
    var l2 = new Line(new Point(0,3), new Point(4,5));
    var lPoint = intersect(l1,l2);
    test.assert.equal(lPoint.x,2);
    test.assert.equal(lPoint.y,4);
});

it('Test Intersect 5: BothPositiveSlopes', () => {
    var l1 = new Line(new Point(-1,-3), new Point(1,3));
    var l2 = new Line(new Point(-3,-1), new Point(3,1));
    var lPoint = intersect(l1,l2);
    test.assert.equal(lPoint.x,0);
    test.assert.equal(lPoint.y,0);
});

it('Test Intersect 6: BothNegativeSlopes', () => {
    var l1 = new Line(new Point(-1,5), new Point(2,2));
    var l2 = new Line(new Point(0,6), new Point(2,0));
    var lPoint = intersect(l1,l2);
    test.assert.equal(lPoint.x,1);
    test.assert.equal(lPoint.y,3);
});

it('Test Intersect 7: ', () => {
    var l1 = new Line(new Point(-1, -1), new Point(1,1));
    var l2 = new Line(new Point(-1 , 1), new Point(1, -1));
    var iPoint = intersect(l1, l2);
    test.assert.equal(iPoint.x, 0);
    test.assert.equal(iPoint.y, 0);
})