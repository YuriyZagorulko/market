from rest_framework import serializers
from marketBackend.apps.market.models.custom_user import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = [ 'email', 'username', 'second_name', 'last_name', 'phone', 'birthday', 'is_verified', 'date_joined', 'avatar']

    def to_representation(self, obj):
        res = super(CustomUserSerializer, self).to_representation(obj)
        return res
    
    # def create(self, validated_data):
    #     profile_data = validated_data.pop('profile')
    #     user = User.objects.create(**validated_data)
    #     Profile.objects.create(user=user, **profile_data)
    #     return user