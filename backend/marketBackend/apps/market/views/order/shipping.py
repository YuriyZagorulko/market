from django.views import View
from marketBackend.apps.market.models import Product, Image
from rest_framework.views import APIView
from rest_framework.response import Response
from marketBackend.apps.market.serializers.productSerializer import ProductSerializer
from marketBackend.secret import NP_API_KEY
from django.conf import settings
import os

import requests
import json
ROOT_DIR = os.path.join(settings.BASE_DIR)

class CitiesNPView(APIView):
    def get(self, request, *args, **kwargs):
        cityName = request.GET.get('cityName')
        post_data = str(json.dumps({
            "apiKey": NP_API_KEY,
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                    "CityName": cityName,
                    "Limit": 5
                }
        })).encode('utf-8')
        response = requests.post('https://api.novaposhta.ua/v2.0/json/', data=post_data)
        content = json.loads(response.content)
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

class OfficesNPView(APIView):
    def get(self, request, *args, **kwargs):
        selectedCityRef = request.query_params.get('selectedCity')
        try:
            with open( os.path.join(ROOT_DIR, "media/storage/NP_Offices.json")) as file:
                try:
                    arr = []
                    content = json.load(file)
                    temp = []
                    for office in content["data"]:
                        if selectedCityRef == office["CityRef"]:
                            arr.append({ 'description': office["Description"], 'ref':  office["Ref"] })
                            temp.append(office)
                except Exception as e:
                    print("An exception occurred")
                    print(e)
                return Response({
                    'content': arr
                })  # products.values()
        except Exception as e:
            print(e)