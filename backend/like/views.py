from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from .models import Like
from .serializers import LikeCreateDeleteSerializer, LikeListSerializer
from rest_framework.permissions import IsAuthenticated


class LikeViewSet(CreateModelMixin, ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated, ]
    queryset = Like.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return LikeListSerializer
        else:
            return LikeCreateDeleteSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return serializer_class(*args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(methods=['delete'], detail=False)
    def delete(self, request):
        try:
            Like.objects.get(game__pk=self.request.data.get("game")).delete()
            return Response(status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            return Response(
                {"detail": "Like does not exist for the given user and game."},
                status=status.HTTP_404_NOT_FOUND
            )
