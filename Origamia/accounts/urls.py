# Citation: https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c

from django.conf.urls import url, include
from knox.views import LogoutView
from .views import UserAPIView, RegisterAPIView, LoginAPIView, login_view

urlpatterns = [
    url('', include('knox.urls')),
    url('user', UserAPIView.as_view()),
    url('register', RegisterAPIView.as_view()),
    url('login', login_view),
    url('logout', LogoutView.as_view(), name='knox_logout')
]