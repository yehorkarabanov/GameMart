from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.mixins import CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from .models import Cart
from .serializers import CartCreateDeleteSerializer, CartUpdateSerializer, CartListSerializer
from rest_framework.permissions import IsAuthenticated


class CartViewSet(CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated, ]
    queryset = Cart.objects.all()
    http_method_names = ['get', 'post', 'delete', 'patch']
    lookup_field = "game__pk"

    def get_serializer_class(self):
        if self.action == 'list':
            return CartListSerializer
        elif self.action == "partial_update":
            return CartUpdateSerializer
        else:
            return CartCreateDeleteSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['delete'])
    def destroy_all_for_user(self, *args, **kwargs):
        user = self.request.user
        try:
            obj = self.queryset.filter(user=user)
            count = obj.delete()[0]  # This returns a tuple (num_deleted, dict_of_info)

            if count > 0:
                return Response({'message': 'Objects deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'message': 'No objects found to delete for the given user'},
                                status=status.HTTP_404_NOT_FOUND)
        except Cart.DoesNotExist:
            return Response({'message': 'No objects found to delete for the given user'},
                            status=status.HTTP_404_NOT_FOUND)
