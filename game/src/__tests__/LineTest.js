import Line, {intersect} from '../models/Line';
import Point from '../models/Point';

var test = require('unit.js');

it('Test lines', () => {
var p1 = new Point(3,2);
test.object(p1).hasProperty('x',3).hasProperty('y',2);
});