from django.conf import settings
from django.db import models


class Message(models.Model):
    """A message thread entry between a customer and VeeFinds staff."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="messages")
    subject = models.CharField(max_length=200, blank=True)
    body = models.TextField()
    is_from_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        sender = "Staff" if self.is_from_staff else self.user.username
        return f"{sender}: {self.body[:30]}"
