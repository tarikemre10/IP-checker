from django.db import models

class IpAddress(models.Model):
    ip_address = models.GenericIPAddressField(unique=True)
    status = models.CharField(max_length=20)  # Adjust max_length as needed

    def __str__(self):
        return f"{self.ip_address} - {self.status}"