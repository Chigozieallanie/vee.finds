from django.conf import settings
from django.db import models


class Message(models.Model):
    """
    A message thread entry between a customer and VeeFinds staff.

    `customer` identifies whose thread this message belongs to (always the
    customer, even for staff replies). `sender` identifies who actually
    wrote this particular message (the customer themselves, or a staff
    member replying on their behalf).
    """
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="customer_messages")
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_messages")
    subject = models.CharField(max_length=200, blank=True)
    body = models.TextField()
    is_from_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        sender_label = "Staff" if self.is_from_staff else self.customer.username
        return f"{sender_label}: {self.body[:30]}"