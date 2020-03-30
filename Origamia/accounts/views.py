from django.shortcuts import render

# Citation: https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c
# Create your views here.

from rest_framework import generics, permissions, serializers
from rest_framework.response import Response

from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from django.http import JsonResponse, HttpResponseBadRequest
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError

import json

class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

@ensure_csrf_cookie
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            return JsonResponse({
                "token": AuthToken.objects.create(user)[1]
            })
        else:
            return JsonResponse({"error":"Incorrect username or password"}, status=400)
    elif request.method == 'GET':
        return JsonResponse({'csrfToken': get_token(request)})
    

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })