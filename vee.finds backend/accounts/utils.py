from django.conf import settings
from django.core.mail import send_mail


def send_welcome_email(user, otp_code=None):
    """Email notification sent right after signup, including the activation code."""
    subject = "Welcome to VeeFinds 💜 — Your activation code"
    otp_line = f"\n\nYour activation code is: {otp_code}\n" if otp_code else ""
    message = (
        f"Hi {user.first_name or user.username},\n\n"
        "Thanks for signing up on VeeFinds — find it, love it, bag it!"
        f"{otp_line}"
        f"\nEnter this code on the verification page to activate your account. "
        f"It expires in {settings.OTP_EXPIRY_MINUTES} minutes.\n\n"
        "— The VeeFinds Team"
    )
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )


def send_otp_sms(user, code):
    """Send the OTP activation code to the user's phone.

    Two backends are supported:
    - "console": prints the code to the server log (useful for local dev,
       no credentials required).
    - "twilio": sends a real SMS via Twilio. Requires TWILIO_ACCOUNT_SID,
       TWILIO_AUTH_TOKEN and TWILIO_PHONE_NUMBER to be set in the environment.
    """
    message = f"Your VeeFinds activation code is {code}. It expires in {settings.OTP_EXPIRY_MINUTES} minutes."

    if settings.SMS_BACKEND == "twilio" and settings.TWILIO_ACCOUNT_SID:
        from twilio.rest import Client

        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        client.messages.create(
            body=message,
            from_=settings.TWILIO_PHONE_NUMBER,
            to=user.phone_number,
        )
    else:
        # Console/dev fallback — replace SMS_BACKEND=twilio + credentials in
        # .env to send real SMS messages.
        print(f"[DEV SMS to {user.phone_number}] {message}")