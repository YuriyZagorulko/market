from django.urls import include, path
from marketBackend.apps.market.views import IndexView
from marketBackend.apps.market.views import TestView
from marketBackend.apps.market.views import MainView
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('', IndexView.as_view()),
    path('main-page', MainView.as_view()),
    path('test', TestView.as_view()),
    path('auth-token', obtain_auth_token, name='obtain-token')
]
