from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied, NotFound

from accounts.models import User
from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    Regular users see & create only their own thread (customer = themselves).
    Staff users see every message across all threads, and can reply to a
    specific customer's thread by passing `customer_username` on create.
    """
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Message.objects.all()
        return Message.objects.filter(customer=user)

    def perform_create(self, serializer):
        user = self.request.user
        customer_username = serializer.validated_data.pop("customer_username", None)

        if user.is_staff:
            if not customer_username:
                raise NotFound("customer_username is required for staff replies.")
            try:
                customer = User.objects.get(username=customer_username)
            except User.DoesNotExist:
                raise NotFound("No customer found with that username.")
        else:
            if customer_username and customer_username != user.username:
                raise PermissionDenied("You can only send messages as yourself.")
            customer = user

        serializer.save(customer=customer, sender=user, is_from_staff=user.is_staff)