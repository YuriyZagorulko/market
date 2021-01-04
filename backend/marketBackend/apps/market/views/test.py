from django.views import View
from django.http import HttpResponse

class TestView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse('Welcome to your test page')
