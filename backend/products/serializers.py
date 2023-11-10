from rest_framework import serializers
from .models import Category, ProductPhoto, Product, ProductGenre


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug', 'pk']


class ProductGenreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductGenre
        fields = ['genre', 'slug', 'pk']


class ProductPhotoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductPhoto
        fields = ['photo']


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    category = CategorySerializer()
    photos = ProductPhotoSerializer(many=True)
    genre = ProductGenreSerializer(many=True)

    class Meta:
        model = Product
        fields = ['name', 'slug', 'category', 'description', "image", 'price', 'available',
                  'created', 'updated', 'photos', 'genre', 'pk']
