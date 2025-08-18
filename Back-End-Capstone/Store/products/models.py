from django.db import models

# Create your models here.
class Products(models.Model):
    product_id = models.CharField(max_length=100, unique=True)
    product_name = models.CharField(max_length=100)
    product_description = models.TextField()
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    product_image = models.ImageField(upload_to='product_images/', blank=True, null=True)

    def __str__(self):
        return self.product_name

class ProductCategory(models.Model):
    category_id = models.CharField(max_length=100, unique=True)
    category_name = models.CharField(max_length=100)
    category_description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.category_name

class ProductDetails(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    stock_quantity = models.IntegerField(default=0)
    sku = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.product.product_name} - {self.category.category_name}"