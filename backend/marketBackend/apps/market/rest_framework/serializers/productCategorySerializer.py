from rest_framework import serializers
from marketBackend.apps.market.models import ProductCategory

class ProductCategorySerializer(serializers.ModelSerializer):
    parentCategoryData = serializers.SerializerMethodField()

    def get_parentCategoryData(self, obj):
        if obj.parentCategory is not None:
            return ProductCategorySerializer(obj.parentCategory).data
        return None

    class Meta:
        model = ProductCategory
        fields = [
            'id',
            'name',
            'name_UA',
            'parentCategory',
            'keyWord',
            'isRootCategory',
            'image',
            'parentCategoryData'
        ]