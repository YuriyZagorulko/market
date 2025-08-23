from rest_framework.views import APIView
from rest_framework.response import Response
from marketBackend.apps.market.models import ProductCategory, Product
from marketBackend.apps.market.rest_framework.serializers.productCategorySerializer import ProductCategorySerializer
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer

class CategoryDetailView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, *args, **kwargs):
        category_key = request.GET.get('categoryKey')
        if not category_key:
            return Response({'error': 'categoryKey required'}, status=400)
        try:
            category = ProductCategory.objects.get(keyWord=category_key)
        except ProductCategory.DoesNotExist:
            return Response({'error': 'Category not found'}, status=404)
        children = ProductCategory.objects.filter(parentCategory=category)
        popular_products = Product.objects.filter(categories=category).order_by('-id')[:10]
        return Response({
            'category': ProductCategorySerializer(category).data,
            'children': ProductCategorySerializer(children, many=True).data,
            'popularProducts': ProductSerializer(popular_products, many=True).data
        })
