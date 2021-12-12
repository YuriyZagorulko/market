
from marketBackend.apps.market.models.custom_user import CustomUser
from rest_framework.permissions import AllowAny
from marketBackend.apps.auth.authSerializers import RegisterSerializer
from rest_framework import generics
from rest_framework.response import Response
from datetime import datetime

class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            request.data._mutable = True
            birthday = datetime.strptime( data['birthday'], '%Y-%m-%d')
            serializer = RegisterSerializer(data=data)
            if serializer.is_valid():
                user = CustomUser.objects.create(
                    username = data['username'],
                    email = data['email'],
                    second_name = data['second_name'],
                    last_name = data['last_name'],
                    phone = data['phone'],
                    birthday = birthday,
                )

                user.set_password(data['password'])
                user.save()
                return Response({
                    'message': 'success',
                })
            else:
                return Response({
                    'errors': serializer.errors
                })
        except BaseException as err:
            return Response({
                'errors': err.args[0]
            })
        
