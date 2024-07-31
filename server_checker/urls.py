# server_checker/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='homepage'),
    path('upload/', views.upload_excel, name='upload_excel'),
    path('check/', views.check_excel, name='check excel' ),
    path('delete/', views.delete_items, name='delete'),
    # Other URLs...
]