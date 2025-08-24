# users/urls.py
from django.urls import path
from .views import UserSignUpView, UserListView, UserDetailView, UserUpdateView, UserDeleteView, signup

urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='signup'),
    path("", UserListView.as_view(), name="user-list"),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('<int:pk>/update/', UserUpdateView.as_view(), name='user-update'),
    path("<int:pk>/delete/", UserDeleteView.as_view(), name='user-delete'),
    path('api/signup/', signup, name='api-signup'),  # API endpoint for user signup
]
