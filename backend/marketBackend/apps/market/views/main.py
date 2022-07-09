from marketBackend.apps.market.models import Product
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class MainView(APIView):
    def get(self, request):
        products = Product.objects.all().order_by('id')[:10]
        serializer = ProductSerializer(products, many=True)
        return Response({
            'products': serializer.data
        }) #products.values()

