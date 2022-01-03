from django.urls import include, path
from marketBackend.apps.market.views import IndexView
from marketBackend.apps.market.views import ProductView
from marketBackend.apps.market.views import OfficesNPView
from marketBackend.apps.market.views import CitiesNPView
from marketBackend.apps.market.views import MainView
from marketBackend.apps.market.views import ConfirmOrderView
from marketBackend.apps.market.views import SearchViewSet
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', IndexView.as_view()),
    path('main-page', MainView.as_view()),
    path('product', ProductView.as_view()),
    path('search', SearchViewSet.as_view({'get': 'get_queryset'})),
    path('shipping/np/cities', CitiesNPView.as_view()),
    path('shipping/np/offices', OfficesNPView.as_view()),
    path('shipping/confirm-order', ConfirmOrderView.as_view()),
]
