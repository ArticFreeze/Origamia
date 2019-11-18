import Line, {intersect} from '../models/Line';
import Point from '../models/Point';

var test = require('unit.js');

it('Test lines', () => {
var p1 = new Point(3,2);
test.object(p1).hasProperty('x',3).hasProperty('y',2);
});

it('Test Intersect 1: base', () =>{
    var l1 = new Line(new Point(1, 0), new Point(0, -1));
    var l2 = new Line(new Point (0, 0), new Point(2, -2));
    var iPoint = intersect(l1, l2);
    test.assert.equal(iPoint.x, .5);
    test.assert.equal(iPoint.y, -.5);
})
//
//it('Test Intersect 2: Reverse Order', () => {
//
//})
//
//it('Test Intersect 3: Horizontal', () => {
//
//})
//
//it('Test Intersect 4: Vertical', () => {
//
//})
//
//it('Test Intersect 5: BothPositiveSlopes', () => {
//
//})
//
//it('Test Intersect 6: BothNegativeSlopes', () => {
//
//})

it('Test Intersect 7: ', () => {
    var l1 = new Line(new Point(-1, -1), new Point(1,1));
    var l2 = new Line(new Point(-1 , 1), new Point(1, -1));
    var iPoint = intersect(l1, l2);
    test.assert.equal(iPoint.x, 0);
    test.assert.equal(iPoint.y, 0);
})