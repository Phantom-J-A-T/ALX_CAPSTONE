from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static


# Redirect root ("/") to admin
def home(request):
    return redirect('admin:index')   # uses Django’s admin namespace

urlpatterns = [
    path('', home, name='home'),        # Redirect root "/" → "/admin/"
    path('admin/', admin.site.urls),    # Admin stays here
    path('api/users/', include('users.urls')),
    path('api/products/', include('products.urls')),
    path("api/cart/", include("cart.urls")),

    # JWT Authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
