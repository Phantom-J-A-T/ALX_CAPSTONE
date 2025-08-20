# users/urls.py
from django.urls import path
from .views import UserSignupView, UserListView, UserDetailView, UserUpdateView, UserDeleteView

urlpatterns = [
    path("signup/", UserSignupView.as_view(), name="signup"),
    path("", UserListView.as_view(), name="user-list"),
    path("<int:pk>/", UserDetailView.as_view(), name="user-detail"),
    path("<int:pk>/update/", UserUpdateView.as_view(), name="user-update"),
    path("<int:pk>/delete/", UserDeleteView.as_view(), name="user-delete"),
]
