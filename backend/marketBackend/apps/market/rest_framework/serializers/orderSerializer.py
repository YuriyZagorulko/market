from rest_framework import serializers
from marketBackend.apps.market.models import OrderDetails
from marketBackend.apps.market.rest_framework.serializers.productSerializer import ProductSerializer
from marketBackend.apps.market.models import Order

class OrderDetailsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = OrderDetails
        fields = ['quantity' ,'product']

class OrdersSerializer(serializers.ModelSerializer):
    details = OrderDetailsSerializer(many=True)
    class Meta:
        model = Order
        fields = (
            'id', 'orderType', 'recipientName', 'recipientSecondName', 'recipientSurname', 'phoneNumber', 'street',
            'city', 'house', 'officeRef', 'officeDescription', 'apartment', 'created_at', 'updated_at', 'details', 'orderStatus'
        )
    def to_representation(self, obj):
        res = super(OrdersSerializer, self).to_representation(obj)
        return res
    
    # def create(self, validated_data):
    #     profile_data = validated_data.pop('profile')
    #     user = User.objects.create(**validated_data)
    #     Profile.objects.create(user=user, **profile_data)
    #     return user