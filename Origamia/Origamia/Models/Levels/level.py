from django.db import models

from rest_framework import serializers

# class LevelModel(models.Model):


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def to_dict(self):
        return {
            'x': self.x,
            'y': self.y
        }


class Line:
    def __init__(self, p1, p2):
        self.p1 = p1
        self.p2 = p2

    def to_dict(self):
        return {
            'p1': self.p1.to_dict(),
            'p2': self.p2.to_dict()
        }


class Level:
    def __init__(self, name, task, points, lines, steps, solutions, hints):
        self.name = name
        self.task = task
        self.points = points
        self.lines = lines
        self.steps = steps
        self.solutions = solutions
        self.hints = hints

    def to_dict(self):
        return {
            'name': self.name,
            'task': self.task,
            'points': list(map(lambda x: x.to_dict(), self.points)),
            'lines': list(map(lambda x: x.to_dict(), self.lines)),
            'steps': self.steps,
            'solutions': self.solutions,
            'hints': self.hints
        }
