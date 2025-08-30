from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

def get_or_create_cart_for_user(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart = get_or_create_cart_for_user(request.user)
        return Response(CartSerializer(cart).data)

    @action(detail=False, methods=["delete"])
    def clear(self, request):
        # not used—action is for ViewSets. We expose a separate endpoint below.
        pass

class CartItemViewSet(viewsets.ModelViewSet):
    """
    list:   List current user's cart items
    create: Add to cart (if product exists in cart, increment)
    retrieve: (not necessary but available)
    partial_update: Update quantity
    destroy: Remove item
    """
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cart = get_or_create_cart_for_user(self.request.user)
        # Only their items
        return CartItem.objects.filter(cart=cart).select_related("product")

    def create(self, request, *args, **kwargs):
        cart = get_or_create_cart_for_user(request.user)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data["product"]
        qty = serializer.validated_data["quantity"]

        with transaction.atomic():
            item, created = CartItem.objects.select_for_update().get_or_create(
                cart=cart, product=product, defaults={"quantity": qty}
            )
            if not created:
                item.quantity += qty
                item.save()

        # return updated cart
        return Response(CartSerializer(cart).data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        # Supports {"quantity": N}
        response = super().partial_update(request, *args, **kwargs)
        # Replace default item response with full cart snapshot (nice DX)
        cart = get_or_create_cart_for_user(request.user)
        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["delete"], url_path="clear")
    def clear_cart(self, request):
        cart = get_or_create_cart_for_user(request.user)
        deleted, _ = cart.items.all().delete()
        return Response({"deleted_items": deleted, "cart": CartSerializer(cart).data})
