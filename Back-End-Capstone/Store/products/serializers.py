from rest_framework import serializers
from .models import Products, ProductCategory, ProductDetails


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'


class ProductDetailsSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductCategory.objects.all(), 
        source="category",
        write_only=True
    )

    class Meta:
        model = ProductDetails
        fields = ['id', 'product', 'category', 'category_id', 'stock_quantity', 'sku']


class ProductSerializer(serializers.ModelSerializer):
    # map model fields to frontend-friendly names
    name = serializers.CharField(source="product_name")
    price = serializers.DecimalField(source="product_price", max_digits=10, decimal_places=2)
    image = serializers.ImageField(source="product_image")

    class Meta:
        model = Products
        fields = ["id", "name", "price", "image", "product_description"]
