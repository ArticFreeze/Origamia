# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import generics
from .models import LevelModel
from .serializers import LevelSerializer

# Create your views here.


class LevelAPIView(generics.RetrieveAPIView):

    serializer_class = LevelSerializer

    def get_object(self):
        return LevelModel.objects.defer('serverSolutions').get(id=1)
