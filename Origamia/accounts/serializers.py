from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework import serializers

# Citing https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password':{'write_only':True}}
    
    def create(self, data):
        return User.objects.create_user(data['username'], data['email'], data['password'])

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user != None and user.is_active:
            return user
        else:
            raise serializers.ValidationError('Incorrect username or password')
