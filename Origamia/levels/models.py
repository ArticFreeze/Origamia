# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class LevelModel(models.Model):
    name = models.CharField(max_length=100)  # Name of the level
    task = models.TextField()  # Description of the task
    levelData = models.TextField()  # JSON text for the points and lines
    steps = models.IntegerField()  # Number of steps for the second star
    # JSON text for the solution checking on the client side
    clientSolutions = models.TextField()
    # JSON text for the solution checking on the server side
    serverSolutions = models.TextField()
    hints = models.TextField()  # Hints for this level
    # Number of stars required to unlock the level
    difficulty = models.IntegerField()
    starRequirement = models.IntegerField()
    starsAwarded = models.IntegerField()  # Number of stars awarded

class LevelSolvedModel(models.Model):
    # User who solved the level
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # Level solved
    level = models.ForeignKey(LevelModel, on_delete=models.CASCADE)
    # Stars awarded for the solution
    stars = models.IntegerField()