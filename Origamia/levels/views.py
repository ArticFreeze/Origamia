# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import generics
from .models import LevelModel, LevelSolvedModel
from .serializers import LevelSerializer
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import login_required


from django.db.models import Sum

from .SolutionCheck import *

import json

# Create your views here.


def stars_earned(user):
    levelsSolved = LevelSolvedModel.objects.filter(user=user)
    starsEarned = levelsSolved.aggregate(Sum('stars'))['stars__sum']
    if starsEarned == None:
        return 0
    else:
        return starsEarned
            

class LevelAPIView(generics.RetrieveAPIView):

    serializer_class = LevelSerializer
        
    def get_object(self):
        return LevelModel.objects.get(id=1)

class LevelMenu(generics.ListAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class = LevelSerializer

    def get_queryset(self):
        requestUser = self.request.user
        starsEarned = stars_earned(requestUser)
        return LevelModel.objects.filter(starRequirement__lte=starsEarned)


class LevelRequestView(generics.RetrieveAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class = LevelSerializer

    def get_object(self):
        requestUser = self.request.user
        starsEarned = stars_earned(requestUser)
        levelID=self.request.query_params['id']
        level = LevelModel.objects.get(id=levelID)
        if level.starRequirement > starsEarned:
            return JsonResponse({"error":"Level not unlocked yet"},status=400)
        else:
            return level



@api_view(['POST'])
@ensure_csrf_cookie
@permission_classes([IsAuthenticated,])
def solve_view(request):
    
    user = request.user
    data = request.data
    level = LevelModel.objects.get(id=data['levelID'])
    serverSolutions = json.loads(level.serverSolutions)

    if checkSolution(data['points'], data['lines'], serverSolutions):
        newStars = level.starsAwarded
        previousSolutions = LevelSolvedModel.objects.filter(user__exact=user, level__exact=level)
        if len(previousSolutions) == 0:
            LevelSolvedModel.objects.create(user=user, level=level, stars=level.starsAwarded)
        else:
            oldStars = previousSolutions[0].stars
            if oldStars < newStars:
                previousSolutions.update(stars=newStars)

        return JsonResponse({"solved":True})
    else:
        return JSonResponse({"solved":False}, status=400)
    # If solved
    