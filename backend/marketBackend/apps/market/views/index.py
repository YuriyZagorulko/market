from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response

class IndexView(APIView):
    def get(self, request):
        return Response({
            'myMessage': "Hello, world. You're at the index page."
        })
    def post(self, request, *args, **kwargs):
        return Response({
            'securedMessage': "Good news Yuri"
        })

