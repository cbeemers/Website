from django.db import models

# Create your models here.

class Email(models.Model):
    subject = models.CharField(max_length=120, blank=True)
    return_address = models.CharField(max_length=120, blank=True)
    content = models.TextField(blank=True)


class Signup(models.Model):
    email = models.CharField(max_length=120, blank=True)
    password = models.CharField(max_length=120, blank=True)