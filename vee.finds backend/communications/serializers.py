from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Message
        fields = ["id", "username", "subject", "body", "is_from_staff", "created_at"]
        read_only_fields = ["is_from_staff"]
