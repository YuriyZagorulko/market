from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from .views import current_user, UserList
from . import views

urlpatterns = [
    path('token-auth/', obtain_jwt_token),
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('', views.index, name='index'),
]