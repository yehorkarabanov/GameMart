from . import views
from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = 'cart'
router = DefaultRouter()
router.register(r'cart', views.CartViewSet, basename='cart')
urlpatterns = router.urls
