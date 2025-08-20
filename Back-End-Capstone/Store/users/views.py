from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User

# Create your views here.
class UserSignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ["post"]

    def perform_create(self, serializer):
        serializer.save()  # This will call the create method in the serializer

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ["get"]

    def get_queryset(self):
        return User.objects.all()  # This will return all users in the database

# A more Detailed version of the User List
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ["get"]
    lookup_field = "pk"  # Allows retrieval by primary key (id)

    def get_object(self):
        return super().get_object()  # This will retrieve the user by the primary key

class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ["put", "patch"]
    lookup_field = "pk"  # Allows update by primary key (id)

    def get_object(self):
        return super().get_object()  # This will retrieve the user by the primary key
    
class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ["delete"]
    lookup_field = "pk"  # Allows deletion by primary key (id)

    def get_object(self):
        return super().get_object()  # This will retrieve the user by the primary key