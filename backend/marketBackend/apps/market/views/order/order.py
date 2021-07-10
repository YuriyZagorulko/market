from marketBackend.apps.market.models import Product, Image
from rest_framework.views import APIView
from rest_framework.response import Response
from marketBackend.apps.market.serializers.productSerializer import ProductSerializer
from marketBackend.secret import NP_API_KEY

class OrderView(APIView):
    def get(self, request, *args, **kwargs):
        post_data = {
            "apiKey": NP_API_KEY,
            "modelName": "Address",
            "calledMethod": "searchSettlements",
            "methodProperties": {
                    "CityName": "київ",
                    "Limit": 5
                }
        }
        response = requests.post('https://api.novaposhta.ua/v2.0/json/', data=post_data)
        content = response.content
        return Response({
            'content': content
        })  # products.values()

class ConfirmOrderView(APIView):
    def post(self, request, *args, **kwargs):
        print(request)
        return Response({
            'content': 'super new test 3'
        })