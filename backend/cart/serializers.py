from rest_framework import serializers
from products.models import Product
from .models import Cart
from products.serializers import ProductListSerializer, ProductMinimumSerializer


class CartListSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    game = ProductListSerializer()

    class Meta:
        model = Cart
        fields = ["user", 'game', 'amount', 'paid', 'created', 'updated']


class CartCreateDeleteSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    game = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    amount = serializers.IntegerField(default=1)

    class Meta:
        model = Cart
        fields = ['user', 'game', 'amount']


class CartUpdateSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    game = ProductMinimumSerializer(read_only=True )

    class Meta:
        model = Cart
        fields = ['amount', 'paid', 'user', 'game']
        read_only_fields = ['created', 'updated']

