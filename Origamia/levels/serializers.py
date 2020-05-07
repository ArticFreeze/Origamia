from django.db import models
from rest_framework import serializers

from .models import LevelModel


class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LevelModel
        fields = ('id', 'name', 'task', 'levelData', 'steps', 'clientSolutions', 'hints', 'difficulty', 'starRequirement', 'starsAwarded')

class ServerLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LevelModel
        fields = ('id', 'steps', 'serverSolutions', 'starRequirement', 'starsAwarded')