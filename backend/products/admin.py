from django.contrib import admin
from .models import *


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']

    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('name',)}


class ProductPhotoInline(admin.StackedInline):
    model = ProductPhoto


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'price', 'available', 'created', 'updated']
    list_filter = ['available', 'created', 'updated']
    list_editable = ['price', 'available']
    inlines = [ProductPhotoInline]

    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('name',)}


@admin.register(ProductGenre)
class ProductGenreAdmin(admin.ModelAdmin):
    list_display = ['genre', 'slug', 'product_count']

    def product_count(self, obj):
        return obj.products.count()

    def get_prepopulated_fields(self, request, obj=None):
        return {'slug': ('genre',)}
