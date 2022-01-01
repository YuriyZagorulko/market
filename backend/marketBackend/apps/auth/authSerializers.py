from rest_framework import serializers
from marketBackend.apps.market.models.custom_user import CustomUser
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'confirm_password', 'email', 'second_name', 'last_name', 'phone', 'birthday')
        extra_kwargs = {
            'second_name': {'required': True},
            'last_name': {'required': True},
            'phone': {'required': True},
            'birthday': {'required': True},
        }
        error_messages = {"birthday": {"required": "Give yourself a birthday"}}

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            second_name=validated_data['second_name'],
            last_name=validated_data['last_name'],
            phone=validated_data['phone'],
            birthday=validated_data['birthday'],
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user