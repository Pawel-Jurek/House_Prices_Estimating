from django.contrib import admin
from django.urls import path, include
from valuation.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('valuation/', include('valuation.urls')),
    path('', index, name='index')
]
