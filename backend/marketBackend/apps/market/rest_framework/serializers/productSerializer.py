from rest_framework import serializers
from marketBackend.apps.market.models import Product, Image, ProductCategory
from .imageSerializer import ImageSerializer
from .productCategorySerializer import ProductCategorySerializer

class ProductSerializer(serializers.ModelSerializer):
    imagesSet = serializers.SerializerMethodField()
    categoryData = serializers.SerializerMethodField()
    categories = ProductCategorySerializer(many=True)

    def get_imagesSet(self, obj):
        if hasattr(obj, "album") and obj.album:
            images = obj.album.images.all()
            return ImageSerializer(images, many=True).data
        return []

    def get_categoryData(self, obj):
        category = obj.categories.first()
        if category:
            return ProductCategorySerializer(category).data
        return None

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "price",
            "description",
            "created_at",
            "updated_at",
            "url",
            "characteristics",
            "categories",
            "imagesSet",     # nested images
            "categoryData",  # first category info
        ]
