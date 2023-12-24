from django.contrib import admin
from .models import *


@admin.register(Like)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'game']
