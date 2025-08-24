from django.contrib import admin
from .models import Products, ProductCategory, ProductDetails

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ("product_name", "product_price", "product_id")
    search_fields = ("product_name",)
    list_filter = ("product_price",)

@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ("category_name", "category_id")
    search_fields = ("category_name",)

@admin.register(ProductDetails)
class ProductDetailsAdmin(admin.ModelAdmin):
    list_display = ("product", "category", "stock_quantity", "sku")
    search_fields = ("sku",)
    list_filter = ("category",)
