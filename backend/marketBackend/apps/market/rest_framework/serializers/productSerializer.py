from rest_framework import serializers
from marketBackend.apps.market.models import Product, Image
from .imageSerializer import ImageSerializer
from marketBackend.apps.market.rest_framework.serializers.imageSerializer import ImageSerializer

class ProductSerializer(serializers.ModelSerializer):
    imagesSet = serializers.SerializerMethodField() #images

    def get_imagesSet(self, obj): #get_images
        images = Image.objects.filter(album_id=obj.images.pk)
        serializer_class = ImageSerializer(images, many=True)
        return serializer_class.data
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'description', 'images', 'created_at', 'updated_at', 'imagesSet']