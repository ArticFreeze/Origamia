# solutions is an array of Solution objects, each of which contains arrays of SolutionLines and SolutionPoints

errTolerance=0.001

import math

def flatMap(f,l):
    ret = []
    for x in l:
        ret = ret + f(x)
    return ret

class Point:
    def __init__(self, x, y):
        self.x=x
        self.y=y

    def close(self, p):
        dx = p.x - self.x
        dy = p.y - self.y
        return math.sqrt(dx*dx+dy*dy) <= errTolerance

class Line:
    def __init__(self, p1, p2):
        self.p1=p1
        self.p2=p2
    
    def close(self,l):
        dErr = lambda x,y : math.abs((x-self.p1.x)*(y-self.p2.y)-(x-self.p2.x)*(y-self.p1.y))
        return dErr(l.p1.x,l.p1.y) + dErr(l.p2.x,l.p2.y) <= errTolerance

class BasePoint:
    def __init__(self,p,pid):
        self.p=p
        self.pid=pid

    def moveBasePoint(self,p,pid):
        if self.pid == pid:
            self.p=p
    
    def moveBaseLine(self,l,lid):
        pass

    def location(self):
        return [self.p]

class FoldPoint:
    def __init__(self,p,l):
        self.p=p
        self.l=l
    
    def moveBasePoint(self,p,pid):
        self.p.moveBasePoint(p,pid)
        self.l.moveBasePoint(p,pid)

    def moveBaseLine(self,l,lid):
        self.p.moveBaseLine(l,lid)
        self.l.moveBaseLine(l,lid)

    def location(self):
        def helper(p,l):
            # Citation: https://stackoverflow.com/questions/3306838/algorithm-for-reflecting-a-point-across-a-line
            if math.abs(l.p2.y-l.p1.y) <= errTolerance:
                return Point(2*l.p1.x-p.x, p.y)
            m = (l.p2.y-l.p1.y)/(l.p2.x-l.p1.x)
            c = l.p2.y - m * l.p2.x
            d = (p.x + (p.y - c) * m) / (1 + m * m)
            return Point(2*d-p.x, 2*d*m - p.y + c)
        return flatMap(lambda p : flatmap(lambda l : helper(p,l), self.l.location()), self.p.location())

class IntersectPoint:
    def __init__(self,l1,l2):
        self.l1=l1
        self.l2=l2

    def moveBasePoint(self,p,pid):
        self.l1.moveBasePoint(p,pid)
        self.l2.moveBasePoint(p,pie)

    def moveBaseLine(self,l,lid):
        self.l1.moveBaseLine(l,lid)
        self.l2.moveBaseLine(l,lid)

    def location(self):
        def helper(l1,l2):
            a1 = l1.p1.y - l1.p2.y
            b1 = l1.p2.x - l1.p1.x
            c1 = l1.p2.x*l1.p1.y - l1.p1.x*l1.p2.y
            a2 = l2.p1.y - l2.p2.y
            b2 = l2.p2.x - l2.p1.x
            c2 = l2.p2.x*l2.p1.y - l2.p1.x*l2.p2.y
            det = a1 * b2 - a2 * b1
            if math.abs(det) <= errTolerance:
                return []
            return [Point((c1*b2-c2*b1)/det,(a1*c2-a2*c1)/det)]
        return flatMap(lambda l1: flatMap(lambda l2: helper(l1,l2), self.l2.location()), self.l1.location())

class BaseLine:
    def __init__(self,l,lid):
        self.l=l
        self.lid=lid
    
    def moveBasePoint(self,p,pid):
        pass

    def moveBaseLine(self,l,lid):
        if self.lid == lid:
            self.l=l
    
    def location(self):
        return [l]

class ThroughLine:
    def __init__(self,p1,p2):
        self.p1=p1
        self.p2=p2

    def moveBasePoint(self,p,pid):
        self.p1.moveBasePoint(p,pid)
        self.p2.moveBasePoint(p,pid)
    
    def moveBaseLine(self,l,lid):
        self.p1.moveBaseLine(l,lid)
        self.p2.moveBaseLine(l,lid)
    
    def location(self):
        return flatMap(lambda p1: flatMap(lambda p2: [Line(p1,p2)], self.p2.location()), self.p1.location())

class BetweenLine:
    def __init__(self,p1,p2):
        self.p1=p1
        self.p2=p2

    def moveBasePoint(self,p,pid):
        self.p1.moveBasePoint(p,pid)
        self.p2.moveBasePoint(p,pid)
    
    def moveBaseLine(self,l,lid):
        self.p1.moveBaseLine(l,lid)
        self.p2.moveBaseLine(l,lid)

    def location(self):
        def helper(p1,p2):
            m = Point((p1.x+p2.x)/2,(p1.y+p2.y)/2)
            dx = p2.x-p1.x
            dy = p2.y-p1.y
            m2 = Point(m.x+dy,m.y-dx)
            return [Line(m,m2)]
        return flatMap(lambda p1: flatMap(lambda p2: helper(p1,p2), self.p2.location()), self.p1.location())

def parseObjectDictionary(dict):
    if dict['type'] == 'BasePoint':
        return BasePoint(dict['p']['x'], dict['p']['y'])
    elif dict['type'] == 'BaseLine':
        return BaseLine(Line(Point(dict['p1']['x'],dict['p1']['y']),Point(dict['p2']['x'],dict['p2']['y'])))
    elif dict['type'] == 'IntersectPoint':
        return IntersectPoint(parseObjectDictionary(dict['l1']), parseObjectDictionary(dict['l2']))
    elif dict['type'] == 'FoldPoint':
        return FoldPoint(parseObjectDictionary(dict['p']), parseObjectDictionary(dict['l']))
    elif dict['type'] == 'ThroughLine':
        return ThroughLine(parseObjectDictionary(dict['p1']), parseObjectDictionary(dict['p2']))
    elif dict['type'] == 'BetweenLine':
        return BetweenLine(parseObjectDictionary(dict['p1']), parseObjectDictionary(dict['p2']))


def checkSolution(selPoints, selLines, solutions):
    for solution in solutions:
        sPoints = list(map(parseObjectDictionary, selPoints))
        sLines = list(map(parseObjectDictionary, selLines))

        for i in range(0,len(solution.basePoints)):
            for p in sPoints:
                p.moveBasePoint(solution.basePoints[i], i)
            for l in sLines:
                l.moveBasePoint(solution.basePoints[i],i)
        
        for i in range(0,len(solution.baseLines)):
            for p in sPoints:
                p.moveBaseLine(solution.baseLines[i], i)
            for l in sLines:
                l.moveBaseLine(solution.baseLines[i],i)
        
        match0 = false

        cPoints = list(map(lambda p : p.location()[0]), sPoints)
        cLines = list(map(lambda l : l.location()[0]), sLines)

        cPoints.sort(key = lambda p : p.x)
        cPoints.sort(key = lambda p : p.y)

        cLines.sort(key = lambda l : l.p1.x)
        cLines.sort(key = lambda l : l.p1.y - (l.p2.y - l.p1.y) / (l.p2.x - l.p1.x) * l.p1.x)
        cLines.sort(key = lambda l : (l.p2.y - l.p1.y) / (l.p2.x - l.p1.x))

        for option in solution.solutions:
            match1 = true
            if len(option['expectedPoints'] != len(cPoints)):
                continue
            if len(option['expectedLines'] != len(cLines)):
                continue
            for i in range(0,len(option['expectedPoints'])):
                if not cPoints[i].close(Point(option['expectedPoints'][i]['x'], option['expectedPoints'][i]['y'])):
                    match1 = false
            for i in range(0,len(option['expectedLines'])):
                if not cLines[i].close(Line(Point(option['expectedLines'][i]['p1']['x'], option['expectedLines'][i]['p1']['y']), Point(option['expectedLines'][i]['p2']['x'], option['expectedLines'][i]['p2']['y']))):
                    match1 = false
            if match1:
                match0 = True
        
        if not match0:
            return False
        
    return True
