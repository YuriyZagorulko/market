
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from marketBackend.apps.auth.authSerializers import RegisterSerializer
from rest_framework import generics


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer