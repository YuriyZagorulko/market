from marketBackend.apps.market.models.order import Order
from marketBackend.apps.market.rest_framework.serializers.orderSerializer import OrdersSerializer
from marketBackend.apps.market.models import Product, Image
from rest_framework.views import APIView
from rest_framework.response import Response
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer
from marketBackend.apps.shared.responses.shared import succesResponce
from marketBackend.secret import NP_API_KEY
import marketBackend.apps.market.helpers.orders as orderHelpers
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class OrderView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        
        orders = Order.objects.filter(user=request.user.id)
        serializer = OrdersSerializer(orders, many=True)
        content = {
            'data': serializer.data
        }
        return Response(content)

class ConfirmOrderView(APIView):
    # add data validation
    def post(self, request, *args, **kwargs):
        data = request.data
        order = orderHelpers.createOrder(data)
        return Response(succesResponce)