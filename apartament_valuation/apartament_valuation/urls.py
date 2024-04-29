from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('valuation/', views.valuation, name = "valuation"),
    path('addresses/<str:city>/', views.addresses, name = "addresses"),
    path('', views.index, name='index')
]
