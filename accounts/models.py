from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Signup(models.Model):
    email = models.CharField(max_length=120, blank=True)
    username = models.CharField(max_length=120, blank=False)
    password = models.CharField(max_length=120, blank=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    company = models.CharField(max_length=120, blank=True)
    

    def __str__(self):
        return self.user.username