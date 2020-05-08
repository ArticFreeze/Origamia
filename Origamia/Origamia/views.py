
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response

from .Models.Levels import level
from .Models.Solutions import Solution

 # Cite: https://fractalideas.com/blog/making-react-and-django-play-well-together-single-page-app-model/

from django.middleware.csrf import get_token

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})




def game_view(request):

    return render(request, 'Game/index.html')


