from rest_framework import serializers
from marketBackend.apps.market.models import Product, Image, ProductCategory
from .imageSerializer import ImageSerializer
from .productCategorySerializer import ProductCategorySerializer
from marketBackend.apps.market.rest_framework.serializers.imageSerializer import ImageSerializer

class ProductSerializer(serializers.ModelSerializer):
    imagesSet = serializers.SerializerMethodField() #images
    categoryData = serializers.SerializerMethodField()
    categories = ProductCategorySerializer(many=True)
    
    def get_imagesSet(self, obj): #get_images
        images = []
        if obj.images:
            images = Image.objects.filter(album_id=obj.images.pk)
        serializer_class = ImageSerializer(images, many=True)
        return serializer_class.data
    
    def get_categoryData(self, obj):
        category = obj.categories.first()
        serializer_class = ProductCategorySerializer(category)
        return serializer_class.data
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'description', 'images', 'created_at', 'updated_at', 'imagesSet', 'url', 'characteristics', 'categories', 'categoryData']
        
