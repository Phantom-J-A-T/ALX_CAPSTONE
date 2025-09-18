from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        # Create the user
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        # Create associated UserProfile automatically
        UserProfile.objects.create(user=user)
        return user
