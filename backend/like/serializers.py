from rest_framework import serializers
from products.models import Product
from .models import Like
from products.serializers import ProductSerializer


class LikeListSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    game = ProductSerializer()

    class Meta:
        model = Like
        fields = ['user', 'game']


class LikeCreateDeleteSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    game = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Like
        fields = ['user', 'game']
