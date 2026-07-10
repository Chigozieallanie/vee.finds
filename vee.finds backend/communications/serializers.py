from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="customer.username", read_only=True)
    phone_number = serializers.CharField(source="customer.phone_number", read_only=True)
    sender_username = serializers.CharField(source="sender.username", read_only=True)

    # Only used on write, by staff, to say which customer this reply is for.
    # Regular customers never send this — the view defaults it to themselves.
    customer_username = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Message
        fields = [
            "id", "username", "phone_number", "sender_username",
            "subject", "body", "is_from_staff", "created_at",
            "customer_username",
        ]
        read_only_fields = ["is_from_staff"]