import Line, { intersect } from '../models/Line';
import Point from '../models/Point';
import Fold from '../models/Fold';

import DependentObject from '../models/DependentObject';
import DependentPoint, { BasePoint, IntersectPoint } from '../models/DependentPoint';
import DependentLine, { ThroughLine, BetweenLine } from '../models/DependentLine';

import Tool, {checkSolution} from '../models/Tools';

var test = require('unit.js');

it ('Test valid solution 1', () => {
    var bp1 = new BasePoint(new Point(10,10), 0);
    var bp2 = new BasePoint(new Point(30,30), 1);
    var dl1 = new ThroughLine(bp1, bp2);
    var dl2 = new BetweenLine(bp1, bp2);
    var dp = new IntersectPoint(dl1, dl2);
    const cases = [
        {
            basePoints: [
                {
                    x: 20,
                    y: 20
                },
                {
                    x: 40,
                    y: 40
                }
            ],
            baseLines: [],
            solutions: [
                {
                    expectedPoints: [
                        {
                            x: 30,
                            y: 30
                        }
                    ],
                    expectedLines: []
                }
            ]
        }
    ];
    test.assert.equal(checkSolution([dp], [], cases), true);
});