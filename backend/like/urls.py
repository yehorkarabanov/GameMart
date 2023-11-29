from . import views
from rest_framework.routers import DefaultRouter

app_name = 'like'
router = DefaultRouter()
router.register(r'like', views.LikeViewSet, basename='like')
urlpatterns = router.urls
