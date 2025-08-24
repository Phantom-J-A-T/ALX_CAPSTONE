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
    details = ProductDetailsSerializer(source='productdetails_set', many=True, read_only=True)

    class Meta:
        model = Products
        fields = '__all__'
