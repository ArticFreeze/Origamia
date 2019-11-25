import Line, { intersect } from '../models/Line';
import Point from '../models/Point';
import Fold from '../models/Fold';
//import { isMainThread } from 'worker_threads';

var test = require('unit.js');

it('Point on the left maps after a fold', () => {
    var p1 = new Point(-1, 1);
    var f1 = new Fold(new Point(-1, -1), new Point(1, 1));
    var p2 = f1.foldPoint(p1);
    test.assert.equal(p2.x, 1);
    test.assert.equal(p2.y, -1);
});

it('Point on the right does not move after a fold', () => {
    var p1 = new Point(1, -1);
    var f1 = new Fold(new Point(-1, -1), new Point(1, 1));
    var p2 = f1.foldPoint(p1);
    test.assert.equal(p2.x, 1);
    test.assert.equal(p2.y, -1);
});

it('Point maps back after unfolding', () => {
    var p1 = new Point(1, -1);
    var f1 = new Fold(new Point(-1, -1), new Point(1, 1));
    var p2 = f1.unfoldPoint(p1);
    test.assert.equal(p2.x, -1);
    test.assert.equal(p2.y, 1);
});

it('Point to the left maps even when points of fold are given in reverse order', () => {
    var p1 = new Point(1, -1);
    var f1 = new Fold(new Point(1, 1), new Point(-1, -1));
    var p2 = f1.foldPoint(p1);
    test.assert.equal(p2.x, -1);
    test.assert.equal(p2.y, 1);
});

it('Point to the right stays even when points of fold are given in reverse order', () => {
    var p1 = new Point(-1, 1);
    var f1 = new Fold(new Point(1, 1), new Point(-1, -1));
    var p2 = f1.foldPoint(p1);
    test.assert.equal(p2.x, -1);
    test.assert.equal(p2.y, 1);
});

it('Point is mapped across a horizontal fold', () => {
    var p1 = new Point(0, 2);
    var f1 = new Fold(new Point(-2, 1), new Point(1, 1));
    var p2 = f1.foldPoint(p1);
    test.assert.equal(p2.x, 0);
    test.assert.equal(p2.y, 0);
});

it('Point is mapped across a vertical fold', () => {
    var p1 = new Point(5, 3);
    var f1 = new Fold(new Point(-1, 2), new Point(-1, -3));
    var p2 = f1.foldPoint(p1);
    test.assert.equal(p2.x, -7);
    test.assert.equal(p2.y, 3);
});

it('Point on the line is handled properly', () => {
    var p1 = new Point(1, 1);
    var f1 = new Fold(new Point(-3, 3), new Point(3, 0));
    var p2 = f1.foldPoint(p1);
    test.assert.equal(p2.x, 1);
    test.assert.equal(p2.y, 1);
});

it('No side effects', () => {
    var pt1 = new Point(-1, 1);
    var f1 = new Fold(new Point(-1, -1), new Point(1, 1));
    var p2 = f1.foldPoint(pt1);
    test.object(pt1).hasProperty('x', -1).hasProperty('y', 1);
    test.assert.equal(f1.p1.x, -1);
    test.assert.equal(f1.p1.y, -1);
    test.assert.equal(f1.p2.x, 1);
    test.assert.equal(f1.p2.y, 1);
});