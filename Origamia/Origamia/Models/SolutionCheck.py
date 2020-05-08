
from . import Solutions
# solutions is an array of Solution objects, each of which contains arrays of SolutionLines and SolutionPoints


class SolutionCheck:
    def __init__(self, basePoints, baseLines, solutions):
        self.basePoints = basePoints
        self.baseLines = baseLines
        self.solutions = solutions

    def to_dict(self):
        return {
            'basePoints': list(map(lambda p: p.to_dict(), self.basePoints)),
            'baseLines': list(map(lambda l: l.to_dict(), self.baseLines)),
            'solutions': list(map(lambda s: s.to_dict(), self.solutions))
        }
    #
    # def checkSolution(self,dSelPoints, dSelLines):
    #     for solution in self.solutions:
    #         currentCasePassed = False
    #         id = 0
    #         originalPoints = solution.basePoints
    #         for point in originalPoints:
    #             ret = None
    #             for selPoint in dSelPoints:
    #                 if selPoint is not None:
    #                     if ret is not None:
    #                         ret = ret
    #                     else:
    #                         ret = selPoint.moveBasePoint(Point(point.x, point.y), id);
    #             for selLine in dSelLines:
    #                 if selLine is not None:
    #                     if ret is not None:
    #                         ret = ret
    #                     else:
    #                         ret = selLine.moveBasePoint(Point(point.x,point.y),id);
    #             id = id + 1
    #             originalPoints.add(ret)
    #         id = 0
    #         originalLines = solution.basePoints
    #         for line in originalLines:
    #             ret = None
    #             for selPoint in dSelPoints:
    #                 if ret is not None:
    #                     ret = ret
    #                 else:
    #                     ret = selPoint.moveBaseLine(Line(Point(line.p1.x, line.p1.y), Point(line.p2.x, line.p2.y)))
    #             for selLine in dSelLines:
    #                 if ret is not None:
    #                     ret = ret
    #                 else:
    #                     ret = selLine.moveBaseLine(Line(Point(line.p1.x, line.p1.y), Point(line.p2.x, line.p2.y)))
    #             id = id + 1
    #             originalLines.add(ret)
    #
    #         #sort selected points and lines
    #         dSelPoints.sort(key=lambda x: x) #CHECK IF THIS IS SORTING CORRECTLY WITH Y (AND IN RIGHT ORDER)
    #         dSelPoints.sort(key=lambda y: y)
    #
