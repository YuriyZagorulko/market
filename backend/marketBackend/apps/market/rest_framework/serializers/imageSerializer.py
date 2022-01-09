from rest_framework import serializers
from marketBackend.apps.market.models import Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'name', 'image', 'default', 'width', 'length', 'album']