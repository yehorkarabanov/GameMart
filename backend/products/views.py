from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import Product, Category, ProductGenre
from .serializers import CategorySerializer, ProductListSerializer, ProductGenreSerializer


class CategoryViewSet(ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# separate list and detail
class ProductViewSet(ReadOnlyModelViewSet):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        queryset = Product.objects.all()

        limit = self.request.query_params.get('limit')
        if limit and limit.isdigit():
            queryset = queryset[:int(limit)]

        return queryset


class ProductGenreViewSet(ReadOnlyModelViewSet):
    queryset = ProductGenre.objects.all()
    serializer_class = ProductGenreSerializer
