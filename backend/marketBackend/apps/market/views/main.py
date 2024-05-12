from marketBackend.apps.market.models import Product, ProductCategory
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer, ProductCategorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response

popularCategoriesKeys = ['MotorOils', 'TransmissionOils', 'CarCleaners', 'ChainOils', 'WindshieldWasherFluids', 'Coolants']
class MainView(APIView):
    def get(self, request):
        recomended = Product.objects.all().order_by('id')[:10]
        popular = Product.objects.all().order_by('-id')[:10]
        popularCategories = ProductCategory.objects.filter(keyWord__in=popularCategoriesKeys)
        serializerRecomended = ProductSerializer(recomended, many=True)
        serializerPopular = ProductSerializer(popular, many=True)
        serializerPopularCategories = ProductCategorySerializer(popularCategories, many=True)
        return Response({
            'recomended': serializerRecomended.data,
            'popular': serializerPopular.data,
            'popularCategories': serializerPopularCategories.data,
        }) #products.values()

