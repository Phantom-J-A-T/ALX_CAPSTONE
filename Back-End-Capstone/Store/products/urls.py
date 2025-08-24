from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductCategoryViewSet, ProductDetailsViewSet

router = DefaultRouter()
router.register(r'', ProductViewSet, basename='products')
router.register(r'categories', ProductCategoryViewSet, basename='categories')
router.register(r'details', ProductDetailsViewSet, basename='details')

urlpatterns = [
    path('', include(router.urls)),
]
