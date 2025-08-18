from django.db import models
from products.models import Products, ProductDetails
from users.models import UserProfile
from orders.models import Orders

# Create your models here.
class Cart(models.Model):
    cart_id = models.CharField(max_length=100, unique=True)
    user_id = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    product_details = models.ForeignKey(ProductDetails, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    added_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart {self.cart_id} for User {self.user_id}"