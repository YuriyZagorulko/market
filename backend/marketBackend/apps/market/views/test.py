from django.views import View
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated

class TestView(View):
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        return HttpResponse('Welcome to your test page')
