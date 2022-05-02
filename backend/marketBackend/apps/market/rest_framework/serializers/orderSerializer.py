from rest_framework import serializers
from marketBackend.apps.market.models import Order

class OrdersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order

        fields = '__all__'

    def to_representation(self, obj):
        res = super(OrdersSerializer, self).to_representation(obj)
        return res
    
    # def create(self, validated_data):
    #     profile_data = validated_data.pop('profile')
    #     user = User.objects.create(**validated_data)
    #     Profile.objects.create(user=user, **profile_data)
    #     return user