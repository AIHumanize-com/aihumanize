from django.db import models

# Create your models here.
class DetectRequestCounter(models.Model):
    ip_address = models.CharField(max_length=45)  
    request_count = models.IntegerField(default=0)
    last_request_time = models.DateTimeField(auto_now=True)

