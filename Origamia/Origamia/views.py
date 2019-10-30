
from django.http import HttpResponse

def game_view(request):
    return HttpResponse("<html>Hello World!</html>")