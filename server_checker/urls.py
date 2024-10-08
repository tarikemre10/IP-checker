# server_checker/urls.py
from django.urls import path
from . import views

#from .views import UploadExcelView

#path('api/upload-excel/', UploadExcelView.as_view(), name='upload-excel'),

urlpatterns = [
    path('check/', views.CheckExcelView.as_view(), name='check-excel' ),
    path('delete/', views.DeleteItemsView.as_view(), name='delete'),
    path('upload/', views.UploadExcelView.as_view(), name='upload-excel'),
    path('ip-addresses/', views.IpAddressListView.as_view(), name='ip-adress-list'),
    # Other URLs...
    path('delete-inactives/', views.DeleteExcelView.as_view(), name='delete-inactive-ip-adress-list'),
]