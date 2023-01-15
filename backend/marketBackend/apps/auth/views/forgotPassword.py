from marketBackend.apps.market.models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
import yagmail

class ForgotPasswordView(APIView):
    def get(self, request):
        email = request.query_params.get('email', '')
        user = CustomUser.objects.get_or_none(email__exact=email)
        yag = yagmail.SMTP(GMAIL_EMAIL, GMAIL_PASSWORD)
        if user:
            GMAIL_EMAIL = os.getenv('GMAIL_EMAIL', 'GMAIL_EMAIL'),
            GMAIL_PASSWORD = os.getenv('GMAIL_PASSWORD', 'GMAIL_PASSWORD'),
            yag.send(to='paukan602@gmail.com',  subject="New order!", contents=contents)
            return Response({
                'message': 'Email Sent'
            })
        else: 
            return Response({
                'error': 'UserNotFound'
            }) 


