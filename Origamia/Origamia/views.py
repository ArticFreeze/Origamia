
from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response

from .Models.Levels import level
from .Models.Solutions import Solution
from .Models.SolutionCheck import SolutionCheck

templevel = level.Level("Midpoint", "Construct the midpoint between two points.", [level.Point(50, 50), level.Point(
    350, 350)], [], 3, [SolutionCheck(
        [
            level.Point(10, 10),
            level.Point(30, 30)
        ],
        [],
        [Solution([
            level.Point(20, 20)
        ],
            [])
        ])
],
    ["You will have to use both of the first two axioms of Origami."])


def game_view(request):

    return render(request, 'Game/index.html')


def temp_level(request):
    return JsonResponse(templevel.to_dict())
