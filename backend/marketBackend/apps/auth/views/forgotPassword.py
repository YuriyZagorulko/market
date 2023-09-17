from marketBackend.apps.market.models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from datetime import datetime
import json
from django.template import loader
import os


class ForgotPasswordView(APIView):
    def post(self, request):

        email = request.data['email']
        # email = request.query_params.get('email', '')
        user = CustomUser.objects.get_or_none(email__exact=email)
        
        if user: 

            SECRET_KEY = settings.SECRET_KEY
            password = bytes(SECRET_KEY,'UTF-8')
            salt = bytes('salt','UTF-8')
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=390000,
            )
            key = base64.urlsafe_b64encode(kdf.derive(password))
            f = Fernet(key)
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")
            userData = json.dumps({ "id": user.id, "exparationDate": now})
            token = f.encrypt(bytes(userData, 'UTF-8')).decode("utf-8")

            # encrypted = token

            # decrypted = f.decrypt(token)
            # return Response({
            #     'token': encrypted,
            # }) 

            template_path = os.path.join(settings.BASE_DIR, 'marketBackend/apps/auth/templates/RestorePassword.html')
            html_message = loader.render_to_string(
                        template_path,
                        {
                            'link_adress': os.environ.get('SITE_URL', '') + '/auth/restore-password?token=' + token,
                        }
                    )
            send_mail(
                subject='Restore password',
                message='Restore password for ' + email,
                from_email=os.environ.get('GMAIL_EMAIL', ''),
                html_message=html_message,
                recipient_list=[email]
            )
        
        return Response({
                'message': 'done'
            }) 


class CheckRestorePasswordToken(APIView):
    def post(self, request):
        token = request.data['token']
        
        if(token):
            SECRET_KEY = settings.SECRET_KEY
            password = bytes(SECRET_KEY,'UTF-8')
            salt = bytes('salt','UTF-8')
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=390000,
            )
            key = base64.urlsafe_b64encode(kdf.derive(password))
            f = Fernet(key)
            try: 
                data = json.loads(f.decrypt(token))
                if 'id' in data:
                    return Response({
                        'message': 'valid' 
                    }) 
            except:
                return Response({
                    'error': 'token is invalid'
                }) 
        return Response({
                    'error': 'token is invalid'
                }) 
