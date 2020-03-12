from django.conf.urls import url
from . import views


urlpatterns = [
    url('levels/templevel', views.LevelAPIView().as_view())
]
