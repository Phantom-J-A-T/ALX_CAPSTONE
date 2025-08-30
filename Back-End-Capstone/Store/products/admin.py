from django.contrib import admin
from .models import Product, Category

@admin.register(Category)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")  # use real fields
    search_fields = ("name",)


@admin.register(Product)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price", "category", "created_at")  # use real fields
    list_filter = ("category",)  # filter by category instead of price
    search_fields = ("name", "description")
