from django.contrib import admin
from django.urls import path, include
from valuation.views import index
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('valuation/', include('valuation.urls')),
    path('users/', include('users.urls')),
    path('', index, name='index')
]
