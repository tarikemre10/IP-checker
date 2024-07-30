from django.db import models

class Server(models.Model):
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=50)
    last_checked = models.DateTimeField()

    def __str__(self):
        return self.name
    


class IpAddress(models.Model):
    ip_address = models.GenericIPAddressField(unique=True)
    status = models.CharField(max_length=20)  # Adjust max_length as needed

    def __str__(self):
        return f"{self.ip_address} - {self.status}"