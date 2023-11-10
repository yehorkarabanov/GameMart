from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'products'

router = DefaultRouter()
router.register(r'category', views.CategoryViewSet, basename='category')
router.register(r'product', views.ProductViewSet, basename='product')
router.register(r'product_genre', views.ProductGenreViewSet, basename='product_genre')

urlpatterns = router.urls
