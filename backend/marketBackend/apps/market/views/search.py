from marketBackend.apps.market.rest_framework.pagination.custom_pagination import CustomPagination
from marketBackend.apps.market.models import Product
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404


class SearchViewSet(ModelViewSet):
    pagination_class = CustomPagination

    def get_object(self):
        return get_object_or_404(Product, id=self.request.query_params.get("id"))

    def get_queryset(self, request, *args, **kwargs):
        serializer = ProductSerializer(Product.objects.order_by('-created_at'), many=True)
        return Response(serializer.data)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
