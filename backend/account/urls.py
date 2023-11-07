from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

app_name = "account"

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='sing_up'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='login_token'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
