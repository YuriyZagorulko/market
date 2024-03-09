from marketBackend.apps.market.rest_framework.pagination.custom_pagination import CustomPagination
from marketBackend.apps.market.models import Product, ProductCategory
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer
from itertools import chain
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from django.db.models import Q
from rest_framework.response import Response


        
  
class SearchViewSet(ModelViewSet):
    authentication_classes = []
    permission_classes = [] 
    pagination_class = CustomPagination
    allCategoryIds = []
    
    def findAllSubcategoriesByKeyword(self, keyword):
        try:
            searchedCategory = ProductCategory.objects.get(keyWord=keyword)
        except:
            searchedCategory = None
        self.allCategoryIds = []
        def findAllSubcategoriesById(id):
            self.allCategoryIds.append(id)
            allChildrenIds = []
            # allCategoryIds.append(id)
            # temp = ProductCategory.objects.filter(parentCategory_id__exact=id).values_list('id')            
            allChildrenIds = list(ProductCategory.objects.filter(parentCategory_id__exact=id).values_list('id', flat=True))
            # allCategoryIds = list(chain(allChildrenIds, allCategoryIds))
            for id in allChildrenIds:
               findAllSubcategoriesById(id)
                
            
        
        if searchedCategory:
            findAllSubcategoriesById(searchedCategory.id)
        return self.allCategoryIds
    
    def get_object(self):
        return get_object_or_404(Product, id=self.request.query_params.get("id"))

    def get_queryset(self, request, *args, **kwargs):
        qText = Q()
        qPrice = Q()
        qCategory = Q()
        text = request.query_params.get('text', '')
        priceFrom = request.query_params.get('priceFrom', '')
        priceTo = request.query_params.get('priceTo', '')
        categoryKeyWord = request.query_params.get('category', '')
        orderBy = request.query_params.get('orderBy', '')

        if text:
            qText &= Q(title__icontains=text)
        if categoryKeyWord:
            allSearchCategories = self.findAllSubcategoriesByKeyword(categoryKeyWord)
            
            if allSearchCategories:
                qCategory &= Q(categories__in=allSearchCategories)
        if not orderBy:
            orderBy = '-created_at'
        if priceFrom and priceTo:
            qPrice &= Q(price__gte=priceFrom, price__lte=priceTo)

        products = Product.objects.filter(qText).filter(qCategory).filter(qPrice).order_by(orderBy)
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
