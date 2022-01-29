from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from marketBackend.apps.shared.serializers import CustomUserSerializer

class MyObtainTokenPairView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_serializer = CustomUserSerializer(user) 
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': user_serializer.data
        })