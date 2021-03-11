from django.views import View
from marketBackend.apps.market.models import Product, Image
from rest_framework.views import APIView
from rest_framework.response import Response
from marketBackend.apps.market.serializers.productSerializer import ProductSerializer
from marketBackend.secret import NP_API_KEY
import requests
import json

class ShippingView(APIView):
    def get(self, request, *args, **kwargs):
        post_data = str(json.dumps({
            "apiKey": NP_API_KEY,
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                    "CityName": "київ",
                    "Limit": 5
                }
        })).encode('utf-8')
        response = requests.post('https://api.novaposhta.ua/v2.0/json/', data=post_data)
        content = response.content
        return Response({
            'content': content
        })  # products.values()

    # def get(self, request, *args, **kwargs):
    #     productId = int(request.GET.get('productId'))
    #     product= Product.objects.get(pk=productId)
    #     serializer = ProductSerializer(product)
    #     return Response({
    #         'product': serializer.data
    #     })  # products.values()