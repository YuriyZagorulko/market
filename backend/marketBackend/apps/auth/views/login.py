from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

from marketBackend.apps.shared.serializers import CustomUserSerializer

class MyObtainTokenPairView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=False) :
            user = serializer.validated_data['user']
            user_serializer = CustomUserSerializer(user) 
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': user_serializer.data
            })
        else:
            return Response({
                'error': 'Invalid Creds',
            }, status=status.HTTP_401_UNAUTHORIZED)