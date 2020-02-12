from django.db import models

from rest_framework import serializers

# class LevelModel(models.Model):


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Line:
    def __init__(self, p1, p2):
        self.p1 = p1
        self.p2 = p2


tempLevel = Level("Midpoint", "Construct the midpoint between two points.", [Point(50, 50), Point(
    350, 350)], [], 3, [], ["You will have to use both of the first two axioms of Origami."])


class Level:
    def __init__(self, name, task, points, lines, steps, solutions, hints):
        self.name = name
        self.task = task
        self.points = points
        self.lines = lines
        self.steps = steps
        self.solutions = solutions
        self.hints = hints
