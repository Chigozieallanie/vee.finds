from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, OTP


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ["username", "email", "phone_number", "is_phone_verified", "is_staff"]
    fieldsets = UserAdmin.fieldsets + (
        ("VeeFinds info", {"fields": ("phone_number", "is_phone_verified")}),
    )


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ["user", "code", "is_used", "created_at"]
