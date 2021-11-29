
from marketBackend.apps.market.models.custom_user import CustomUser
from rest_framework.permissions import AllowAny
from marketBackend.apps.auth.authSerializers import RegisterSerializer
from rest_framework import generics


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer