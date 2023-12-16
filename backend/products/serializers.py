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


class ProductListSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['name', 'slug', "image", 'price', 'available', 'pk']

    def get_image(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None


class ProductMinimumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ['pk']


class ProductDetailSerializer(serializers.HyperlinkedModelSerializer):
    category = CategorySerializer()
    photos = ProductPhotoSerializer(many=True)
    genre = ProductGenreSerializer(many=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['name', 'slug', 'category', 'description', "image", 'price', 'available',
                  'created', 'updated', 'photos', 'genre', 'pk']

    def get_image(self, obj):
        if obj.image:
            # Assuming obj.image stores the relative path to the image
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
