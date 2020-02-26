
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
