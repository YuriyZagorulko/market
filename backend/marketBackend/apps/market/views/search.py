from marketBackend.apps.market.rest_framework.pagination.custom_pagination import CustomPagination
from marketBackend.apps.market.models import Product, ProductCategory
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from django.db.models import Q

class SearchViewSet(ModelViewSet):
    authentication_classes = []
    permission_classes = [] 
    pagination_class = CustomPagination

    def get_object(self):
        return get_object_or_404(Product, id=self.request.query_params.get("id"))

    def get_queryset(self, request, *args, **kwargs):
        qText = Q()
        qCategory = Q()
        text = request.query_params.get('text', '')
        categoryWord = request.query_params.get('category', '')

        searchedCategory = ProductCategory.objects.get(keyWord=categoryWord)

        if text:
            qText &= Q(title__icontains=text)
        if searchedCategory:
            qText &= Q(category=searchedCategory)
        products = Product.objects.filter(qText).filter(qCategory).order_by('-created_at')
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
