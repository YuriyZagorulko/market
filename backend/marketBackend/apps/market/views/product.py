from django.http import Http404
from marketBackend.apps.market.models import Product, Image
from rest_framework.views import APIView
from rest_framework.response import Response
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer

class ProductView(APIView):
    def get(self, request, *args, **kwargs):
        productUrl = request.GET.get('productUrl')

        product = None
        try:
            product = Product.objects.get(url=productUrl)
        except Product.DoesNotExist:
            try:
                product = Product.objects.get(id=int(productUrl))
            except:
                raise Http404
        serializer = ProductSerializer(product)
        return Response({
            'product': serializer.data
        })  # products.values()
