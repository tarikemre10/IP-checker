from rest_framework import serializers
from .models import IpAddress

class IpAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = IpAddress
        fields = ['id', 'ip_address', 'status']
