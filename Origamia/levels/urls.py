from django.conf.urls import url
from . import views


urlpatterns = [
    url('levels/templevel', views.LevelAPIView().as_view()),
    url('levels/solve', views.solve_view),
    url('levels/levelMenu', views.LevelMenu().as_view()),
    url('levels/level/', views.LevelRequestView().as_view()),
]
