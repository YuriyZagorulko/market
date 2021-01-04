from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('market/', include('marketBackend.apps.market.urls')),
    path('admin/', admin.site.urls),
]
