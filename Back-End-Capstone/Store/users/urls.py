# users/urls.py
from django.urls import path
from .views import UserSignUpView, UserListView, UserDetailView, UserUpdateView, UserDeleteView, signup
from .views import get_user_profile

urlpatterns = [
    path('signup/', UserSignUpView.as_view(), name='signup'),
    path("", UserListView.as_view(), name="user-list"),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('user-detail/', get_user_profile, name='user-profile'),  # ✅ Added
    path('<int:pk>/update/', UserUpdateView.as_view(), name='user-update'),
    path("<int:pk>/delete/", UserDeleteView.as_view(), name='user-delete'),
    path('api/signup/', signup, name='api-signup'),
]

