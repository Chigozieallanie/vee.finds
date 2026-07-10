from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, OTP
from .serializers import SignupSerializer, VerifyOtpSerializer, LoginSerializer, UserSerializer
from .utils import send_welcome_email, send_otp_sms


class SignupView(APIView):
    """Create the account, email a welcome notification with the OTP, and text an OTP."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        otp = OTP.objects.create(user=user, code=OTP.generate_code())

        send_welcome_email(user, otp_code=otp.code)
        send_otp_sms(user, otp.code)

        return Response(
            {
                "message": "Account created. Check your email for your activation code.",
                "username": user.username,
            },
            status=status.HTTP_201_CREATED,
        )


class VerifyOtpView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerifyOtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data["username"]
        code = serializer.validated_data["code"]

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        otp = OTP.objects.filter(user=user, code=code, is_used=False).order_by("-created_at").first()
        if not otp:
            return Response({"detail": "Invalid activation code."}, status=status.HTTP_400_BAD_REQUEST)
        if otp.is_expired():
            return Response({"detail": "Activation code expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)

        otp.is_used = True
        otp.save()
        user.is_phone_verified = True
        user.save()

        return Response({"message": "Phone number verified. You can now log in."})


class ResendOtpView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get("username")
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        otp = OTP.objects.create(user=user, code=OTP.generate_code())
        send_welcome_email(user, otp_code=otp.code)
        send_otp_sms(user, otp.code)
        return Response({"message": "A new activation code has been sent to your email."})


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
            }
        )


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)