from marketBackend.apps.market.models import Product, Image
from rest_framework.views import APIView
from rest_framework.response import Response
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer
from marketBackend.secret import NP_API_KEY
import marketBackend.apps.market.helpers.orders as orderHelpers
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class OrderView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

class ConfirmOrderView(APIView):

    # add data validation
    def post(self, request, *args, **kwargs):
        data = request.data
        order = orderHelpers.createOrder(data)
        return Response({
            'content': 'super new test 3'
        })