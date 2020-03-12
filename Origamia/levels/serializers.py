from django.db import models
from rest_framework import serializers

from .models import LevelModel


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LevelModel
        fields = ('name', 'task', 'levelData', 'steps', 'clientSolutions',
                  'serverSolutions', 'hints', 'difficulty', 'starRequirement', 'starsAwarded')
