
from django.http import HttpResponse

from django.shortcuts import render


def game_view(request):

    return render(request, 'Game/index.html')


def temp_level(reqiest):
    