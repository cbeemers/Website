from django.db import models

# Create your models here.

class Search(models.Model):
    company = models.CharField(max_length=120, blank=True)
    