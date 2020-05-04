# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework import generics
from .models import LevelModel
from .serializers import LevelSerializer
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse, HttpResponseBadRequest
# Create your views here.


class LevelAPIView(generics.RetrieveAPIView):

    serializer_class = LevelSerializer

    def get_object(self):
        return LevelModel.objects.defer('serverSolutions').get(id=1)




@ensure_csrf_cookie
def solve_view(request):
    return JsonResponse({"solved":True})