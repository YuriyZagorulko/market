from marketBackend.apps.market.models import Product
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class MainView(APIView):
    def get(self, request):
        recomended = Product.objects.all().order_by('id')[:10]
        popular = Product.objects.all().order_by('-id')[:10]
        serializerRecomended = ProductSerializer(recomended, many=True)
        serializerPopular = ProductSerializer(popular, many=True)
        return Response({
            'recomended': serializerRecomended.data,
            'popular': serializerPopular.data
        }) #products.values()

