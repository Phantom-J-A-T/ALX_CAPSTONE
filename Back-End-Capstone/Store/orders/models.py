from django.db import models
from products.models import Products, ProductDetails
from users.models import UserProfile

# Create your models here.
class Orders(models.Model):
    order_id = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    product_details = models.ForeignKey(ProductDetails, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return f"Order {self.order_id} by User {self.user_id}"