# cart/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartView, CartItemViewSet

router = DefaultRouter()
router.register(r"items", CartItemViewSet, basename="cart-items")

urlpatterns = [
    path("", CartView.as_view(), name="cart-detail"),
    path("", include(router.urls)),           
    path("clear/", CartItemViewSet.as_view({"delete": "clear_cart"}), name="cart-clear"),
]
