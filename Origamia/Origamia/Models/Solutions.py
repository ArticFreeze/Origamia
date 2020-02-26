

class Solution:
    def __init__(self, expectedPoints, expectedLines):
        """
        Solution constructor:

        Parameters:
        expectedPoints: an array of Point objects that are expected in this solution
        expectedLines: an array of Line objects that are expected line objects that are expected in this solution
        """
        self.expectedPoints = expectedPoints
        self.expectedLines = expectedLines

    def to_dict(self):
        return {
            'expectedPoints': list(map(lambda p: p.to_dict(),  self.expectedPoints)),
            'expectedLines': list(map(lambda l: l.to_dict(), self.expectedLines))
        }
