from django.db import models
from django.contrib.auth.models import User, AbstractUser
# Create your models here.

class Login(models.Model):
    email = models.CharField(max_length=120, blank=False)
    username = models.CharField(max_length=120, blank=True)
    password = models.CharField(max_length=120, blank=False)

class Signup(models.Model):
    email = models.CharField(max_length=120, blank=False)
    username = models.CharField(max_length=120, blank=True)
    password = models.CharField(max_length=120, blank=False)
    confirm = models.CharField(max_length=120, blank=False)

class UserProfile(User):
    user = models.OneToOneField(User, on_delete=models.CASCADE, parent_link=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    company = models.CharField(max_length=120, blank=True)
    

    def __str__(self):
        return self.user.username