from django.urls import path
from .views import CartViewSet

cart_list = CartViewSet.as_view({"get": "list"})
cart_add = CartViewSet.as_view({"post": "add_item"})
cart_remove = CartViewSet.as_view({"delete": "remove_item"})

urlpatterns = [
    path("", cart_list, name="cart-detail"),
    path("add/", cart_add, name="cart-add"),
    path("remove/<int:pk>/", cart_remove, name="cart-remove"),
]
