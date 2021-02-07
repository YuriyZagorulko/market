from django.views import View
from marketBackend.apps.market.models import Product, Image
from rest_framework.views import APIView
from rest_framework.response import Response
from marketBackend.apps.market.serializers.productSerializer import ProductSerializer

class ProductView(APIView):
    def get(self, request, *args, **kwargs):
        productId = int(request.GET.get('productId'))
        product= Product.objects.get(pk=productId)
        serializer = ProductSerializer(product)
        return Response({
            'product': serializer.data
        })  # products.values()
