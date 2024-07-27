from django.urls import path
from .views import UserCreateView, UserDetailView, LogoutView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='user_register'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('<int:pk>/', UserDetailView.as_view(), name='user_detail'),
]
