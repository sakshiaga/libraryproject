from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api/dashboard/', views.dashboard, name='dashboard'),
    path('api/dashboard/my-books/', views.mybooks, name='mybooks'),
    path('api/dashboard/all-books/', views.allbooks, name='allbooks'),

]