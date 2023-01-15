from django.urls import path
from marketBackend.apps.auth.views import MyObtainTokenPairView, RegisterView, ForgotPasswordView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('request-restore-password/', ForgotPasswordView.as_view(), name='auth_request_restore_password'),
]