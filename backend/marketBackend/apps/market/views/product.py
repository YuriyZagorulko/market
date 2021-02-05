from django.views import View
from marketBackend.apps.market.models import Product, Image

class ProductView(View):
    def get(self, request, *args, **kwargs):
        value = request.GET.get('mykey')
        products = Product.objects.get(pk=1)
        return Response({
            'products': 'lol'
        })  # products.values()
